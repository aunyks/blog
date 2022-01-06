const { useEffect, forwardRef } = require('react')

// An enum letting us reference each button
// by name which maps to its index via the Gamepad API
const Buttons = Object.freeze({
  // Button pad
  BPAD_SOUTH: 0,
  BPAD_EAST: 1,
  BPAD_WEST: 2,
  BPAD_NORTH: 3,
  // Bumpers
  LEFT_BUMPER: 4,
  RIGHT_BUMPER: 5,
  // Triggers
  LEFT_TRIGGER: 6,
  RIGHT_TRIGGER: 7,
  // Meta buttons
  SELECT: 8,
  START: 9,
  // Stick press (ie L3 & R3 on PlayStation)
  LEFT_STICK: 10,
  RIGHT_STICK: 11,
  // Directional pad
  DPAD_NORTH: 12,
  DPAD_SOUTH: 13,
  DPAD_WEST: 14,
  DPAD_EAST: 15
})

const Gamepad = forwardRef(({ padIndex, onConnectionChange }, ref) => {
  useEffect(() => {
    const onConnect = (connectEvent) => {
      // console.log(`gamepad ${connectEvent.gamepad.index} connected`)
      if (connectEvent.gamepad.index === padIndex) {
        ref.current = new Proxy(connectEvent.gamepad, {
          get: (target, prop, receiver) => {
            return navigator.getGamepads()[padIndex][prop]
          }
        })
        onConnectionChange(true)
      }
    }
    const onDisconnect = (disconnectEvent) => {
      // console.log(`gamepad ${disconnectEvent.gamepad.index} disconnected`)
      if (disconnectEvent.gamepad.index === padIndex) {
        ref.current = null
        onConnectionChange(false)
      }
    }

    window.addEventListener('gamepadconnected', onConnect)
    window.addEventListener('gamepaddisconnected', onDisconnect)

    return () => {
      window.removeEventListener('gamepadconnected', onConnect)
      window.removeEventListener('gamepaddisconnected', onDisconnect)
    }
  }, [])

  return null
})

export { Buttons, Gamepad }
