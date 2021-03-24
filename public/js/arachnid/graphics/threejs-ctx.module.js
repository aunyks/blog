import GraphicsContext from './graphics-ctx.module.js'
import GLTFLoader from './loaders/gltf-loader.module.js'
import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera
} from './three.module.js'

class ThreeJSContext extends GraphicsContext {
  constructor(canvasDomElement) {
    super()

    this._scene = new Scene()
    this._camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 30)
    this._camera.name = 'default-camera'

    if (canvasDomElement) {
      this._renderer = new WebGLRenderer({
        canvas: canvasDomElement,
        antialias: window.devicePixelRatio > 1 ? false : true
      })
    } else {
      this._renderer = new WebGLRenderer({
        antialias: true
      })
      document.body.appendChild(this._renderer.domElement)
    }

    this._renderer.setPixelRatio(window.devicePixelRatio)
    this._renderer.setSize(window.innerWidth, window.innerHeight)
    window.addEventListener('resize', () => {
      this._camera.aspect = window.innerWidth / window.innerHeight
      this._camera.updateProjectionMatrix()
      this._renderer.setSize(window.innerWidth, window.innerHeight)
    }, false)
  }

  async loadAsset(name, url) {
    if (!name) {
      throw new Error('name was not provided to ThreeJSContext loadAsset()')
    }
    const urlSplitByDot = url.split('.')
    const extension = urlSplitByDot[urlSplitByDot.length - 1]
    // If the last token after the dot has some slashes,
    // it's probably not a valid asset
    if (/\/|\\/.test(extension)) {
      throw new Error(`Asset url must have file extension in ThreeJSContext loadAsset(). Computed ${extension} as the extension`)
    }

    switch (extension) {
      case 'glb':
      case 'gltf':
        const loadedGltf = await this._loadGltf(url)
        this._assets[name] = loadedGltf
        return loadedGltf
      case 'cube':
        const loadedLutCube = await this._loadLutCube(url)
        this._assets[name] = loadedLutCube
        return loadedLutCube
      default:
        throw new Error(`Unrecognized file extension ${extension} given to ThreeJSContext loadAsset()`)
    }
  }

  render() {
    this._renderer.render(this._scene, this._camera)
  }

  setCamera(camera) {
    this._camera = camera
  }

  getCamera() {
    return this._camera
  }

  getRenderer() {
    return this._renderer
  }

  getScene() {
    return this._scene
  }

  _loadGltf(url) {
    return new Promise((resolve, reject) => {
      const gltfLoaderInstance = new GLTFLoader()
      try {
        gltfLoaderInstance.load(url, (gltf) => {
          resolve(gltf)
        })
      } catch (e) {
        reject(e)
      }
    })
  }

  async _loadLutCube(url) {
    console.warn('ThreeJSContext _loadLutCube has not been implemented')
  }
}

export default ThreeJSContext