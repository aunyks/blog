import {
  useContext
} from 'react'
import {
  Physics
} from '@react-three/cannon'
import TimeScaleContext from 'contexts/3d/TimeScaleContext'

const DEFAULT_STEP = 1 / 60

export default function TimeSensitivePhysics({
  initialTimeScale = 1,
  children,
  ...props
}) {
  const { timeScale } = useContext(TimeScaleContext)
  return (
    <Physics step={DEFAULT_STEP * timeScale} {...props}>
      {children}
    </Physics>
  )
}