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

export default function TouchControls({
  // The object to rotate
  yawTarget,
  pitchTarget,
  ...props
}) {
  const gl = useThree(({ gl }) => gl)

  const [isTouchDown, setTouchDown] = useState(false)
  const screenTouchX = useRef(0)
  const screenTouchY = useRef(0)

  const yawEuler = useRef(new Euler())
  const pitchEuler = useRef(new Euler())

  useEffect(() => {
    const onTouchStart = event => {
      screenTouchX.current = event.changedTouches[0].screenX
      screenTouchY.current = event.changedTouches[0].screenY
      setTouchDown(true)
    }
    const onTouchEnd = () => {
      screenTouchX.current = 0
      screenTouchY.current = 0
      setTouchDown(false)
    }
    gl.domElement.addEventListener('touchstart', onTouchStart, false)
    gl.domElement.addEventListener('touchend', onTouchEnd, false)
    gl.domElement.addEventListener('touchcancel', onTouchEnd, false)

    return () => {
      gl.domElement.removeEventListener('touchstart', onTouchStart, false)
      gl.domElement.removeEventListener('touchend', onTouchEnd, false)
      gl.domElement.removeEventListener('touchcancel', onTouchEnd, false)
    }
  }, [])

  useEffect(() => {
    const onTouchMove = event => {
      if (isTouchDown) {
        // Update yaw euler
        const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0
        yawEuler.current.setFromQuaternion(yawTarget.quaternion, 'YXZ')
        yawEuler.current.y -= (event.changedTouches[0].screenX - screenTouchX.current) * 0.0002
        yawTarget.quaternion.setFromEuler(yawEuler.current)

        // Update pitch euler
        const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0
        pitchEuler.current.setFromQuaternion(pitchTarget.quaternion, 'YXZ')
        pitchEuler.current.x -= (event.changedTouches[0].screenY - screenTouchY.current) * 0.0002
        // Restrict the player to looking betwene straight up and straight down. Can't 
        // let them break their neck
        pitchEuler.current.x = Math.max(Math.PI / 2 - MAX_PITCH_ANGLE, Math.min(Math.PI / 2 - MIN_PITCH_ANGLE, pitchEuler.current.x))
        pitchTarget.quaternion.setFromEuler(pitchEuler.current)
      }
    }

    gl.domElement.addEventListener('touchmove', onTouchMove, false)
    return () => {
      gl.domElement.removeEventListener('touchmove', onTouchMove, false)
    }
  }, [isTouchDown])

  // R3F requires that a primitive have an object 
  // prop by a Three.js object, so let's give it an empty object
  const dummyObject = useRef(new Object3D())

  return <primitive object={dummyObject.current} visible={false} {...props} />
}