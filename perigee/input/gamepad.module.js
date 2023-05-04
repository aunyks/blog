import Controller from './controller.module.js'
const noop = () => {}

class GamepadInput extends Controller {
  constructor(index) {
    super()
    this._ready = false
    this._onConnect = noop
    this._onDisconnect = noop

    window.addEventListener('gamepadconnected', (e) => {
      if (e.gamepad.index === this.gamepadIndex) {
        this._ready = true
        this._onConnect(e)
      }
    })
    window.addEventListener('gamepaddisconnected', (e) => {
      if (e.gamepad.index === this.gamepadIndex) {
        this._ready = true
        this._onDisconnect(e)
      }
    })

    // Assume the index to be the first unless
    // specified otherwise
    if (index !== null && index !== undefined) {
      this.gamepadIndex = index
    } else {
      this.gamepadIndex = 0
    }
  }

  ready() {
    return this._ready
  }

  onConnect(callback) {
    this._onConnect = callback
  }

  onDisconnect(callback) {
    this._onDisconnect = callback
  }

  // [WARNING]
  // All of the following functions could throw if
  // the controller is disconnected after checking
  // its readiness. Check for readiness here and throw
  // an error to prevent that

  getPad() {
    return navigator.getGamepads()[this.gamepadIndex]
  }

  canRumble() {
    return 'vibrationActuator' in this.getPad()
  }

  // delay and duration in ms
  // strong, weak magnitude between 0 and 1
  rumble(delay = 0, duration = 500, weakMag = 1, strongMag = 1) {
    this.getPad().vibrationActuator.playEffect('dual-rumble', {
      startDelay: delay,
      duration: duration,
      weakMagnitude: weakMag,
      strongMagnitude: strongMag
    })
  }

  getLeftStickPos() {
    // x and y are both in the range [-1, 1]
    // x: negative is left. y: negative is up
    return {
      x: this.getPad().axes[0],
      y: this.getPad().axes[1]
    }
  }

  getRightStickPos() {
    // x and y are both in the range [-1, 1]
    // x: negative is left. y: negative is up
    return {
      x: this.getPad().axes[2],
      y: this.getPad().axes[3]
    }
  }

  buttonPressed(buttonIndex) {
    return this.getPad().buttons[buttonIndex].pressed
  }

  // The right button pad on PS and XBox controllers
  bPadSouthPressed() {
    return this.buttonPressed(0)
  }

  bPadEastPressed() {
    return this.buttonPressed(1)
  }

  bPadWestPressed() {
    return this.buttonPressed(2)
  }

  bPadNorthPressed() {
    return this.buttonPressed(3)
  }

  // Bumpers
  leftBumperPressed() {
    return this.buttonPressed(4)
  }

  rightBumperPressed() {
    return this.buttonPressed(5)
  }

  // Triggers
  leftTriggerPressed() {
    return !!this.buttonPressed(6)
  }

  rightTriggerPressed() {
    return !!this.buttonPressed(7)
  }

  // Select and start buttons
  selectBtnPressed() {
    return this.buttonPressed(8)
  }

  startBtnPressed() {
    return this.buttonPressed(9)
  }

  leftStickPressed() {
    return this.buttonPressed(10)
  }

  rightStickPressed() {
    return this.buttonPressed(11)
  }

  // The d-pad (left button pad) on PS and XBox controllers
  dPadNorthPressed() {
    return this.buttonPressed(12)
  }

  dPadSouthPressed() {
    return this.buttonPressed(13)
  }

  dPadWestPressed() {
    return this.buttonPressed(14)
  }

  dPadEastPressed() {
    return this.buttonPressed(15)
  }
}

export default GamepadInput
