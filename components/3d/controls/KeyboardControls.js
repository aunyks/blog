import {
  useEffect,
  useContext,
  useRef
} from 'react'
import {
  Object3D
} from 'three'
import useKeysPressed from 'hooks/use-keys-pressed'
import PauseContext from 'contexts/3d/PauseContext'

export default function KeyboardControls({ onForwardBack, onLeftRight, ...props }) {
  const kbdForward = useKeysPressed(['w', 'W', 'ArrowUp'])
  const kbdLeft = useKeysPressed(['a', 'A', 'ArrowLeft'])
  const kbdBack = useKeysPressed(['s', 'S', 'ArrowDown'])
  const kbdRight = useKeysPressed(['d', 'D', 'ArrowRight'])
  const p = useKeysPressed(['p', 'P'])
  const { isPaused, setPaused } = useContext(PauseContext)
  useEffect(() => {
    if (p) {
      setPaused(!isPaused)
    }
  }, [p])

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

  return null
}