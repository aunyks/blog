import {
  useEffect,
  useRef
} from 'react'
import { Object3D } from 'three'
import { useThree, useFrame } from '@react-three/fiber'

// Borrowed from: https://github.com/pmndrs/drei/blob/1667297a64766b2d2c50198da35615554116bf3d/src/core/useHelper.tsx
export function useHelper(object3D, proto, ...args) {
  const helper = useRef()

  const scene = useThree((state) => state.scene)
  useEffect(() => {
    if (proto && object3D.current) {
      helper.current = new (proto)(object3D.current, ...args)
      if (helper.current) {
        scene.add(helper.current)
      }
    }

    return () => {
      if (helper.current) {
        scene.remove(helper.current)
      }
    }
  }, [scene, proto, object3D, args])

  useFrame(() => {
    if (helper.current) {
      helper.current.update()
    }
  })

  return helper
}