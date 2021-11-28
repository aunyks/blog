import { Canvas } from '@react-three/fiber'
import { useEffect, useRef, useCallback } from 'react'
import OrbitControls from 'components/3d/controls/OrbitControls'
import { Physics, useBox } from 'components/3d/RapierPhysics'

function Box(props) {
  const [boxRef] = useBox(
    () => {
      return { mass: 1, position: [0, 50, 0] }
    },
    null,
    []
  )
  return (
    <mesh ref={boxRef} {...props}>
      <boxBufferGeometry />
      <meshBasicMaterial color={0xff0000} />
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
            <ambientLight intensity={1} />
            <OrbitControls origin={[0, 2, 0]} cameraDistance={5} />
          </Physics>
        </Canvas>
      </div>
    </>
  )
}
