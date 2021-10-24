import {
  useState,
  useEffect
} from 'react'

// More fine grained than useDeviceSize
const useInnerWidth = () => {
  const [innerWidth, setInnerWidth] = useState(0)

  useEffect(() => {
    const calculateInnerWidth = () => {
      setInnerWidth(window.innerWidth)
    }
    calculateInnerWidth()
    window.addEventListener('resize', calculateInnerWidth)
    return () => window.removeEventListener('resize', calculateInnerWidth)
  }, [])

  return innerWidth
}

export default useInnerWidth