import {
  useContext,
  useLayoutEffect,
  useRef,
  useCallback,
  useState,
  useMemo,
  useEffect,
} from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import RapierContext from 'contexts/3d/RapierContext'
import { Object3D, MathUtils, Matrix4, Quaternion, Vector3 } from 'three'

let subscriptionId = 0

export function Physics({
  shouldInvalidate = true,
  gravity = { x: 0, y: -9.81, z: 0 },
  children,
}) {
  const { scene, invalidate } = useThree()
  const [workerReady, setWorkerReady] = useState(false)
  const [workerInited, setWorkerInited] = useState(false)
  const [worker] = useState(
    () => new Worker(new URL('../../web-workers/rapier.js', import.meta.url))
  )
  const [events] = useState({})
  const [subscriptions] = useState({})
  const threeObjectWorldPosition = useRef(new Vector3())
  const threeObjectWorldQuaternion = useRef(new Quaternion())
  const threeObjectMatrix4 = useRef(new Matrix4())
  const gameLoop = useCallback(() => {
    if (workerInited) {
      worker.postMessage({ op: 'step' })
    }
  }, [workerInited])
  useFrame(gameLoop)

  useLayoutEffect(() => {
    if (!workerReady || !workerInited) {
      worker.onmessage = (event) => {
        if (event.data.op === 'ready' && !workerReady) {
          worker.postMessage({ op: 'init', props: { gravity: gravity } })
          setWorkerReady(true)
        }
        if (event.data.op === 'inited' && !workerInited) {
          setWorkerInited(true)
        }
      }
    } else {
      worker.onmessage = (event) => {
        switch (event.data.op) {
          case 'frame':
            Object.keys(event.data.bodies).forEach((bodyUuid) => {
              // Update the world position and rotation of the three object
              // based on the same values of its physics body
              const rapierBody = event.data.bodies[bodyUuid]
              const threeObject = scene.getObjectByProperty('uuid', bodyUuid)
              if (threeObject) {
                threeObjectWorldPosition.current.copy(rapierBody.position)
                threeObjectWorldQuaternion.current.copy(rapierBody.quaternion)
                threeObjectMatrix4.current.compose(
                  threeObjectWorldPosition.current,
                  threeObjectWorldQuaternion.current,
                  threeObject.scale
                )
                threeObject.matrixAutoUpdate = false
                threeObject.matrix.copy(threeObjectMatrix4.current)
              }
            })
            event.data.observations.forEach(([id, position, quaternion]) => {
              const callback = subscriptions[id] || (() => {})
              callback(position, quaternion)
            })
            if (shouldInvalidate) {
              invalidate()
            }
            break
          case 'event':
            const { type } = event.data.props
            if (type === 'intersect') {
              const bodyACallback = events[event.data.props.bodyA]
              const bodyBCallback = events[event.data.props.bodyB]
              if (bodyACallback) {
                bodyACallback(
                  event.data.props.bodyA,
                  event.data.props.bodyB,
                  event.data.props.intersecting
                )
              }
              if (bodyBCallback) {
                bodyBCallback(
                  event.data.props.bodyB,
                  event.data.props.bodyA,
                  event.data.props.intersecting
                )
              }
            } else if (type === 'contact') {
              const bodyACallback = events[event.data.props.bodyA]
              const bodyBCallback = events[event.data.props.bodyB]
              if (bodyACallback) {
                bodyACallback(
                  event.data.props.bodyA,
                  event.data.props.bodyB,
                  event.data.props.started
                )
              }
              if (bodyBCallback) {
                bodyBCallback(
                  event.data.props.bodyB,
                  event.data.props.bodyA,
                  event.data.props.started
                )
              }
            } else {
              // type === 'rayhit'
              const rayCallback = events[event.data.props.uuid]
              rayCallback(event.data.props)
            }
            break
        }
      }
    }
    return () => {
      // Only terminate the worker once it's told us
      // that it's loaded the world
      if (workerReady && workerInited) {
        worker.terminate()
      }
    }
  }, [workerReady, workerInited])
  const api = useMemo(
    () => ({ worker, workerReady, workerInited, events, subscriptions }),
    [worker, workerReady, workerInited, events, subscriptions]
  )
  return <RapierContext.Provider value={api}>{children}</RapierContext.Provider>
}

function useForwardedRef(ref) {
  const nullRef = useRef(null)
  return ref && typeof ref !== 'function' ? ref : nullRef
}

