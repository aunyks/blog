import { Canvas } from '@react-three/fiber'
import { useEffect, useRef, useCallback } from 'react'
import OrbitControls from 'components/3d/controls/OrbitControls'
import { Physics, useSphere, usePlane } from 'components/3d/RapierPhysics'
import { Euler, Quaternion } from 'three'

function Sphere() {
  const [sphereRef] = useSphere(() => {
    return {
      args: 5,
      velocity: [-4, -2, -4],
      angularVelocity: [-Math.PI / 16, Math.PI / 16, 0]
    }
  })
  return (
    <mesh ref={sphereRef} position={[0, 7, 0]}>
      <sphereBufferGeometry />
      <meshBasicMaterial color={0xff0000} />
    </mesh>
  )
}

function FlatGround({ color = 0xff00ff, width = 10000, length = 10000 }) {
  const quat = new Quaternion().setFromEuler(new Euler(-Math.PI / 2, 0, 0))
  const [physicsRef] = usePlane(() => ({
    mass: 0
  }))
  return (
    <mesh ref={physicsRef} quaternion={quat}>
      <planeBufferGeometry args={[width, length]} />
      <meshBasicMaterial color={color} />
    </mesh>
  )
}

export default function CannonDemo() {
  return (
    <>
      <div style={{ height: '100vh', width: '100vw' }}>
        <Canvas>
          <Physics>
            <Sphere />
            <FlatGround />
            <ambientLight intensity={1} />
            <OrbitControls origin={[0, 2, 0]} cameraDistance={5} />
          </Physics>
        </Canvas>
      </div>
    </>
  )
}
