import {
  useRef,
  useEffect,
  useState
} from 'react'
import {
  useThree
} from '@react-three/fiber'
import {
  Euler,
  Object3D
} from 'three'

// Restrict the target object's pitch, 
// or x axis rotation
const MIN_PITCH_ANGLE = 0
const MAX_PITCH_ANGLE = Math.PI

export default function PointerLockControls({
  // To be used as a possible querySelector arg.
  // On this element click, the canvas will request pointer lock
  selector,
  target,
  ...props
}) {
  const camera = useThree(({ camera }) => camera)
  const gl = useThree(({ gl }) => gl)

  const [isPointerLocked, setPointerLock] = useState(false)

  const euler = useRef(new Euler())

  useEffect(() => {
    const pointerLock = () => gl.domElement.requestPointerLock()
    const pointerUnlock = () => gl.domElement.ownerDocument.exitPointerLock()
    const onPointerLockChange = () => {
      setPointerLock(gl.domElement.ownerDocument.pointerLockElement === gl.domElement)
    }
    const onPointerLockError = e => console.error('Pointer Lock Error: ' + e)

    gl.domElement.ownerDocument.addEventListener('pointerlockchange', onPointerLockChange)
    gl.domElement.ownerDocument.addEventListener('pointerlockerror', onPointerLockError)

    const element = !!selector ? document.querySelector(selector) : document
    element?.addEventListener('click', pointerLock)
    return () => {
      element?.removeEventListener('click', pointerLock)
      gl.domElement.ownerDocument.removeEventListener('pointerlockchange', onPointerLockChange)
      gl.domElement.ownerDocument.removeEventListener('pointerlockerror', onPointerLockError)
      // Just in case. Hopefully this doesn't cause a pointerlockerror
      pointerUnlock()
    }
  }, [])

  useEffect(() => {
    const onMouseMove = event => {
      if (isPointerLocked) {
        const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0
        const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0
        euler.current.setFromQuaternion((target || camera).quaternion, 'YXZ')
        euler.current.y -= movementX * 0.002
        euler.current.x -= movementY * 0.002
        // Restrict the player to looking betwene straight up and straight down. Can't 
        // let them break their neck
        euler.current.x = Math.max(Math.PI / 2 - MAX_PITCH_ANGLE, Math.min(Math.PI / 2 - MIN_PITCH_ANGLE, euler.current.x));
        (target || camera).quaternion.setFromEuler(euler.current)
      }
    }

    gl.domElement.ownerDocument.addEventListener('mousemove', onMouseMove)
    return () => {
      gl.domElement.ownerDocument.removeEventListener('mousemove', onMouseMove)
    }
  }, [isPointerLocked])

  // R3F requires that a primitive have an object 
  // prop by a Three.js object, so let's give it an empty object
  const dummyObject = useRef(new Object3D())

  return <primitive object={dummyObject.current} visible={false} {...props} />
}