import {
  useRef,
  useState,
  useEffect,
  useMemo
} from 'react'
import {
  useGraph,
  useLoader,
  useFrame
} from '@react-three/fiber'
import { Quaternion, Vector3 } from 'three'
import { SkeletonUtils } from 'three/examples/jsm/utils/SkeletonUtils'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import useAnimations from 'hooks/3d/use-animations'
import Xashi from 'components/3d/Xashi'

const AnimAction = 'Arms Only ArmatureAction'

export default function Arms({
  position = [0, 0, 0],
  ...props
}) {
  const { scene, animations } = useLoader(GLTFLoader, '/3d/models/slice-n-dice-3d-assets.glb')
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes } = useGraph(clone)
  const { ref, actions, names } = useAnimations(animations)

  useEffect(() => {
    swordBone.current = SkeletonUtils.getBoneByName('Xashi_Bone', nodes.Arms_Only_Character.skeleton)
    //actions[AnimAction].play()
  }, [])

  const swordBone = useRef()
  const swordRef = useRef()
  const pv = useRef()
  const qv = useRef()
  const refWorldQuaternion = useRef(new Quaternion())
  const currentPosition = useRef((new Vector3()).fromArray(position))

  useFrame(() => {
    ref.current.position.lerp(currentPosition.current, 0.7)
    ref.current.getWorldQuaternion(refWorldQuaternion.current)
    if (swordBone.current) {
      pv.current = swordBone.current.getWorldPosition(pv.current)
      qv.current = swordBone.current.getWorldQuaternion(qv.current)
    }
    if (swordRef.current) {
      // In Blender we only keyframe position and 
      // rotation so that's all we need to sync
      swordRef.current.position.copy(ref.current.worldToLocal(pv.current))
      swordRef.current.
        quaternion
        .multiplyQuaternions(refWorldQuaternion.current.invert(), qv.current)
    }
  })

  return (
    <group
      ref={ref} {...props} scale={0.25}>
      <primitive object={nodes.Root_Bone} rotation={[0, Math.PI, 0]} />
      <skinnedMesh
        castShadow
        receiveShadow
        geometry={nodes.Arms_Only_Character.geometry}
        skeleton={nodes.Arms_Only_Character.skeleton}
        scale={[100, 100, 100]}>
        <meshStandardMaterial color={0xffff00} skinning />
      </skinnedMesh>
      <Xashi ref={swordRef} />
    </group>
  )
}