import { useRef } from 'react'
import { usePlane } from '@react-three/cannon'
import createUserData from 'utils/3d/createUserData'

export default function FlatGround({
  color = 0xff00ff,
  width = 10000,
  length = 10000
}) {
  const physicsRef = useRef()
  usePlane(
    () => ({
      mass: 0,
      rotation: [-Math.PI / 2, 0, 0],
      position: [0, 0, 0],
      material: {
        friction: 0.1
      },
      type: 'Static'
    }),
    physicsRef,
    []
  )
  const userData = useRef(
    createUserData({
      type: 'Ground',
      name: 'FlatGround'
    })
  )
  return (
    <mesh ref={physicsRef} userData={userData.current}>
      <planeBufferGeometry args={[width, length]} />
      <meshBasicMaterial color={color} />
    </mesh>
  )
}
