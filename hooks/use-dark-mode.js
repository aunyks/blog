import {
  useState,
  useEffect
} from 'react'

const useDarkMode = () => {
  const [isDark, setDark] = useState(false)

  useEffect(() => {
    const onDarkModeChange = ({ matches }) => {
      setDark(matches)
    }
    setDark(window.matchMedia('(prefers-color-scheme: dark)').matches)

    try {
      // For Chrome / FireFox
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', onDarkModeChange)
    } catch (e) {
      // For Safari
      window.matchMedia('(prefers-color-scheme: dark)').addListener(onDarkModeChange)
    }

    return () => {
      try {
        // For Chrome / FireFox
        window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', onDarkModeChange)
      } catch (e) {
        // For Safari
        window.matchMedia('(prefers-color-scheme: dark)').removeListener(onDarkModeChange)
      }
    }
  }, [])

  return isDark
}

export default useDarkMode