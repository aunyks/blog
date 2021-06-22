import {
  useRef,
  useLayoutEffect,
  forwardRef,
  useContext
} from 'react'
import {
  useFrame,
  useThree
} from '@react-three/fiber'
import CameraDirector from 'contexts/3d/CameraDirector'

function mergeRefs(refs) {
  return value => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(value)
      } else if (ref != null) {
        ref.current = value
      }
    })
  }
}

const Camera = forwardRef(({
  // Name used to refer to this camera by the director
  name,
  children,
  ...props
}, ref) => {
  const cameraRef = useRef()
  const set = useThree((state) => state.set)
  const size = useThree(({ size }) => size)
  const { activeCamera, setActiveCamera } = useContext(CameraDirector)

  useLayoutEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.aspect = size.width / size.height
      cameraRef.current.updateProjectionMatrix()
    }
  }, [size, props])

  useLayoutEffect(() => {
    if (activeCamera === name) {
      set({ camera: cameraRef.current })
    }
  }, [activeCamera])

  useFrame(() => {
    if (cameraRef.current) {
      cameraRef.current.updateMatrixWorld()
    }
  })

  return (
    <perspectiveCamera
      ref={mergeRefs([cameraRef, ref])}
      userData={{ name: name }}
      {...props}>
      {/* Only mount children when this camera is active */}
      {(activeCamera === name) && children}
    </perspectiveCamera>
  )
})

export default Camera