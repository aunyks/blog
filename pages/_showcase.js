import {
  Canvas
} from '@react-three/fiber'
import {
  Debug,
  Physics
} from '@react-three/cannon'
import FirstPersonPlayer from 'components/3d/FirstPersonPlayer'
import OrbitControls from 'components/3d/controls/OrbitControls'

function Showcase({
  usePhysics,
  physicsProps,
  children
}) {
  const mainElements = (
    <>
      {children}
      <OrbitControls cameraDistance={30} />
    </>
  )
  if (usePhysics) {
    return (
      <>
        <Physics {...physicsProps}>
          <Debug color="black" scale={1.1}>
            {mainElements}
          </Debug>
        </Physics>
      </>
    )
  } else {
    return (
      <>
        {mainElements}
      </>
    )
  }
}

export default function ShowcasePage() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas>
        <Showcase usePhysics physicsProps={{ gravity: [0, 0, 0] }}>
          <pointLight position={[-30, 30, 0]} intensity={1} />
          <FirstPersonPlayer freezeControls />
        </Showcase>
      </Canvas>
    </div>
  )
}