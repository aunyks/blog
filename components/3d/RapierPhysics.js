import {
  useContext,
  useLayoutEffect,
  useRef,
  useCallback,
  useState,
  useMemo,
} from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import RapierContext from 'contexts/3d/RapierContext'
import { Vector3 } from 'three'

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
  const [subscriptions] = useState(null)
  const threeObjectWorldPosition = useRef(new Vector3())
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
          worker.postMessage({ op: 'init', gravity: gravity })
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
            debugger
            Object.keys(event.data.bodies).forEach((bodyUuid) => {
              const rapierBody = event.data.bodies[bodyUuid]
              const threeObject = scene.getObjectByProperty('uuid', bodyUuid)
              threeObjectWorldPosition.current = threeObject.getWorldPosition(
                threeObjectWorldPosition.current
              )
              threeObject.worldToLocal(threeObjectWorldPosition.current)
              threeObject.quaternion.set(
                rapierBody.quaternion.x,
                rapierBody.quaternion.y,
                rapierBody.quaternion.z,
                rapierBody.quaternion.w
              )
            })
            event.data.observations.forEach(([id, position, quaternion]) => {
              const callback = subscriptions[id] || {}
              callback(position, quaternion)
            })
            if (shouldInvalidate) {
              invalidate()
            }
            break
          case 'event':
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
    () => ({ worker, workerReady, workerInited, subscriptions }),
    [worker, workerReady, workerInited, subscriptions]
  )
  return <RapierContext.Provider value={api}>{children}</RapierContext.Provider>
}

function useForwardedRef(ref) {
  const nullRef = useRef(null)
  return ref && typeof ref !== 'function' ? ref : nullRef
}

function useBody(type, fn, fwdRef, deps = []) {
  const ref = useForwardedRef(fwdRef)
  const { worker, workerReady, workerInited } = useContext(RapierContext)

  useLayoutEffect(() => {
    if (workerReady && workerInited) {
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

      // Register on mount, unregister on unmount
      currentWorker.postMessage({
        op: 'addBodies',
        type,
        uuid,
        props: props,
      })
      return () => {
        if (workerReady && workerInited) {
          currentWorker.postMessage({ op: 'removeBodies', uuid })
        }
      }
    }
  }, [workerInited, workerReady, ...deps])

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
      // TODO: applyForce, setAngularVelocity
    }
  }, [])
  return [ref, api]
}

export function usePlane(fn, fwdRef, deps) {
  return useBody('Plane', fn, fwdRef, deps)
}

export function useBox(fn, fwdRef, deps) {
  return useBody('Box', fn, fwdRef, deps)
}

export function Sphere(fn, fwdRef, deps) {
  return useBody('Sphere', fn, fwdRef, deps)
}

export function Heightfield(fn, fwdRef, deps) {
  return useBody('Heightfield', fn, fwdRef, deps)
}

export function Cylinder(fn, fwdRef, deps) {
  return useBody('Cylinder', fn, fwdRef, deps)
}

export function Capsule(fn, fwdRef, deps) {
  return useBody('Capsule', fn, fwdRef, deps)
}
