import { Canvas } from '@react-three/fiber'
import { useEffect, useRef, useCallback } from 'react'
import OrbitControls from 'components/3d/controls/OrbitControls'

function Physics({ children }) {
  const workerRef = useRef()
  useEffect(() => {
    workerRef.current = new Worker(
      new URL('../../web-workers/rapier.js', import.meta.url)
    )
    workerRef.current.onmessage = (evt) =>
      alert(`WebWorker Response => ${evt.data}`)
    window.rapierWorker = workerRef.current
    return () => {
      workerRef.current.terminate()
    }
  }, [])
  return <>{children}</>
}

// function Box(props) {
//   const [boxRef] = useBox(() => {
//     return { mass: 1 }
//   })
//   return (
//     <mesh ref={boxRef} {...props}>
//       <boxBufferGeometry />
//       <meshBasicMaterial color={0xff0000} />
//     </mesh>
//   )
// }

export default function CannonDemo() {
  return (
    <>
      <div style={{ height: '100vh', width: '100vw' }}>
        <Canvas>
          <Physics>
            {/* <Box /> */}
            <ambientLight intensity={1} />
            <OrbitControls origin={[0, 2, 0]} cameraDistance={5} />
          </Physics>
        </Canvas>
      </div>
    </>
  )
}
