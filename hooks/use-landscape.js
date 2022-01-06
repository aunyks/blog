import { useState, useEffect } from 'react'

const useLandscape = () => {
  const [isLandscape, setLandscape] = useState(false)

  useEffect(() => {
    const onOrientationChange = ({ matches }) => {
      setLandscape(matches)
    }
    setLandscape(
      window.matchMedia('screen and (orientation:landscape)').matches
    )

    try {
      // For Chrome / FireFox
      window
        .matchMedia('screen and (orientation:landscape)')
        .addEventListener('change', onOrientationChange)
    } catch (e) {
      // For Safari
      window
        .matchMedia('screen and (orientation:landscape)')
        .addListener(onOrientationChange)
    }
    return () => {
      try {
        // For Chrome / FireFox
        window
          .matchMedia('screen and (orientation:landscape)')
          .removeEventListener('change', onOrientationChange)
      } catch (e) {
        // For Safari
        window
          .matchMedia('screen and (orientation:landscape)')
          .removeListener(onOrientationChange)
      }
    }
  }, [])

  return isLandscape
}

export default useLandscape
