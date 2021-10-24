import { useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import PauseContext from 'contexts/3d/PauseContext'

export default function PauseManager({ children }) {
  const [isPaused, setPaused] = useState(false)
  const invalidate = useThree(({ invalidate }) => invalidate)

  // On every frame, request another frame by invalidating this one 
  // if we're not paused. 
  useFrame(({ invalidate }) => {
    if (!isPaused) {
      invalidate()
    }
  })

  // Once paused, another frame won't be requested 
  // so we need another way to kick it off again
  useEffect(() => {
    if (!isPaused) {
      invalidate()
    }
  }, [isPaused])
  return (
    <PauseContext.Provider value={{
      isPaused: isPaused,
      setPaused: setPaused
    }}>
      {children}
    </PauseContext.Provider>
  )
}