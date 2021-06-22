import { useState } from 'react'
import CameraDirector from 'contexts/3d/CameraDirector'

export default function GameDirector({ defaultCam, children }) {
  const [currentActiveCamera, setCurrentActiveCamera] = useState(defaultCam)
  return (
    <CameraDirector.Provider value={{
      activeCamera: currentActiveCamera,
      setActiveCamera: setCurrentActiveCamera
    }}>
      {children}
    </CameraDirector.Provider>
  )
}