function useBody(type, fn, fwdRef, deps = []) {
  const ref = useForwardedRef(fwdRef)
  const { worker, workerInited, events, subscriptions } =
    useContext(RapierContext)

  useLayoutEffect(() => {
    if (workerInited) {
      if (!ref.current) {
        // When the reference isn't used we create a stub
        // The body doesn't have a visual representation but can still be constrained
        ref.current = new Object3D()
      }
      const object = ref.current
      const currentWorker = worker
      const uuid = object.uuid
      // or argsFn()?
      const props = fn()
      events[uuid] = props.onCollide || props.onSense
      const args = props.args
      switch (type) {
        case 'Box':
          if (Array.isArray(args)) {
            if (args.length === 3) {
              ref.current.scale.fromArray(args, 0)
            } else {
              console.warn(
                `useBox args property must be of length three, found: ${args.length}`
              )
              ref.current.scale.set(1, 1, 1)
            }
          } else if (typeof args === 'number') {
            ref.current.scale.set(args, args, args)
          } else {
            ref.current.scale.set(1, 1, 1)
          }
          break
        case 'Sphere':
          if (!args || typeof args !== 'number') {
            console.warn(
              'Invalid props argument given to useSphere. Must be a number for radius'
            )
            ref.current.scale.set(1, 1, 1)
          } else {
            ref.current.scale.set(args, args, args)
          }
          break
        case 'Plane':
          ref.current.scale.set(1, 1, 1)
          break
        default:
        // not sure what to do
      }

      const quat = ref.current.quaternion
      // Functions can't be copied over so just
      // give them any value
      props.onCollide = null
      props.onSense = null
      // Register on mount, unregister on unmount
      currentWorker.postMessage({
        op: 'addBodies',
        type,
        uuid,
        props: {
          ...props,
          position: props.position || ref.current.position.toArray(),
          quaternion: props.quaternion || [quat.w, quat.x, quat.y, quat.z],
        },
      })
    }
    return () => {
      if (workerInited) {
        delete events[uuid]
        currentWorker.postMessage({ op: 'removeBodies', uuid })
      }
    }
  }, [workerInited, ...deps])

  const api = useMemo(() => {
    return {
      position: {
        set: (vector) => {
          // vector must have x, y, z components
          if (ref.current) {
            worker.postMessage({
              op: 'setPosition',
              uuid: ref.current.uuid,
              props: vector,
            })
          }
        },
      },
      quaternion: {
        set: (quat) => {
          // quat must have w, x, y, z components
          if (ref.current) {
            worker.postMessage({
              op: 'setRotation',
              uuid: ref.current.uuid,
              props: quat,
            })
          }
        },
      },
      velocity: {
        set: (vector) => {
          // vector must have x, y, z components
          if (ref.current) {
            worker.postMessage({
              op: 'setVelocity',
              uuid: ref.current.uuid,
              props: vector,
            })
          }
        },
      },
      subscribe: (callback) => {
        const id = subscriptionId++
        subscriptions[id] = callback
        if (ref.current) {
          const uuid = ref.current.uuid
          worker.postMessage({ op: 'subscribe', uuid, props: { id } })
        }
        return () => {
          delete subscriptions[id]
          worker.postMessage({ op: 'unsubscribe', props: { id } })
        }
      },
      applyForce: (vector) => {
        // vector must have x, y, z components
        if (ref.current) {
          worker.postMessage({
            op: 'applyForce',
            uuid: ref.current.uuid,
            props: vector,
          })
        }
      },
      setAngularVelocity: (vector) => {
        // vector must have x, y, z components
        if (ref.current) {
          worker.postMessage({
            op: 'setAngularVelocity',
            uuid: ref.current.uuid,
            props: vector,
          })
        }
      },
      applyForceAtPoint: (point, force) => {
        // point and force must both have x, y, z components
        if (ref.current) {
          worker.postMessage({
            op: 'applyForceAtPoint',
            uuid: ref.current.uuid,
            props: {
              point,
              force,
            },
          })
        }
      },
    }
  }, [workerInited])
  return [ref, api]
}

export function usePlane(fn, fwdRef, deps) {
  return useBody('Plane', fn, fwdRef, deps)
}

export function useBox(fn, fwdRef, deps) {
  return useBody('Box', fn, fwdRef, deps)
}

export function useSphere(fn, fwdRef, deps) {
  return useBody('Sphere', fn, fwdRef, deps)
}

export function useHeightfield(fn, fwdRef, deps) {
  return useBody('Heightfield', fn, fwdRef, deps)
}

export function useCylinder(fn, fwdRef, deps) {
  return useBody('Cylinder', fn, fwdRef, deps)
}

export function useCapsule(fn, fwdRef, deps) {
  return useBody('Capsule', fn, fwdRef, deps)
}

export function useRay(optionsFn, onHit, deps) {
  const { worker, events, workerInited } = useContext(RapierContext)
  const [uuid] = useState(() => MathUtils.generateUUID())
  useEffect(() => {
    if (workerInited) {
      if (!onHit) {
        console.warn('No onHit function provided to useRay()')
      }
      events[uuid] = onHit || (() => {})
      const options = optionsFn()
      worker.postMessage({ op: 'addRay', uuid, props: options })
    }
    return () => {
      if (workerInited) {
        worker.postMessage({ op: 'removeRay', uuid })
        delete events[uuid]
      }
    }
  }, [workerInited, ...deps])
}
