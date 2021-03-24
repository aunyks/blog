import Entity from './arachnid/entity.module.js'
import {
  Group,
  Tween,
  Easing
} from './arachnid/utils/tween.module.js'
import GLTFLoader from './arachnid/graphics/loaders/gltf-loader.module.js'

const loadGltf = async url => {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader()
    loader.load(
      url,
      gltf => resolve(gltf),
      () => { },
      error => reject(error)
    )
  })
}

class LightningBolt extends Entity {
  constructor(id, gameContext) {
    super(id, gameContext)
    this._object = null
    this._material = null

    this._positionTween = null
    this._xRotationTween = null
    this._yRotationTween = null
    this._zRotationTween = null
    this._tweenGroup = new Group()
  }

  async load() {
    const graphicsCtx = this._gameContext.getGraphicsCtx()
    const scene = graphicsCtx.getScene()

    const boltModel = await loadGltf('/models/aunyks-bolt.glb')
    this._object = boltModel.scene
    this._object.position.set(0, 0, 0)
    this._object.rotation.y = -Math.PI / 2

    scene.add(this._object)

    window.addEventListener('message', event => {
      if (event.origin !== window.location.origin) {
        return
      }
      // window.postMessage({ type: 'SPIN_BOLT'}, window.location.origin)
      if (event.data.type === 'SPIN_BOLT') {
        this.setTargetRotation('y', this._object.rotation.y + 2 * Math.PI, 1000, Easing.Quintic.InOut)
      }
    }, false)
  }

  update(dt) {
    this._object.position.y = 0.03 * Math.sin(window.performance.now() / 500)
    this._tweenGroup.update()
  }

  setTargetPosition(targetPosition, durationInMs) {
    this._positionTween = new Tween({
      x: this._object.position.x,
      y: this._object.position.y,
      z: this._object.position.z,
    }, this._tweenGroup)
      .to({
        x: targetPosition.x,
        y: targetPosition.y,
        z: targetPosition.z
      }, durationInMs)
      .onUpdate(newPosition => {
        this._object.position.x = newPosition.x
        this._object.position.y = newPosition.y
        this._object.position.z = newPosition.z
      })
      .onComplete(() => {
        try {
          this._tweenGroup.remove(this._positionTween)
        } catch (e) {
          console.log('Couldnt remove position tween')
        }
        this._positionTween = null
      })
      .start()
  }

  // Could run into some gimbal lock problems since 
  // these are euler angles but it's fine for now I guess
  setTargetRotation(axis, radians, durationInMs, opts = {}) {
    const delay = opts.delay || 0
    const easingFunction = opts.easingFunction || Easing.Linear.None
    switch (axis.toUpperCase()) {
      case 'X':
        this._xRotationTween = new Tween({
          x: this._object.rotation.x
        }, this._tweenGroup)
          .to({ x: radians }, durationInMs)
          .delay(delay || 0)
          .easing(easingFunction)
          .onUpdate(newAngle => {
            this._object.rotation.x = newAngle.x
          })
          .onComplete(() => {
            this._tweenGroup.remove(this._xRotationTween)
            this._xRotationTween = null
          })
          .start()
        break
      case 'Y':
        this._yRotationTween = new Tween({
          y: this._object.rotation.y
        }, this._tweenGroup)
          .to({ y: radians }, durationInMs)
          .delay(delay || 0)
          .easing(easingFunction)
          .onUpdate(newAngle => {
            this._object.rotation.y = newAngle.y
          })
          .onComplete(() => {
            this._tweenGroup.remove(this._yRotationTween)
            this._yRotationTween = null
          })
          .start()
        break
      case 'Z':
        this._zRotationTween = new Tween({
          z: this._object.rotation.z
        }, this._tweenGroup)
          .to({ z: radians }, durationInMs)
          .delay(delay || 0)
          .easing(easingFunction)
          .onUpdate(newAngle => {
            this._object.rotation.z = newAngle.z
          })
          .onComplete(() => {
            this._tweenGroup.remove(this._zRotationTween)
            this._zRotationTween = null
          })
          .start()
        break
      default:
        throw new Error('Unknown axis found in LightningBolt setTargetRotation()')
    }
  }
}

export default LightningBolt