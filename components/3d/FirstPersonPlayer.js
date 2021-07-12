import {
  useRef,
  useEffect,
  useLayoutEffect,
  useState
} from 'react'
import {
  useFrame,
  useThree
} from '@react-three/fiber'
import {
  useSphere
} from '@react-three/cannon'
import {
  Euler,
  Vector3
} from 'three'
import {
  Buttons,
  Gamepad
} from 'components/3d/controls/Gamepad'
import Camera from 'components/3d/Camera'
import CameraShake from 'components/3d/CameraShake'
import PointerLockControls from 'components/3d/controls/PointerLockControls'
import TouchControls from 'components/3d/controls/TouchControls'
import KeyboardControls from 'components/3d/controls/KeyboardControls'
import DpadControls from 'components/3d/controls/DpadControls'
import VirtualJoystick from 'components/3d/controls/VirtualJoystick'
import useDeviceSize from 'hooks/use-device-size'

const PLAYER_MOVEMENT_SPEED = 5

const PHYSICS_SPHERE_DIAMETER = 0.35
const PHYSICS_SPHERE_RADIUS = PHYSICS_SPHERE_DIAMETER / 2

const MIN_CAMERA_PITCH_ANGLE = Math.PI / 3
const MAX_CAMERA_PITCH_ANGLE = 4 * Math.PI / 6

