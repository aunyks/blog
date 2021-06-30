import {
  Canvas
} from '@react-three/fiber'
import OrbitControls from 'components/3d/controls/OrbitControls'

function Showcase({ children }) {
  return (
    <>
      {children}
      <OrbitControls />
    </>
  )
}

export default function ShowcasePage() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas>
        <Showcase>
          <pointLight position={[-30, 30, 0]} intensity={1} />
          <mesh position={[0, 0, 0]}>
            <sphereBufferGeometry args={[10, 32, 32]} />
            <meshLambertMaterial color={0x0000ff} />
          </mesh>
        </Showcase>
      </Canvas>
    </div>
  )
}