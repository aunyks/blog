import { Canvas } from '@react-three/fiber'
import { Physics, useBox } from '@react-three/cannon'
import FlatGround from 'components/3d/FlatGround'
import OrbitControls from 'components/3d/controls/OrbitControls'

function Box(props) {
  const [boxRef] = useBox(() => {
    return { mass: 1 }
  })
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
            <FlatGround />
            <ambientLight intensity={1} />
            <OrbitControls origin={[0, 2, 0]} cameraDistance={5} />
          </Physics>
        </Canvas>
      </div>
    </>
  )
}
