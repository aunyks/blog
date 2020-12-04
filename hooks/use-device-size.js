import {
  useState,
  useEffect
} from 'react'

const getDeviceSizeFromWidth = (width) => {
  console.log(width)
  if (width <= 320) {
    return 'xs'
  } else if (width < 415) {
    return 'sm'
  } else if (width < 1025) {
    return 'md'
  } else if (width >= 1026) {
    return 'lg'
  } else {
    throw new Error('Unexpected device size detected')
  }
}

const useDeviceSize = () => {
  const [deviceSize, setDeviceSize] = useState(null)

  useEffect(() => {
    const calculateInnerWidth = () => {
      setDeviceSize(getDeviceSizeFromWidth(window.innerWidth))
    }
    calculateInnerWidth()
    window.addEventListener('resize', calculateInnerWidth)
    return () => window.removeEventListener('resize', calculateInnerWidth)
  }, [])

  return deviceSize
}

export default useDeviceSize