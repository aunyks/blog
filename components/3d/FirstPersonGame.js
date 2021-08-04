import {
  Physics
} from '@react-three/cannon'
import {
  EffectComposer,
  Bloom
} from '@react-three/postprocessing'
import FlatGround from 'components/3d/FlatGround'
import Terrain from 'components/3d/Terrain'
import SkyDome from 'components/3d/SkyDome'
import Sun from 'components/3d/Sun'
import GameDirector from 'components/3d/GameDirector'
import PauseManager from 'components/3d/PauseManager'
import FirstPersonPlayer from 'components/3d/FirstPersonPlayer'
import GameEventManager from 'components/3d/GameEventManager'

export default function FPGame() {
  return (
    <Physics shouldInvalidate={false}>
      <GameEventManager>
        <PauseManager>
          <GameDirector defaultCam="First Person Cam">
            <FirstPersonPlayer startPosition={[0, 10, 0]} />
          </GameDirector>
        </PauseManager>
        <Sun position={[0, 1000, -1000]} />
        <SkyDome />
        <Terrain />
        <EffectComposer>
          <Bloom intensity={10} luminanceThreshold={0.8} />
        </EffectComposer>
      </GameEventManager>
    </Physics>
  )
}