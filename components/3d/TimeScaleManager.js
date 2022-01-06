import { useState } from 'react'
import TimeScaleContext from 'contexts/3d/TimeScaleContext'

const DEFAULT_STEP = 1 / 60

export default function TimeScaleManager({
  initialTimeScale = 1,
  children,
  ...props
}) {
  const [timeScale, setTimeScale] = useState(initialTimeScale)
  return (
    <TimeScaleContext.Provider
      value={{
        timeScale: timeScale,
        setTimeScale: setTimeScale
      }}>
      {children}
    </TimeScaleContext.Provider>
  )
}
