import { Canvas } from '@react-three/fiber'
import OrbitControls from 'components/3d/controls/OrbitControls'
import { Physics, useSphere } from 'components/3d/RapierPhysics'
import RapierTerrain from 'components/3d/RapierTerrain'
import { Suspense } from 'react'

function Sphere() {
  const [sphereRef, sphere] = useSphere(() => {
    return {
      args: 5,
      linearDamping: 0,
      angularDamping: 0
    }
  })
  return (
    <mesh ref={sphereRef} position={[4, 7, 0]}>
      <sphereBufferGeometry />
      <meshBasicMaterial color={0xff0000} />
    </mesh>
  )
}

function TriggerBox() {
  return (
    <mesh position={[-2, 2.5, -6]}>
      <boxBufferGeometry />
      <meshBasicMaterial color={0x0000ff} wireframe />
    </mesh>
  )
}

export default function RapierDemo() {
  return (
    <>
      <div style={{ height: '100vh', width: '100vw' }}>
        <Canvas>
          <Physics>
            <Sphere />
            {/* <FlatGround /> */}
            <Suspense fallback={<></>}>
              <RapierTerrain />
            </Suspense>
            <ambientLight intensity={1} />
            <OrbitControls origin={[0, 2, 0]} cameraDistance={50} />
          </Physics>
        </Canvas>
      </div>
    </>
  )
}
