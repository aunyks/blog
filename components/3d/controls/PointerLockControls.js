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

// Restrict the pitchTarget object's pitch, 
// or x axis rotation
const MIN_PITCH_ANGLE = 0
const MAX_PITCH_ANGLE = Math.PI

export default function PointerLockControls({
  // To be used as a possible querySelector arg.
  // On this element click, the canvas will request pointer lock
  selector,
  yawTarget,
  pitchTarget,
  ...props
}) {
  const gl = useThree(({ gl }) => gl)

  const [isPointerLocked, setPointerLock] = useState(false)

  const yawEuler = useRef(new Euler())
  const pitchEuler = useRef(new Euler())

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

  const movementX = useRef(null)
  const movementY = useRef(null)
  useEffect(() => {
    const onMouseMove = event => {
      if (isPointerLocked) {
        // Update yaw euler
        movementX.current = event.movementX || event.mozMovementX || event.webkitMovementX || 0
        yawEuler.current.setFromQuaternion(yawTarget.quaternion, 'YXZ')
        yawEuler.current.y -= movementX.current * 0.002
        yawTarget.quaternion.setFromEuler(yawEuler.current)

        // Update pitch euler
        movementY.current = event.movementY || event.mozMovementY || event.webkitMovementY || 0
        pitchEuler.current.setFromQuaternion(pitchTarget.quaternion, 'YXZ')
        pitchEuler.current.x -= movementY.current * 0.002
        // Restrict the player to looking betwene straight up and straight down. Can't 
        // let them break their neck
        pitchEuler.current.x = Math.max(Math.PI / 2 - MAX_PITCH_ANGLE, Math.min(Math.PI / 2 - MIN_PITCH_ANGLE, pitchEuler.current.x))
        pitchTarget.quaternion.setFromEuler(pitchEuler.current)
      }
    }

    gl.domElement.ownerDocument.addEventListener('mousemove', onMouseMove)
    return () => {
      gl.domElement.ownerDocument.removeEventListener('mousemove', onMouseMove)
    }
  }, [isPointerLocked])

  return null
}