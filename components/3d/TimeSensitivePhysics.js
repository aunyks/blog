import {
  useState
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
  const [timeScale, setTimeScale] = useState(initialTimeScale)
  return (
    <TimeScaleContext.Provider value={{
      timeScale: timeScale,
      setTimeScale: setTimeScale
    }}>
      <Physics step={DEFAULT_STEP * timeScale} {...props}>
        {children}
      </Physics>
    </TimeScaleContext.Provider>
  )
}