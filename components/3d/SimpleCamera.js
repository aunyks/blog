import {
  useRef,
  useEffect,
  useLayoutEffect,
  forwardRef
} from 'react'
import {
  useFrame,
  useThree
} from '@react-three/fiber'

const SimpleCamera = forwardRef((props, ref) => {
  const effectiveRef = ref || useRef()
  const set = useThree((state) => state.set)
  const size = useThree(({ size }) => size)
  useLayoutEffect(() => {
    if (effectiveRef.current) {
      effectiveRef.current.aspect = size.width / size.height
      effectiveRef.current.updateProjectionMatrix()
    }
  }, [size, props])
  useEffect(() => set({ camera: effectiveRef.current }), [])
  useFrame(() => {
    if (effectiveRef.current) {
      effectiveRef.current.updateMatrixWorld()
    }
  })
  return <perspectiveCamera ref={effectiveRef} {...props} />
})

export default SimpleCamera