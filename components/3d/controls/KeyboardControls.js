import { useEffect, useContext, useRef } from 'react'
import { Object3D } from 'three'
import useKeysPressed from 'hooks/use-keys-pressed'
import PauseContext from 'contexts/3d/PauseContext'

export default function KeyboardControls({
  onForwardBack,
  onLeftRight,
  onJump,
  onDash,
  ...props
}) {
  const kbdForward = useKeysPressed(['w', 'W', 'ArrowUp'])
  const kbdLeft = useKeysPressed(['a', 'A', 'ArrowLeft'])
  const kbdBack = useKeysPressed(['s', 'S', 'ArrowDown'])
  const kbdRight = useKeysPressed(['d', 'D', 'ArrowRight'])
  const p = useKeysPressed(['p', 'P'])
  const f = useKeysPressed(['f', 'F'])
  const spacebarDown = useKeysPressed(['space', 'Space'])

  const { isPaused, setPaused } = useContext(PauseContext)
  useEffect(() => {
    if (p) {
      setPaused(!isPaused)
    }
  }, [p])

  useEffect(() => {
    if (f) {
      onDash()
    }
  }, [f])

  useEffect(() => {
    if (spacebarDown) {
      onJump()
    }
  }, [spacebarDown])

  useEffect(() => {
    if (kbdForward) {
      onForwardBack(1)
    }
    if (kbdBack) {
      onForwardBack(-1)
    }
    if (!kbdBack && !kbdForward) {
      onForwardBack(0)
    }
  }, [kbdForward, kbdBack])

  useEffect(() => {
    if (kbdRight) {
      onLeftRight(1)
    }
    if (kbdLeft) {
      onLeftRight(-1)
    }
    if (!kbdLeft && !kbdRight) {
      onLeftRight(0)
    }
  }, [kbdRight, kbdLeft])

  return null
}
