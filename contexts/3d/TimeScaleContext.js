import {
  createContext
} from 'react'

const TimeScaleContext = createContext({
  timeScale: 1,
  setTimeScale: () => console.warn('No TimeScaleContext provided to this component')
})

export default TimeScaleContext