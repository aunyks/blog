import {
  forwardRef,
  useLayoutEffect,
  useRef,
} from 'react'
import { useFrame } from '@react-three/fiber'

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

// Identical to https://docs.pmnd.rs/drei/performance/detailed
export const LOD = forwardRef(({ children, distances, ...props }, ref) => {
  const lodRef = useRef(null)

  useLayoutEffect(() => {
    lodRef.current.levels.length = 0
    lodRef.current.children.forEach((object, index) => lodRef.current.levels.push({ object, distance: distances[index] }))
  })

  useFrame(state => {
    if (lodRef) {
      lodRef.current.update(state.camera)
    }
  })

  return (
    <lOD ref={mergeRefs([lodRef, ref])} {...props}>
      {children}
    </lOD>
  )
})