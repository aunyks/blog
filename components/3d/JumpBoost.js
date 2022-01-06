import { useBox } from '@react-three/cannon'
import { useCallback, useRef } from 'react'
import createUserData from 'utils/3d/createUserData'

export default function JumpBoost({
  position = [0, 0, 0],
  velocity = 0,
  name = 'JumpBoost',
  ...props
}) {
  useCallback
  const emit = useCallback((data) => {
    window.postMessage(data, window.origin)
  }, [])

  const boostRef = useRef()
  const [_, boostBox] = useBox(
    () => {
      return {
        isTrigger: true,
        position: position,
        onCollide: ({ body }) => {
          if (body.userData.type === 'Player') {
            emit({ type: 'PLAYER_JUMP', velocity: velocity })
          }
        }
      }
    },
    boostRef,
    []
  )

  const userData = useRef(
    createUserData({
      type: 'JumpBoost',
      name: name,
      velocity: velocity
    })
  )
  return (
    <mesh ref={boostRef} userData={userData.current} {...props}>
      <boxBufferGeometry />
      <meshBasicMaterial color={0xff0000} />
    </mesh>
  )
}
