

class EntityManager {
  constructor() {
    this._entityMap = {}
    this._entityList = []
  }

  getById(id) {
    return this._entityMap[id]
  }

  add(id, entity) {
    this._entityMap[id] = entity
    this._entityList.push(entity)
  }

  remove(id) {
    this._entityList.filter(entity => entity.getId() !== id)
    delete this._entityMap[id]
  }

  async load() {
    for (let i = 0; i < this._entityList.length; i++) {
      await this._entityList[i].load()
    }
  }

  physicsUpdate(dt) {
    for (let i = 0; i < this._entityList.length; i++) {
      this._entityList[i].physicsUpdate(dt)
    }
  }

  update(dt) {
    for (let i = 0; i < this._entityList.length; i++) {
      this._entityList[i].update(dt)
    }
  }
}

export default EntityManager