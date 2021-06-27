import { useState } from 'react'
import PauseContext from 'contexts/3d/PauseContext'
import { useFrame } from '@react-three/fiber'

export default function PauseManager({ children }) {
  const [isPaused, setPaused] = useState(false)
  useFrame(({ invalidate }) => {
    if (!isPaused) {
      invalidate()
    }
  })
  return (
    <PauseContext.Provider value={{
      isPaused: isPaused,
      setPaused: setPaused
    }}>
      {children}
    </PauseContext.Provider>
  )
}