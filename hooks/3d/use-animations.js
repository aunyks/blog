import {
  useRef,
  useState,
  useEffect,
  useContext
} from 'react'
import {
  useFrame
} from '@react-three/fiber'
import {
  Object3D,
  AnimationMixer
} from 'three'
import TimeScaleContext from 'contexts/3d/TimeScaleContext'

// From 
// https://github.com/pmndrs/drei/blob/ac5f687f2b6d38c3aaac4c6d700987e95adfc14c/src/core/useAnimations.tsx
export default function useAnimations(
  clips,
  root
) {
  const { timeScale } = useContext(TimeScaleContext)
  const ref = useRef()
  const [actualRef] = useState(() => (root ? (root instanceof Object3D ? { current: root } : root) : ref))
  const [mixer] = useState(() => new AnimationMixer(null))
  const lazyActions = useRef({})
  const [api] = useState(() => {
    const actions = {}
    clips.forEach((clip) =>
      Object.defineProperty(actions, clip.name, {
        enumerable: true,
        get() {
          if (actualRef.current) {
            return (
              lazyActions.current[clip.name] ||
              (lazyActions.current[clip.name] = mixer.clipAction(clip, actualRef.current))
            )
          }
        },
      })
    )
    return { ref: actualRef, clips, actions, names: clips.map((c) => c.name), mixer }
  })
  useFrame((state, delta) => mixer.update(delta * timeScale))
  useEffect(() => {
    const currentRoot = actualRef.current
    return () => {
      // Clean up only when clips change, wipe out lazy actions and uncache clips
      lazyActions.current = {}
      Object.values(api.actions).forEach((action) => {
        if (currentRoot) {
          mixer.uncacheAction(action, currentRoot)
        }
      })
    }
  }, [clips])
  return api
}