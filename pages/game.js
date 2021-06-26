import {
  Canvas
} from '@react-three/fiber'
import {
  Physics
} from '@react-three/cannon'
import FlatGround from 'components/3d/FlatGround'
import FirstPersonPlayer from 'components/3d/FirstPersonPlayer'
import GameDirector from 'components/3d/GameDirector'
import SkyDome from 'components/3d/SkyDome'

export default function Game() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Canvas>
        <Physics>
          <GameDirector defaultCam="First Person Cam">
            <mesh position={[0, 0, -2]}>
              <boxBufferGeometry />
              <meshBasicMaterial color={0x0000ff} />
            </mesh>
            <FirstPersonPlayer />
            <SkyDome />
            <FlatGround />
          </GameDirector>
        </Physics>
      </Canvas>
    </div>
  )
}