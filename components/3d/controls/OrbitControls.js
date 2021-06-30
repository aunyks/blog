import {
  useEffect,
  useRef,
  useState
} from 'react'
import {
  extend,
  useFrame
} from '@react-three/fiber'
import {
  Euler,
  Object3D
} from 'three'

import useDeviceSize from 'hooks/use-device-size'
import MouseControls from 'components/3d/controls/MouseControls'
import TouchControls from 'components/3d/controls/TouchControls'
import SimpleCamera from 'components/3d/SimpleCamera'

extend({ Object3D })

export default function OrbitControls({
  origin = [0, 0, 0],
  cameraDistance = 30,
  maxPitchAngle = Math.PI,
  minPitchAngle = 0
}) {
  const originObject = useRef()
  const deviceSize = useDeviceSize()
  const [controlsEnabled, setControlsEnabled] = useState(false)
  const originEuler = useRef(new Euler())

  useEffect(() => {
    setControlsEnabled(true)
  }, [])

  useFrame(() => {
    if (originObject.current) {
      originEuler.current.setFromQuaternion(originObject.current.quaternion, 'YXZ')
      originEuler.current.x = Math.max(Math.PI / 2 - maxPitchAngle, Math.min(Math.PI / 2 - minPitchAngle, originEuler.current.x))
      originObject.current.quaternion.setFromEuler(originEuler.current)
    }
  })
  return (
    <>
      <object3D ref={originObject} position={origin}>
        <SimpleCamera position={[0, 0, cameraDistance]} />
      </object3D>
      {controlsEnabled && !['xs', 'sm', 'md'].includes(deviceSize) && (
        <MouseControls yawTarget={originObject.current} pitchTarget={originObject.current} />
      )}
      {controlsEnabled && ['xs', 'sm', 'md'].includes(deviceSize) && (
        <TouchControls yawTarget={originObject.current} pitchTarget={originObject.current} />
      )}
    </>
  )
}