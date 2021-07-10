import {
  Suspense,
  useEffect,
  useState,
  useRef
} from 'react'
import Navbar from 'components/Navbar'
import PostHead from 'components/PostHead'
import {
  Canvas,
  useFrame,
  extend
} from '@react-three/fiber'
import {
  Euler,
  Object3D,
  Quaternion,
  Vector3
} from 'three'
import SimpleCamera from 'components/3d/SimpleCamera'

extend({ Object3D })

function GameLoading() {
  return (
    <p>Loading...</p>
  )
}

function Scene({
  originPosition = new Vector3(0, 0, 0),
  originRotation = new Euler(0, 0, 0, 'YXZ'),
  positionLerpRate = 0.05,
  rotationLerpRate = 0.05,
  cameraDistance = 5,
  cameraLerpRate = 0.05,
}) {
  const originObject = useRef()
  const camera = useRef()
  const originObjectTargetQuaternion = useRef((new Quaternion()).setFromEuler(originRotation))
  const targetCameraPosition = new Vector3(0, 0, cameraDistance)

  useFrame(() => {
    originObjectTargetQuaternion.current.setFromEuler(originRotation)
    originObject.current.quaternion.slerp(originObjectTargetQuaternion.current, rotationLerpRate)
    originObject.current.position.lerp(originPosition, positionLerpRate)
    camera.current.position.lerp(targetCameraPosition, cameraLerpRate)
  })
  return (
    <Suspense fallback={<GameLoading />}>
      <mesh>
        <boxBufferGeometry />
        <meshStandardMaterial color="red" />
      </mesh>
      <pointLight position={[0, 1, 1]} intensity={1} />
      <object3D ref={originObject}>
        <SimpleCamera ref={camera} />
      </object3D>
    </Suspense>
  )
}

export default function ThreeDPost() {
  const note = useRef("Hello from ")
  return (
    <>
      <PostHead
        title="A 3D Post"
        subtitle="That is 3d"
        description="Did I mention it's 3d?" />
      <Navbar />
      <div style={{ width: '100vw', height: '100vh' }} className="relative">
        <div className="w-full h-full" style={{ zIndex: '-1' }}>
          <Canvas gl={{ powerPreference: 'low-power' }}>
            <Scene />
          </Canvas >
        </div>
        <div className="absolute top-0 left-0 w-full h-full grid grid-cols-1 lg:grid-cols-3">
          <section className="pt-8 px-3 lg:py-24 lg:px-24 order-last lg:order-first" >
            <p>
              {note.current}
            </p>
          </section>
          <span />
          <span />
        </div>
      </div>
    </>
  )
}