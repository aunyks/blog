import {
  usePlane
} from '@react-three/cannon'

export default function FlatGround({
  color = 0xff00ff,
  width = 10000,
  length = 10000
}) {
  const [physicsRef] = usePlane(() => ({
    mass: 0,
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
    material: {
      friction: 0.1
    },
    type: 'Static'
  }))

  return (
    <mesh ref={physicsRef}>
      <planeBufferGeometry args={[width, length]} />
      <meshBasicMaterial color={color} />
    </mesh>
  )
}