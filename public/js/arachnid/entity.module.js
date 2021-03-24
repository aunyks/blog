

class Entity {
  constructor(id, gameContext) {
    this._id = id || this._generateId()
    this._gameContext = gameContext
  }

  async load() {

  }

  _generateId() {

  }

  getId() {
    return this._id
  }

  destroy() {

  }

  physicsUpdate(dt) {

  }

  update(dt) {

  }
}

export default Entity