export default function FirstPersonPlayer({
  startPosition = [0, 2, 0],
  freezeControls
}) {
  //const deviceSize = useDeviceSize()
  const gamepadRef = useRef()
  const movementJoystick = useRef()
  const firstPersonCameraAnchor = useRef()

  // The player has a spherical physics body to 
  // allow for smooth movement
  const [playerPhysicsMesh, playerPhysicsObject] = useSphere(() => ({
    mass: 1,
    position: startPosition,
    // Sphere radius should be half the average human shoulder width (35cm)
    args: PHYSICS_SPHERE_RADIUS
  }))
  // Also has a separate mesh that will be rendered to the screen
  const playerMesh = useRef()

  // Movement controls will tell us when and how quickly to move based on 
  // these values
  const [forwardBack, setForwardBack] = useState(0)
  const [leftRight, setLeftRight] = useState(0)
  // If the gamepad is connected, we don't render the dpad on mobile
  const [gamepadConnected, setGamepadConnected] = useState(false)
  // Controls need to be enabled after first render so that 
  // they have access to a defined playerMesh ref. Thus, 
  // we only enable them right after mounting, since the ref will 
  // be defined after first render
  const [controlsEnabled, setControlsEnabled] = useState(false)
  const [isPointerLockAvailable, setPointerLockAvailable] = useState(false)
  useEffect(() => {
    if (!freezeControls) {
      setControlsEnabled(true)
    }
  }, [freezeControls])
  useEffect(() => {
    setPointerLockAvailable('pointerLockElement' in window.document ||
      'mozPointerLockElement' in window.document ||
      'webkitPointerLockElement' in window.document)
  }, [])

  // This is the velocity of the player in the *current* frame. 
  // It will be updated after each tick in the physics world
  const velocity = useRef(new Vector3(0, 0, 0))
  // Position camera about 6' off the ground
  const cameraPositionOffset = useRef(new Vector3(0, -PHYSICS_SPHERE_RADIUS + 1.85, 0))
  useEffect(() => {
    const velocityUnsubscribe = playerPhysicsObject.velocity.subscribe(newVelocity => {
      velocity.current.fromArray(newVelocity)
    })
    // Whenever the physics object changes in position, 
    // the visible mesh moves to the same position while 
    // making sure it's visibly touching the ground (assuming visible mesh origin is at ground)
    const visibleMeshPositionOffset = new Vector3(0, -PHYSICS_SPHERE_RADIUS, 0)
    const positionUnsubscribe = playerPhysicsObject.position.subscribe(newPosition => {
      playerMesh.current.position.fromArray(newPosition).add(visibleMeshPositionOffset)
    })

    return () => {
      velocityUnsubscribe()
      positionUnsubscribe()
    }
  }, [])

  // Create refs for vectors that will be changed 
  // or used on every frame to remove strain from the garbage collector
  const forwardVector = useRef(new Vector3(0, 0, 0))
  const sideVector = useRef(new Vector3(0, 0, 0))
  const newVelocity = useRef(new Vector3(0, 0, 0))
  // This is just for restricting the camera pitch
  const cameraAnchorEuler = useRef(new Euler())
  // This is for gamepads to control player mesh yaw
  const playerEuler = useRef(new Euler())

  // On each frame tick in our graphics world...
  useFrame(({ camera }) => {
    if (controlsEnabled) {
      // Restrict camera pitch to override what TouchControls and PointerLockControls 
      // moved it to. This logic is repeated for gamepads below
      cameraAnchorEuler.current.setFromQuaternion(firstPersonCameraAnchor.current.quaternion, 'YXZ')
      cameraAnchorEuler.current.x = Math.max(Math.PI / 2 - MAX_CAMERA_PITCH_ANGLE, Math.min(Math.PI / 2 - MIN_CAMERA_PITCH_ANGLE, cameraAnchorEuler.current.x))
      firstPersonCameraAnchor.current.quaternion.setFromEuler(cameraAnchorEuler.current)
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

    if (controlsEnabled) {
      if (movementJoystick.current) {
        forwardVector.current.set(0, 0, movementJoystick.current.y)
        sideVector.current.set(-movementJoystick.current.x, 0, 0)
      }

      if (gamepadRef.current) {
        forwardVector.current.set(0, 0, gamepadRef.current.axes[1])
        sideVector.current.set(-gamepadRef.current.axes[0], 0, 0)
        // Update yaw euler
        playerEuler.current.setFromQuaternion(playerMesh.current.quaternion, 'YXZ')
        playerEuler.current.y -= gamepadRef.current.axes[2] * 0.04
        playerMesh.current.quaternion.setFromEuler(playerEuler.current)
        // Update pitch euler
        cameraAnchorEuler.current.setFromQuaternion(camera.quaternion, 'YXZ')
        cameraAnchorEuler.current.x -= gamepadRef.current.axes[3] * 0.05
        camera.quaternion.setFromEuler(cameraAnchorEuler.current)
      }
    }

    // Determine the direction the camera is facing and 
    // create a velocity-scaled movement vector in that direction
    if (playerMesh.current !== undefined) {
      newVelocity.current
        .subVectors(forwardVector.current, sideVector.current)
        .multiplyScalar(PLAYER_MOVEMENT_SPEED)
        .applyEuler(playerMesh.current.rotation)
    }

    // Tell the physics world to move the player sphere in that direction.
    // Next frame, the cycle repeats
    playerPhysicsObject.velocity.set(newVelocity.current.x, velocity.current.y, newVelocity.current.z)
  })

  return (
    <>
      <mesh ref={playerMesh} castShadow>
        <boxBufferGeometry />
        <meshPhongMaterial color={0xff0000} />
        <group ref={firstPersonCameraAnchor} position={cameraPositionOffset.current}>
          <Camera name="First Person Cam" fov={75} near={0.01} far={1000 * 20}>
            {/*
            We child virtual controls to the camera so that it's always in front of 
            the camera like a HUD. And we only want it to show on small / touch devices
          */}
            {/* {controlsEnabled && !gamepadConnected && !isPointerLockAvailable && (
            <DpadControls onForwardBack={setForwardBack} onLeftRight={setLeftRight} />
          )} */}
            {controlsEnabled && !gamepadConnected && !isPointerLockAvailable && (
              <VirtualJoystick ref={movementJoystick} />
            )}
            <CameraShake decay intensity={0} />
          </Camera>
        </group>
      </mesh>
      <mesh ref={playerPhysicsMesh} visible={false}>
        <sphereBufferGeometry />
        <meshPhongMaterial color={0x00ff00} />
      </mesh>
      {/*
        If the device is small, it's likely touch screen.
        Enable touch controls on small devices, pointer lock controls on large ones.
      */}
      {controlsEnabled && !isPointerLockAvailable && (
        <TouchControls yawTarget={playerMesh.current} pitchTarget={firstPersonCameraAnchor.current} />
      )}
      {controlsEnabled && isPointerLockAvailable && (
        <PointerLockControls yawTarget={playerMesh.current} pitchTarget={firstPersonCameraAnchor.current} />
      )}
      {controlsEnabled && (
        <KeyboardControls onForwardBack={setForwardBack} onLeftRight={setLeftRight} />
      )}
      <Gamepad
        ref={gamepadRef}
        padIndex={0}
        onConnectionChange={(connected) => {
          setGamepadConnected(connected)
        }} />
    </>
  )
}