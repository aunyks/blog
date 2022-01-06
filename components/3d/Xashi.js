import { useEffect, forwardRef } from 'react'
import { useGraph, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const Xashi = forwardRef((props, ref) => {
  const { scene } = useLoader(
    GLTFLoader,
    '/3d/models/slice-n-dice-3d-assets.glb'
  )
  const { nodes } = useGraph(scene)
  useEffect(() => {
    return () => nodes.Xashi.geometry.dispose()
  }, [])
  return (
    <mesh ref={ref} geometry={nodes.Xashi.geometry} scale={3.4}>
      <meshBasicMaterial color={0x00ff00} />
    </mesh>
  )
})

export default Xashi
