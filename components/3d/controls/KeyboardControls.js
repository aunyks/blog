import {
  useEffect,
  useRef
} from 'react'
import {
  Object3D
} from 'three'
import useKeysPressed from 'hooks/use-keys-pressed'

export default function KeyboardControls({ onForwardBack, onLeftRight, ...props }) {
  const kbdForward = useKeysPressed(['w', 'W', 'ArrowUp'])
  const kbdLeft = useKeysPressed(['a', 'A', 'ArrowLeft'])
  const kbdBack = useKeysPressed(['s', 'S', 'ArrowDown'])
  const kbdRight = useKeysPressed(['d', 'D', 'ArrowRight'])

  let forwardBackValue = 0
  let leftRightValue = 0
  if (kbdForward) {
    forwardBackValue = 1
  }
  if (kbdBack) {
    forwardBackValue = -1
  }
  if (kbdRight) {
    leftRightValue = 1
  }
  if (kbdLeft) {
    leftRightValue = -1
  }

  useEffect(() => {
    onForwardBack(forwardBackValue)
  }, [kbdForward, kbdBack])


  useEffect(() => {
    onLeftRight(leftRightValue)
  }, [kbdRight, kbdLeft])

  // R3F requires that a primitive have an object 
  // prop by a Three.js object, so let's give it an empty object
  const dummyObject = useRef(new Object3D())

  return <primitive object={dummyObject.current} visible={false} {...props} />
}