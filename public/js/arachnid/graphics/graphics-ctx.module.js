

class GraphicsContext {
  constructor() {
    this._assets = {}
  }

  async loadAsset(name, url) {

  }

  getAsset(name) {
    return this._assets[name]
  }

  removeAsset(name) {
    delete this._assets
  }

  render() {

  }
}

export default GraphicsContext