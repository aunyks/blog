import {
  Canvas, useFrame
} from '@react-three/fiber'
import {
  Debug,
  Physics
} from '@react-three/cannon'
import FirstPersonPlayer from 'components/3d/FirstPersonPlayer'
import OrbitControls from 'components/3d/controls/OrbitControls'

import {
  useRef,
  useState,
  useEffect,
  useMemo,
  forwardRef
} from 'react'
import {
  useGraph,
  useLoader
} from '@react-three/fiber'
import { SkeletonUtils } from 'three/examples/jsm/utils/SkeletonUtils'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import useAnimations from 'hooks/3d/use-animations'
import { Group } from 'three'

const AnimAction = 'Arms Only ArmatureAction'

const Xashi = forwardRef((props, ref) => {
  const { scene } = useLoader(GLTFLoader, '/3d/models/slice-n-dice-character.glb')
  const { nodes } = useGraph(scene)
  useEffect(() => {
    return () => nodes.Xashi.geometry.dispose()
  }, [])
  return (
    <mesh ref={ref} geometry={nodes.Xashi.geometry} scale={3.25}>
      <meshBasicMaterial color={0x00ff00} />
    </mesh>
  )
})

function Arms(props) {
  const { scene, animations } = useLoader(GLTFLoader, '/3d/models/slice-n-dice-character.glb')
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes } = useGraph(clone)
  const { ref, actions, names } = useAnimations(animations)

  useEffect(() => {
    console.log(actions)
    console.log(nodes)
    //actions[AnimAction].play()
    //nodes.Xashi_Blade.visible = false
  }, [])

  const swordBone = useRef()
  const swordRef = useRef()
  const pv = useRef()
  const qv = useRef()

  useFrame(() => {
    swordBone.current = SkeletonUtils.getBoneByName('Xashi_Bone', nodes.Arms_Only_Character.skeleton)
    pv.current = swordBone.current.getWorldPosition(pv.current)
    qv.current = swordBone.current.getWorldQuaternion(qv.current)
    if (swordRef.current) {
      // In Blender we only keyframe position and 
      // rotation so that's all we need to sync
      swordRef.current.position.copy(pv.current)
      swordRef.current.quaternion.copy(qv.current)
    }
  })

  return (
    <group
      ref={ref} {...props}>
      <primitive object={nodes.Root_Bone} />
      <skinnedMesh
        castShadow
        receiveShadow
        geometry={nodes.Arms_Only_Character.geometry}
        skeleton={nodes.Arms_Only_Character.skeleton}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[100, 100, 100]}>
        <meshStandardMaterial color={0xffff00} skinning />
      </skinnedMesh>
      <Xashi ref={swordRef} />
    </group>
  )
}

function Showcase({
  physicsProps,
  cameraDistance = 10,
  origin = [0, 0, 0],
  children
}) {
  return (
    <>
      <Physics {...physicsProps}>
        <Debug color="black" scale={1.1}>
          {children}
          <OrbitControls origin={origin} cameraDistance={cameraDistance} />
        </Debug>
      </Physics>
    </>
  )
}

export default function ShowcasePage() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas gl={{ powerPreference: 'low-power' }}>
        <Showcase physicsProps={{ gravity: [0, 0, 0] }}>
          <pointLight position={[-30, 30, 0]} intensity={1} />
          <Arms />
          {/* <FirstPersonPlayer freezeControls /> */}
        </Showcase>
      </Canvas>
    </div>
  )
}