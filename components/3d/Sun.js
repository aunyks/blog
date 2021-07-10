

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Color } from 'three'

// TODO: Use spherical coordinates for realistic positioning of this
// https://threejs.org/docs/?q=vector#api/en/math/Vector3.setFromSphericalCoords
export default function Sun({
  noLight = false,
  radius = 100,
  color,
  ...props
}) {
  const materialRef = useRef()
  const lightRef = useRef()
  const targetColor = new Color(color || 'white')
  useFrame(() => {
    materialRef.current.emissive.lerp(targetColor, 0.05)
    if (lightRef.current) {
      lightRef.current.color.lerp(targetColor, 0.05)
    }
  })
  return (
    <group {...props}>
      <mesh position={[0, 0, 0]} scale={[radius / 2, radius / 2, radius / 2]}>
        <sphereBufferGeometry args={[1, 20, 10]} />
        <meshLambertMaterial ref={materialRef} emissiveIntensity={100} fog={false} />
      </mesh>
      {!noLight && (
        <directionalLight
          position={[0, 0, 0]}
          intensity={0.4}
          color={lightRef.current} />
      )}
    </group>
  )
}