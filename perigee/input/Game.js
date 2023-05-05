import GamepadInput from './Gamepad.js'
import KeyboardInput from './Keyboard.js'
import PointerLockInput from './PointerLock.js'
import TouchInput from './Touch.js'
import VirtualJoystickInput from './VirtualJoystick.js'
import VirtualJumpBtnInput from './VirtualJumpButton.js'
import VirtualCrouchBtnInput from './VirtualCrouchButton.js'

class GameInput {
  constructor({
    pointerLockTarget = null,
    touchTarget = null,
    keyboardTarget = null,
    gamepads = []
  }) {
    this._moveForward = 0
    this._moveRight = 0
    this._rotateUp = 0
    this._rotateRight = 0
    this._jump = false
    this._crouch = false
    this._aim = false
    this._pause = false

    // Higher importance inputs should be later in the list
    this._inputs = [
      new PointerLockInput(pointerLockTarget),
      new KeyboardInput(keyboardTarget),
      new TouchInput(touchTarget)
      // new VirtualJoystickInput(document.getElementById('virtual-joystick')),
      // new VirtualJumpBtnInput(
      //   document.getElementById('virtual-jump-button-container')
      // )
      // new VirtualCrouchBtnInput(document.getElementById('virtual-crouch-button-container')),
    ]

    for (const gamepad of gamepads) {
      const pad = new GamepadInput(gamepad.index)
      pad.onConnect(gamepad.onConnect)
      pad.onDisconnect(gamepad.onDisconnect)
      this._inputs.push(pad)
    }
  }

  pause() {
    return this._pause
  }

  moveForward() {
    return this._moveForward
  }

  moveRight() {
    return this._moveRight
  }

  rotateUp() {
    return this._rotateUp
  }

  rotateRight() {
    return this._rotateRight
  }

  jump() {
    return this._jump
  }

  crouch() {
    return this._crouch
  }

  aim() {
    return this._aim
  }

  update() {
    for (const input of this._inputs) {
      if (input.ready()) {
        if (input instanceof KeyboardInput) {
          if (input.wPressed() || input.upPressed()) {
            this._moveForward = -1
          } else if (input.sPressed() || input.downPressed()) {
            this._moveForward = 1
          } else {
            this._moveForward = 0
          }
          if (input.aPressed() || input.leftPressed()) {
            this._moveRight = -1
          } else if (input.dPressed() || input.rightPressed()) {
            this._moveRight = 1
          } else {
            this._moveRight = 0
          }
          this._jump = input.spacebarPressed()
          this._crouch = input.cPressed()
          this._pause = input.escapePressed()
        } else if (input instanceof PointerLockInput) {
          if (input.isLocked()) {
            this._rotateRight = input.getDx() * 0.25
            this._rotateUp = -input.getDy() * 0.25
            this._aim = input.rightDown()
          }
        } else if (input instanceof VirtualJoystickInput) {
          const stickPos = input.getStickPos()
          this._moveRight = stickPos.x
          this._moveForward = stickPos.y
        } else if (input instanceof TouchInput) {
          this._rotateRight = input.getDx() * 0.3
          this._rotateUp = -input.getDy() * 0.3
        } else if (input instanceof VirtualJumpBtnInput) {
          this._jump = input.btnPressed()
        } else if (input instanceof VirtualCrouchBtnInput) {
          this._crouch = input.btnPressed()
        } else if (input instanceof GamepadInput) {
          const leftStickPos = input.getLeftStickPos()
          const rightStickPos = input.getRightStickPos()

          this._jump = input.bPadSouthPressed()
          this._crouch = input.bPadEastPressed()
          this._aim = input.leftTriggerPressed()
          this._pause = input.startBtnPressed()

          this._moveRight = leftStickPos.x
          this._moveForward = leftStickPos.y

          this._rotateRight = rightStickPos.x * 0.5
          this._rotateUp = -rightStickPos.y * 0.3
        } else {
          console.warn(`Unrecognized input ${input} provided for processing`)
        }
      }
    }
  }

  copyToSim(sim) {
    sim.inputSetRotateUp(this.rotateUp())
    sim.inputSetRotateRight(this.rotateRight())
    sim.inputSetMoveForward(this.moveForward())
    sim.inputSetMoveRight(this.moveRight())
    sim.inputSetJump(this.jump())
    // sim.inputSetCrouch(this.crouch())
    sim.inputSetAim(this.aim())
  }
}

export default GameInput
