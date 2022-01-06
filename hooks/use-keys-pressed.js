import { useState, useEffect } from 'react'

export default function useKeysPressed(targetKeys) {
  const [aKeyPressed, setAKeyPressed] = useState(false)

  function onKeyDown({ key }) {
    if (targetKeys.includes(key)) {
      setAKeyPressed(true)
    }
  }

  function onKeyUp({ key }) {
    if (targetKeys.includes(key)) {
      setAKeyPressed(false)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  return aKeyPressed
}
