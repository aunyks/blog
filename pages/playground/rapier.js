import { Canvas } from '@react-three/fiber'
import OrbitControls from 'components/3d/controls/OrbitControls'
import {
  Physics,
  useSphere,
  usePlane,
  useBox,
  useRay,
} from 'components/3d/RapierPhysics'
import { Euler, Quaternion } from 'three'

function Sphere() {
  const [sphereRef] = useSphere(() => {
    return {
      args: 5,
      velocity: [-2, -8, -4],
      restitution: 1,
    }
  })
  return (
    <mesh ref={sphereRef} position={[4, 7, 0]}>
      <sphereBufferGeometry />
      <meshBasicMaterial color={0xff0000} />
    </mesh>
  )
}

function TriggerBox() {
  useRay(
    () => {
      return {
        origin: { x: -10, y: 2.5, z: -4 },
        direction: { x: 1, y: 0, z: 0 },
        maxToI: 20,
      }
    },
    (x) => {
      console.log(x)
    },
    []
  )

  return (
    <mesh position={[-2, 2.5, -6]}>
      <boxBufferGeometry />
      <meshBasicMaterial color={0x0000ff} wireframe />
    </mesh>
  )
}

function FlatGround({ color = 0xff00ff, width = 10000, length = 10000 }) {
  const quat = new Quaternion().setFromEuler(new Euler(-Math.PI / 2, 0, 0))
  const [physicsRef] = usePlane(() => ({
    mass: 0,
  }))
  return (
    <mesh ref={physicsRef} quaternion={quat}>
      <planeBufferGeometry args={[width, length]} />
      <meshBasicMaterial color={color} />
    </mesh>
  )
}

export default function RapierDemo() {
  return (
    <>
      <div style={{ height: '100vh', width: '100vw' }}>
        <Canvas>
          <Physics>
            <Sphere />
            <TriggerBox />
            <FlatGround />
            <ambientLight intensity={1} />
            <OrbitControls origin={[0, 2, 0]} cameraDistance={5} />
          </Physics>
        </Canvas>
      </div>
    </>
  )
}
