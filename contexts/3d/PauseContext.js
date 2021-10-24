import {
  createContext
} from 'react'

const PauseContext = createContext({
  isPaused: false,
  setPaused: () => console.warn('No PauseContext provided to this component')
})

export default PauseContext