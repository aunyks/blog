import {
  useContext
} from 'react'
import GameEventContext from 'contexts/3d/GameEventContext'

export default function useGameEvents() {
  // Don't destructure this. It'll make `this` undefined
  return useContext(GameEventContext)
}