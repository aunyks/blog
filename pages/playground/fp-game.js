import {
  useEffect
} from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import {
  Canvas
} from '@react-three/fiber'
import Html from 'components/3d/3d-html'
import ErrorBoundary from 'components/ErrorBoundary'

function GameError() {
  return (
    <Html fullscreen style={{ zIndex: 1 }}>
      <div className="flex justify-center items-center">
        <p>Error!</p>
      </div>
    </Html>
  )
}

function GameLoading({ error }) {
  // Next passes an error prop only on loading error, so 
  // the dynamic import should still be childed to an 
  // ErrorBoundary to catch other types of errors
  if (!!error) {
    return (<GameError />)
  }
  return (
    <Html fullscreen style={{ zIndex: 2 }}>
      <div className="flex justify-center items-center">
        <p>Loading...</p>
      </div>
    </Html>
  )
}

// The same loading and error behavior can be achieved 
// with React Suspense and ErrorBoundary, but
const FPGame = dynamic(
  () => import('../../components/3d/FirstPersonGame.js'),
  { loading: GameLoading, ssr: false }
)

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
          <ErrorBoundary fallback={<GameError />}>
            <FPGame />
          </ErrorBoundary>
        </Canvas >
      </div >
    </>
  )
}