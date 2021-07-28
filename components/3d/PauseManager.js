import { useState } from 'react'
import { useFrame } from '@react-three/fiber'
import PauseContext from 'contexts/3d/PauseContext'

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