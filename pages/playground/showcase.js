import { Canvas, useFrame } from '@react-three/fiber'
import { Debug, Physics } from '@react-three/cannon'
import FirstPersonPlayer from 'components/3d/FirstPersonPlayer'
import OrbitControls from 'components/3d/controls/OrbitControls'
import Arms from 'components/3d/Arms'

function Showcase({
  physicsProps,
  cameraDistance = 10,
  origin = [0, 0, 0],
  children
}) {
  return (
    <>
      <Physics {...physicsProps}>
        <Debug color="black" scale={1.1}>
          {children}
          <OrbitControls origin={origin} cameraDistance={cameraDistance} />
        </Debug>
      </Physics>
    </>
  )
}

export default function ShowcasePage() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas gl={{ powerPreference: 'low-power' }}>
        <Showcase physicsProps={{ gravity: [0, 0, 0] }}>
          <pointLight position={[-30, 30, 0]} intensity={1} />
          <FirstPersonPlayer freezeControls startPosition={[0, 0, 0]} />
        </Showcase>
      </Canvas>
    </div>
  )
}
