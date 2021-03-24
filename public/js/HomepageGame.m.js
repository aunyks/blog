import GameContext from './arachnid/game-ctx.module.js'
import EntityManager from './arachnid/entity-manager.module.js'
import ThreeJSContext from './arachnid/graphics/threejs-ctx.module.js'
import {
  Color,
  AmbientLight,
  PointLight,
  DirectionalLight,
  Vector3
} from './arachnid/graphics/three.module.js'
import HomepageCamera from './HomepageCamera.m.js'
import LightningBolt from './LightningBolt.m.js'

class HomepageGame extends GameContext {
  constructor() {
    super()
    this._graphics = new ThreeJSContext(document.getElementById('game-canvas'))
    this._entities = new EntityManager()
  }

  getGraphicsCtx() {
    return this._graphics
  }

  async load() {
    await this.setupGraphics()

    this._entities.add('camera', new HomepageCamera('camera', this))
    this._entities.add('lightning-bolt', new LightningBolt('lightning-bolt', this))

    await this._entities.load()

    this._ready = true
  }

  start() {
    super.start()
  }

  step(dt) {
    this._entities.update(dt)
    this._graphics.render()
  }

  setSceneBgColor() {
    const graphicsScene = this._graphics.getScene()
    const deviceIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    graphicsScene.background = deviceIsDark ? new Color(0x222222) : new Color(0xffffff)
  }

  async setupGraphics() {
    const graphicsScene = this._graphics.getScene()
    /*
        const mainLight = new DirectionalLight(0xffffff, 1)
        mainLight.position.set(-2, 2, 2)
        graphicsScene.add(mainLight)
        mainLight.lookAt(new Vector3(0, 0, 0))
        */
    const complementLight = new AmbientLight(0xffffff, 1)
    graphicsScene.add(complementLight)

    this.setSceneBgColor()
    try {
      // For Chrome / FireFox
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => this.setSceneBgColor())
    } catch (e) {
      // For Safari
      window.matchMedia('(prefers-color-scheme: dark)').addListener(onDarkModeChange, () => this.setSceneBgColor())
    }
  }
}

export default HomepageGame