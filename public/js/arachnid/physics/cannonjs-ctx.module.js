import PhysicsContext from './physics-ctx.module.js'
import {
  World
} from './cannon.module.js'

class CannonJSContext extends PhysicsContext {
  constructor() {
    super()
    this._world = new World()
  }

  getWorld() {
    return this._world
  }

  step(dt) {
    this._world.step(1 / 60, dt, 10)
  }
}

export default CannonJSContext