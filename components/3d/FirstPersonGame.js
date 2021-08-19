import {
  EffectComposer,
  Bloom
} from '@react-three/postprocessing'
import TimeScaleManager from 'components/3d/TimeScaleManager'
import TimeSensitivePhysics from 'components/3d/TimeSensitivePhysics'
import FlatGround from 'components/3d/FlatGround'
import Terrain from 'components/3d/Terrain'
import SkyDome from 'components/3d/SkyDome'
import Sun from 'components/3d/Sun'
import GameDirector from 'components/3d/GameDirector'
import PauseManager from 'components/3d/PauseManager'
import FirstPersonPlayer from 'components/3d/FirstPersonPlayer'
import JumpBoost from 'components/3d/JumpBoost'

export default function FPGame() {
  return (
    <TimeScaleManager>
      <TimeSensitivePhysics shouldInvalidate={false}>
        <PauseManager>
          <GameDirector defaultCam="First Person Cam">
            <FirstPersonPlayer startPosition={[0, 10, 0]} />
          </GameDirector>
          <JumpBoost position={[0, -6.5, -1]} velocity={3} />
        </PauseManager>
        <Sun position={[0, 1000, -1000]} />
        <SkyDome />
        <Terrain />
        <EffectComposer>
          <Bloom intensity={10} luminanceThreshold={0.8} />
        </EffectComposer>
      </TimeSensitivePhysics>
    </TimeScaleManager>
  )
}