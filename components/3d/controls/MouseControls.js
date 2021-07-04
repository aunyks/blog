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

export default function MouseControls({
  // The object to rotate
  yawTarget,
  pitchTarget,
  ...props
}) {
  const gl = useThree(({ gl }) => gl)

  const [isMouseDown, setMouseDown] = useState(false)
  const screenTouchX = useRef(0)
  const screenTouchY = useRef(0)

  const yawEuler = useRef(new Euler())
  const pitchEuler = useRef(new Euler())

  useEffect(() => {
    const onMouseDown = event => {
      screenTouchX.current = event.pageX
      screenTouchY.current = event.pageY
      setMouseDown(true)
    }
    const onMouseUp = () => {
      screenTouchX.current = 0
      screenTouchY.current = 0
      setMouseDown(false)
    }
    gl.domElement.addEventListener('mousedown', onMouseDown, false)
    gl.domElement.addEventListener('mouseup', onMouseUp, false)

    return () => {
      gl.domElement.removeEventListener('mousedown', onMouseDown, false)
      gl.domElement.removeEventListener('mouseup', onMouseUp, false)
    }
  }, [])

  useEffect(() => {
    const onMouseMove = event => {
      if (isMouseDown) {
        // Update yaw euler
        const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0
        yawEuler.current.setFromQuaternion(yawTarget.quaternion, 'YXZ')
        yawEuler.current.y -= (event.pageX - screenTouchX.current) * 0.0002
        yawTarget.quaternion.setFromEuler(yawEuler.current)

        // Update pitch euler
        const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0
        pitchEuler.current.setFromQuaternion(pitchTarget.quaternion, 'YXZ')
        pitchEuler.current.x -= (event.pageY - screenTouchY.current) * 0.0002
        // Restrict the player to looking betwene straight up and straight down. Can't 
        // let them break their neck
        pitchEuler.current.x = Math.max(Math.PI / 2 - MAX_PITCH_ANGLE, Math.min(Math.PI / 2 - MIN_PITCH_ANGLE, pitchEuler.current.x))
        pitchTarget.quaternion.setFromEuler(pitchEuler.current)
      }
    }

    gl.domElement.addEventListener('mousemove', onMouseMove, false)
    return () => {
      gl.domElement.removeEventListener('mousemove', onMouseMove, false)
    }
  }, [isMouseDown])

  return null
}