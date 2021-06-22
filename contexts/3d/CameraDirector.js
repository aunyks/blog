import {
  createContext
} from 'react'

const CameraDirector = createContext({
  activeCamera: null,
  setActiveCamera: () => console.warn('No camera director provided to this component')
})

export default CameraDirector