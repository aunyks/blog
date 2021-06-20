import {
  useRef,
  useEffect,
  useLayoutEffect,
  useState
} from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import {
  useSphere
} from '@react-three/cannon'
import {
  Euler,
  Vector3
} from 'three'
import PointerLockControls from 'components/3d/controls/PointerLockControls'
import TouchControls from 'components/3d/controls/TouchControls'
import KeyboardControls from 'components/3d/controls/KeyboardControls'
import DpadControls from 'components/3d/controls/DpadControls'
import Camera from 'components/3d/Camera'
import useDeviceSize from 'hooks/use-device-size'

const PLAYER_MOVEMENT_SPEED = 5

const MIN_CAMERA_PITCH_ANGLE = Math.PI / 3
const MAX_CAMERA_PITCH_ANGLE = 4 * Math.PI / 6

export default function FirstPersonPlayer() {
  const deviceSize = useDeviceSize()

  // The player has a spherical physics body to 
  // allow for smooth movement
  const [playerPhysicsMesh, playerPhysicsObject] = useSphere(() => ({
    mass: 1,
    position: [0, 1.5, 0]
  }))
  // Also has a separate mesh that will be rendered to the screen
  const playerMesh = useRef()

  // Movement controls will tell us when and how quickly to move based on 
  // these values
  const [forwardBack, setForwardBack] = useState(0)
  const [leftRight, setLeftRight] = useState(0)

  // Controls need to be enabled after first render so that 
  // they have access to a defined playerMesh ref. Thus, 
  // we only enable them right after mounting, since the ref will 
  // be defined after first render
  const [controlsEnabled, setControlsEnabled] = useState(false)
  useEffect(() => {
    setControlsEnabled(true)
  }, [])

  // This is the velocity of the player in the *current* frame. 
  // It will be updated after each tick in the physics world
  const velocity = useRef(new Vector3(0, 0, 0))
  useEffect(() => {
    playerPhysicsObject.velocity.subscribe(newVelocity => {
      velocity.current = new Vector3(newVelocity[0], newVelocity[1], newVelocity[2])
    })
  }, [])

  // Create refs for vectors that will be changed 
  // or used on every frame to remove strain from the garbage collector
  const forwardVector = useRef(new Vector3(0, 0, 0))
  const sideVector = useRef(new Vector3(0, 0, 0))
  const newVelocity = useRef(new Vector3(0, 0, 0))
  // This is just for restricting the camera pitch. 
  // Ideally, the playerMesh only does yaw rotation and camera 
  // does pitch, but right now we're doing both on playerMesh 
  // so that what it's used for right now
  const cameraEuler = useRef(new Euler())

  // On each frame tick in our graphics world...
  useFrame(({ camera }) => {
    // Restrict
    // @ts-ignore
    cameraEuler.current.setFromQuaternion(playerMesh.current.quaternion, 'YXZ')
    cameraEuler.current.x = Math.max(Math.PI / 2 - MAX_CAMERA_PITCH_ANGLE, Math.min(Math.PI / 2 - MIN_CAMERA_PITCH_ANGLE, cameraEuler.current.x))
    // @ts-ignore
    playerMesh.current.quaternion.setFromEuler(cameraEuler.current)

    // Put our camera in the center of the player sphere (the position of which is 
    // calculated in the physics world), wherever it may be in this frame
    if (playerPhysicsMesh.current !== undefined && playerMesh.current !== undefined) {
      playerMesh.current.position.copy(playerPhysicsMesh.current.position)
    }
    // Calculate the forward-back and left-right motion 
    // vectors. Values are 0 or 1 to indicate motion or lack thereof.
    // Motion will be scaled to velocity later
    forwardVector.current.set(
      0, 0, -forwardBack
    )
    sideVector.current.set(
      -leftRight, 0, 0
    )

    // Determine the direction the camera is facing and 
    // create a velocity-scaled movement vector in that direction
    if (playerMesh.current !== undefined) {
      newVelocity.current
        .subVectors(forwardVector.current, sideVector.current)
        .normalize()
        .multiplyScalar(PLAYER_MOVEMENT_SPEED)
        .applyEuler(playerMesh.current.rotation)
    }

    // Tell the physics world to move the player sphere in that direction.
    // Next frame, the cycle repeats
    playerPhysicsObject.velocity.set(newVelocity.current.x, velocity.current.y, newVelocity.current.z)
  })

  return (
    <>
      <mesh ref={playerMesh} visible={false}>
        <boxBufferGeometry attach="geometry" />
        <meshPhongMaterial attach="material" color={0x0000ff} />
        <Camera position={[0, 0, 0]} fov={75} near={0.001} far={1000}>
          {/*
            We child dpad controls to the camera so that it's always in front of 
            the camera like a HUD. And we only want it to show on small / touch devices
          */}
          {controlsEnabled && ['xs', 'sm', 'md'].includes(deviceSize) && (
            <DpadControls position={[-0.1, -0.4, -1]} onForwardBack={setForwardBack} onLeftRight={setLeftRight} />
          )}
        </Camera>
      </mesh>
      <mesh ref={playerPhysicsMesh} visible={false}>
        <sphereBufferGeometry attach="geometry" />
        <meshPhongMaterial attach="material" color={0x00ff00} />
      </mesh>
      {/*
        If the device is small, it's likely touch screen.
        Enable touch controls on small devices, pointer lock controls on large ones.
      */}
      {controlsEnabled && ['xs', 'sm', 'md'].includes(deviceSize) && (
        <TouchControls target={playerMesh.current} />
      )}
      {controlsEnabled && !['xs', 'sm', 'md'].includes(deviceSize) && (
        <PointerLockControls target={playerMesh.current} />
      )}
      {controlsEnabled && (
        <KeyboardControls onForwardBack={setForwardBack} onLeftRight={setLeftRight} />
      )}
    </>
  )
}