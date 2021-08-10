import {
  useEffect,
  useRef,
  forwardRef
} from 'react'
import Html from 'components/3d/3d-html'
import useLandscape from 'hooks/use-landscape'

const JOYSTICK_CENTER_X = 184
const JOYSTICK_CENTER_Y = 184
const MAX_OFFSET_RADIUS = 80
const SVG_VIEWBOX_SIZE = 384
const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

const VirtualJoystick = forwardRef(({
  position = [-0.5, -1.3, -1],
  ...props
}, ref) => {
  const isLandscape = useLandscape()
  const calculatedPosition = isLandscape ? [position[0] - 1.2, position[1] + 0.75, position[2]] : position

  const virtualJoystick = useRef(null)
  useEffect(() => {
    virtualJoystick.current = window.document.getElementById('virtual-joystick')
    virtualJoystick.current.setAttribute('cx', '184')
    virtualJoystick.current.setAttribute('cy', '184')
    ref.current = {
      x: 0,
      y: 0
    }

    const onTouchStart = event => {
      virtualJoystick.current.classList.add('active')
    }
    const onTouchMove = event => {
      virtualJoystick.current.classList.remove('active')
      const transformMatrix = virtualJoystick.current.getScreenCTM()
      const newX = (event.touches[0].clientX - transformMatrix.e) / transformMatrix.a
      const newY = (event.touches[0].clientY - transformMatrix.f) / transformMatrix.d
      const centeredX = clamp((newX - JOYSTICK_CENTER_X) / MAX_OFFSET_RADIUS, -1, 1)
      const centeredY = clamp((newY - JOYSTICK_CENTER_Y) / MAX_OFFSET_RADIUS, -1, 1)
      virtualJoystick.current.setAttribute('cx', `${clamp(newX, JOYSTICK_CENTER_X - MAX_OFFSET_RADIUS, JOYSTICK_CENTER_X + MAX_OFFSET_RADIUS)}`)
      virtualJoystick.current.setAttribute('cy', `${clamp(newY, JOYSTICK_CENTER_Y - MAX_OFFSET_RADIUS, JOYSTICK_CENTER_Y + MAX_OFFSET_RADIUS)}`)
      ref.current.x = centeredX
      ref.current.y = centeredY
    }
    const onTouchEnd = () => {
      virtualJoystick.current.classList.remove('active')
      virtualJoystick.current.setAttribute('cx', '184')
      virtualJoystick.current.setAttribute('cy', '184')
      ref.current.x = 0
      ref.current.y = 0
    }

    virtualJoystick.current.addEventListener('touchstart', onTouchStart)
    virtualJoystick.current.addEventListener('touchmove', onTouchMove)
    virtualJoystick.current.addEventListener('touchend', onTouchEnd)

    return () => {
      // window.document because I'm not sure if the ref is defined on unmount
      window.document.getElementById('virtual-joystick').removeEventListener('touchstart', onTouchStart)
      window.document.getElementById('virtual-joystick').removeEventListener('touchmove', onTouchMove)
      window.document.getElementById('virtual-joystick').removeEventListener('touchend', onTouchEnd)
      ref.current = null
    }
  }, [])

  return (
    <Html
      center
      position={calculatedPosition}
      {...props}>
      <style jsx>{`
          svg {
            user-select: none;
            position: relative;
          }

          #virtual-joystick {
            fill: rgba(48, 48, 48, 0.8);
            stroke: white;
            stroke-width: 5px;
            user-select: none;
            position: absolute;
          }

          #virtual-joystick.active {
            fill: rgba(48, 48, 48, 0.4);
          }
        `}</style>
      <svg width={isLandscape ? 160 : 180} viewBox="0 0 368 368" xmlns="http://www.w3.org/2000/svg">
        {/* Background Circle */}
        <circle cx="184" cy="184" r="110" />
        {/* The actual stick */}
        <circle id="virtual-joystick" cx="184" cy="184" r="100" />
      </svg>
    </Html>
  )
})

export default VirtualJoystick