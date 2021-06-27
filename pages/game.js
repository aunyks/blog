import {
  Canvas
} from '@react-three/fiber'
import {
  Physics
} from '@react-three/cannon'
import Terrain from 'components/3d/Terrain'
import FlatGround from 'components/3d/FlatGround'
import SkyDome from 'components/3d/SkyDome'
import GameDirector from 'components/3d/GameDirector'
import PauseManager from 'components/3d/PauseManager'
import FirstPersonPlayer from 'components/3d/FirstPersonPlayer'

export default function Game() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Canvas frameloop="demand">
        <Physics>
          <PauseManager>
            <GameDirector defaultCam="First Person Cam">
              <FirstPersonPlayer startPosition={[0, 10, 0]} />
            </GameDirector>
          </PauseManager>
          <mesh position={[0, 0, -2]}>
            <boxBufferGeometry />
            <meshBasicMaterial color={0x0000ff} />
          </mesh>
          <SkyDome />
          <ambientLight intensity={1} />
          <Terrain />
        </Physics>
      </Canvas >
    </div >
  )
}