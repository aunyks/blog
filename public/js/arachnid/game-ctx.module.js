

class GameContext {
  constructor() {
    this._ready = false
    this._hasStarted = false
  }

  async load() {

  }

  ready() {
    return this._ready
  }

  start() {
    this._hasStarted = false
  }

  hasStarted() {
    return this._hasStarted
  }

  step(dt) {

  }
}

export default GameContext