import Controller from './controller.js'

class VirtualDPadInput extends Controller {
  constructor() {
    super()
    this.pressedButtonsList = []
    this._ready = window.matchMedia('(max-width: 1024px)').matches//(('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0))
    const dpadOverlay = document.getElementById('dpad-hud')
    if (this._ready) {
      if (dpadOverlay.classList.contains('invisible')) {
        dpadOverlay.classList.remove('invisible')
      }
      document.getElementById('dpad-up').addEventListener('touchstart', () => {
        this.pressedButtonsList.push('up')
      })
      document.getElementById('dpad-down').addEventListener('touchstart', () => {
        this.pressedButtonsList.push('down')
      })
      document.getElementById('dpad-right').addEventListener('touchstart', () => {
        this.pressedButtonsList.push('right')
      })
      document.getElementById('dpad-left').addEventListener('touchstart', () => {
        this.pressedButtonsList.push('left')
      })
      document.getElementById('dpad-up').addEventListener('touchend', () => {
        this.removeFromBtnsList('up')
      })
      document.getElementById('dpad-down').addEventListener('touchend', () => {
        this.removeFromBtnsList('down')
      })
      document.getElementById('dpad-right').addEventListener('touchend', () => {
        this.removeFromBtnsList('right')
      })
      document.getElementById('dpad-left').addEventListener('touchend', () => {
        this.removeFromBtnsList('left')
      })
    }
  }

  ready() {
    return this._ready
  }

  removeFromBtnsList(value) {
    if (this.pressedButtonsList.includes(value)) {
      for (let i = 0; i < this.pressedButtonsList.length; i++) {
        if (this.pressedButtonsList[i] === value) {
          this.pressedButtonsList.splice(i, 1)
        }
      }
    }
  }

  upPressed() {
    return this.pressedButtonsList.includes('up')
  }

  downPressed() {
    return this.pressedButtonsList.includes('down')
  }

  rightPressed() {
    return this.pressedButtonsList.includes('right')
  }

  leftPressed() {
    return this.pressedButtonsList.includes('left')
  }
}

export default VirtualDPadInput