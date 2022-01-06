import { useState } from 'react'
import CameraDirectorContext from 'contexts/3d/CameraDirectorContext'

export default function GameDirector({ defaultCam, children }) {
  const [currentActiveCamera, setCurrentActiveCamera] = useState(defaultCam)
  return (
    <CameraDirectorContext.Provider
      value={{
        activeCamera: currentActiveCamera,
        setActiveCamera: setCurrentActiveCamera
      }}>
      {children}
    </CameraDirectorContext.Provider>
  )
}
