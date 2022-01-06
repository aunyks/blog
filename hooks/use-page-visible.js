import { useState, useEffect } from 'react'

const usePageVisible = () => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const onVisibilityChange = () => {
      setIsVisible(window.document.visibilityState !== 'hidden')
    }
    onVisibilityChange()
    window.document.addEventListener('visibilitychange', onVisibilityChange)
    return () =>
      window.document.removeEventListener(
        'visibilitychange',
        onVisibilityChange
      )
  }, [])

  return isVisible
}

export default usePageVisible
