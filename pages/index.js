import {
  useState,
  useEffect,
  useRef,
  Suspense
} from 'react'
import Head from 'next/head'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import Navbar from 'components/Navbar'
import useDarkMode from 'hooks/use-dark-mode'
import useDeviceSize from 'hooks/use-device-size'
import usePageVisible from 'hooks/use-page-visible'
import { MathUtils, MeshBasicMaterial } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function Bolt() {
  const model = useLoader(GLTFLoader, '/3d/models/aunyks-bolt.glb')
  const [boltPosition, setBoltPosition] = useState([3, 0, 0])
  const [boltScale, setBoltScale] = useState(2)
  const [boltColor, setBoltColor] = useState(null)
  const [targetYRotation, setTargetYRotation] = useState(-Math.PI / 2 + 2 * Math.PI)
  const deviceSize = useDeviceSize()
  const isDarkMode = useDarkMode()
  const isPageVisible = usePageVisible()
  const boltRef = useRef()

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js', { scope: '/' })
    }
  }, [])

  useEffect(() => {
    switch (deviceSize) {
      case 'xs':
        setBoltScale(1)
        setBoltPosition([0, 1.5, 0])
        break
      case 'sm':
        setBoltScale(1.25)
        setBoltPosition([0, 1, 0])
        break
      case 'md':
        setBoltScale(1.75)
        setBoltPosition([0, 1, 0])
        break
      default:
        setBoltScale(2)
        setBoltPosition([3, 0, 0])
    }
  }, [deviceSize])

  useEffect(() => {
    if (boltRef && boltRef.current) {
      boltRef.current.traverse(function (modelChild) {
        if (modelChild.isMesh) {
          modelChild.material = new MeshBasicMaterial({
            color: isDarkMode ? 0xffffff : 0x000000
          })
        }
      })
    }
  }, [isDarkMode])

  useEffect(() => {
    setTimeout(function refreshYRotation() {
      const newYRotation = isPageVisible ? targetYRotation + 2 * Math.PI : targetYRotation + 0.0001
      setTargetYRotation(newYRotation)
    }, 10000)
  }, [targetYRotation])

  useFrame(() => {
    if (boltRef && boltRef.current) {
      boltRef.current.rotation.y = MathUtils.lerp(boltRef.current.rotation.y, targetYRotation, 0.02)
    }
  })
  return (
    <primitive
      ref={boltRef}
      object={model.scene}
      position={boltPosition}
      scale={boltScale}
    />
  )
}

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Hi-Voltage</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Increasing potential" />
        <meta name="author" content="Gerald Nash" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@aunyks" />
        <meta name="twitter:creator" content="@aunyks" />
        <meta name="twitter:title" content="Hi-Voltage" />
        <meta name="twitter:description" content="Increasing potential" />
        <meta name="twitter:image" content="https://blog.aunyks.com/img/default-card-image.png" />
        <link rel="stylesheet" href="/css/homepage.css" />
        <link rel="apple-touch-icon" href="/pwa/icon-192x192.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Navbar />
      <div className="layer-container">
        <main className="layer w-full">
          <section id="greeting-section" className="flex flex-col justify-end lg:justify-center w-full h-full">
            <div id="greeting" className="px-3 lg:px-24">
              <h1 className="text-3xl lg:text-5xl">
                Hi-Voltage
              </h1>
              <h2 className="text-lg lg:text-3xl">
                Increasing potential
              </h2>
            </div>
          </section>
        </main>
        <div className="layer game-viewport">
          <Canvas>
            <Suspense fallback={null}>
              <Bolt />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </>
  )
}
