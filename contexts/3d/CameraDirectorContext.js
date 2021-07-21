import {
  createContext
} from 'react'

const CameraDirectorContext = createContext({
  activeCamera: null,
  setActiveCamera: () => console.warn('No camera director provided to this component')
})

export default CameraDirectorContext