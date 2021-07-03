import {
  Suspense,
  useEffect
} from 'react'
import Head from 'next/head'
import {
  Canvas
} from '@react-three/fiber'
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

function GameLoading() {
  return (
    <p>Loading...</p>
  )
}

export default function Game() {
  useEffect(() => {
    // Disable pinch zoom on iOS Safari. I'm aware of a11y conflict, but this 
    // is for better input and more native-like behavior
    window.document.addEventListener('gesturechange', e => e.preventDefault())
  }, [])
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
      </Head>
      <style jsx global>{`
        html, body {
          /* Let us fill the viewport without scroll */
          margin: 0;
          padding: 0;
          /* Don't need double-tap zoom */
          touch-action: manipulation;
          overflow: hidden;
        }
      `}</style>
      <div style={{ height: '100vh', width: '100vw' }}>
        <Canvas frameloop="demand">
          <Suspense fallback={<GameLoading />}>
            <Physics shouldInvalidate={false}>
              <PauseManager>
                <GameDirector defaultCam="First Person Cam">
                  <FirstPersonPlayer startPosition={[0, 10, 0]} />
                </GameDirector>
              </PauseManager>
              <Sun position={[0, 1000, -1000]} />
              <SkyDome />
              <Terrain />
              <EffectComposer>
                <Bloom luminanceThreshold={0.5} luminanceSmoothing={1.2} intensity={0.7} />
              </EffectComposer>
            </Physics>
          </Suspense>
        </Canvas >
      </div >
    </>
  )
}