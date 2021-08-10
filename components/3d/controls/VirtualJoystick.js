import {
  useEffect,
  useRef,
  forwardRef
} from 'react'
import Html from 'components/3d/3d-html'
import useInnerWidth from 'hooks/use-inner-width'

const JOYSTICK_CENTER_X = 184
const JOYSTICK_CENTER_Y = 184
const MAX_OFFSET_RADIUS = 80
const SVG_VIEWBOX_SIZE = 384
const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

const VirtualJoystick = forwardRef(({
  ...props
}, ref) => {
  const innerWidth = useInnerWidth()
  let position = null
  if (innerWidth > 1024) {
    position = [-0.9, -0.4, -1]
  } else if (innerWidth <= 1024 && innerWidth > 900) {
    position = [-0.65, -0.75, -1]
  } else if (innerWidth <= 900 && innerWidth > 770) {
    position = [-1, -0.1, -1]
  } else if (innerWidth <= 770 && innerWidth > 420) {
    position = [-0.8, -0.1, -1]
  } else if (innerWidth <= 420 && innerWidth > 375) {
    position = [-0.425, -0.85, -1]
  } else {
    position = [-0.3, -0.8, -1]
  }

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
      position={position}
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
      <svg width="160" viewBox="0 0 368 368" xmlns="http://www.w3.org/2000/svg">
        {/* Background Circle */}
        <circle cx="184" cy="184" r="110" />
        {/* The actual stick */}
        <circle id="virtual-joystick" cx="184" cy="184" r="100" />
      </svg>
    </Html>
  )
})

export default VirtualJoystick