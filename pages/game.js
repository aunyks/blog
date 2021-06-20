import {
  Canvas
} from '@react-three/fiber'
import {
  Physics
} from '@react-three/cannon'
import FirstPersonPlayer from 'components/3d/FirstPersonPlayer'
import FlatGround from 'components/3d/FlatGround'

export default function Game() {
  return (
    <>
      <style jsx>{`
        div {
          width: 100vw;
          height: 100vh;
        }
      `}</style>
      <div className="w-full h-full">
        <Canvas>
          <Physics>
            <ambientLight intensity={1} />
            <mesh position={[0, 0, -4]}>
              <meshBasicMaterial attach="material" color={0x0000ff} />
              <boxBufferGeometry />
            </mesh>
            <FirstPersonPlayer />
            <FlatGround />
          </Physics>
        </Canvas>
      </div>
    </>
  )
}