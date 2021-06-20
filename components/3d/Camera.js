import {
  useRef,
  useEffect,
  useLayoutEffect
} from 'react'
import {
  useFrame,
  useThree
} from '@react-three/fiber'

export default function Camera(props) {
  const ref = useRef()
  const set = useThree((state) => state.set)
  const size = useThree(({ size }) => size)
  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.aspect = size.width / size.height
      ref.current.updateProjectionMatrix()
    }
  }, [size, props])
  useEffect(() => set({ camera: ref.current }), [])
  useFrame(() => {
    if (ref.current) {
      ref.current.updateMatrixWorld()
    }
  })
  return <perspectiveCamera ref={ref} {...props} />
}