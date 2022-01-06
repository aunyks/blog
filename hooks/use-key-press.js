import { useState, useEffect } from 'react'

const useKeyPress = (targetKey) => {
  const [keyPressed, setKeyPressed] = useState(false)

  function onKeyDown({ key }) {
    if (key === targetKey) {
      setKeyPressed(true)
    }
  }

  const onKeyUp = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false)
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

  return keyPressed
}

export default useKeyPress
