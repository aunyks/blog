import { Canvas } from '@react-three/fiber'
import { useEffect, useRef, useCallback } from 'react'
import OrbitControls from 'components/3d/controls/OrbitControls'
import { Physics, useBox, usePlane } from 'components/3d/RapierPhysics'
import { Euler, Quaternion } from 'three'

function Box(props) {
  const [boxRef] = useBox(() => {
    return { mass: 1, position: [0, 5, 0] }
  })
  return (
    <mesh ref={boxRef} {...props}>
      <boxBufferGeometry />
      <meshBasicMaterial color={0xff0000} />
    </mesh>
  )
}

function FlatGround({ color = 0xff00ff, width = 10000, length = 10000 }) {
  const quat = new Quaternion().setFromEuler(new Euler(-Math.PI / 2, 0, 0))
  const [physicsRef] = usePlane(() => ({
    mass: 0,
    quaternion: [quat.w, quat.x, quat.y, quat.z],
  }))
  return (
    <mesh ref={physicsRef}>
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
            <Box />
            <FlatGround />
            <ambientLight intensity={1} />
            <OrbitControls origin={[0, 2, 0]} cameraDistance={5} />
          </Physics>
        </Canvas>
      </div>
    </>
  )
}
