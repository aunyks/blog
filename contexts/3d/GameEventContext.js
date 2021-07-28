import {
  createContext
} from 'react'

const GameEventContext = createContext({
  on: () => console.warn('No GameEventContext provided to this component'),
  off: () => console.warn('No GameEventContext provided to this component'),
  emit: () => console.warn('No GameEventContext provided to this component')
})

export default GameEventContext