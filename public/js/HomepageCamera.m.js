import Entity from './arachnid/entity.module.js'
import {
  Group,
  Tween,
  Easing
} from './arachnid/utils/tween.module.js'

function getDeviceSizeFromWidth(width) {
  if (width <= 320) {
    return 'xs'
  } else if (width < 415) {
    return 'sm'
  } else if (width < 1025) {
    return 'md'
  } else if (width >= 1026) {
    return 'lg'
  } else {
    throw new Error('Unexpected device size detected')
  }
}

class HomepageCamera extends Entity {
  constructor(id, gameContext) {
    super(id, gameContext)
    this._camera = null
    this._shouldLookAtObject = false
    this._lookTargetObject = null

    this._positionTween = null
    this._xRotationTween = null
    this._yRotationTween = null
    this._zRotationTween = null
    this._tweenGroup = new Group()

    this.setupGraphics()
  }

  setupGraphics() {
    const graphicsCtx = this._gameContext.getGraphicsCtx()
    const camera = graphicsCtx.getCamera()
    this._camera = camera

    this.setCameraBasedOnDeviceSize()
    window.addEventListener('resize', () => {
      this.setCameraBasedOnDeviceSize()
    })
  }

  setCameraBasedOnDeviceSize() {
    const deviceSize = getDeviceSizeFromWidth(window.innerWidth)
    switch (deviceSize) {
      case 'xs':
        this._camera.position.set(0, -1, 8)
        break
      case 'sm':
        this._camera.position.set(0, -0.65, 7)
        break
      case 'md':
        this._camera.position.set(0, -0.5, 6)
        break
      case 'lg':
        this._camera.position.set(-1.75, 0, 4)
        break
      default:
        throw new Error('Unknown device size detected')
    }
  }

  update(dt) {
    this._tweenGroup.update()
    if (this._shouldLookAtObject) {
      this._camera.lookAt(this._lookTargetObject.position)
    }
  }

  // Just needs to have a position property
  // that's a Vector3
  lookAtObject(object) {
    this._shouldLookAtObject = true
    this._lookTargetObject = object
  }

  stopLookingAtObject() {
    this._shouldLookAtObject = false
  }

  setTargetPosition(targetPosition, durationInMs) {
    this._positionTween = new Tween({
      x: this._camera.position.x,
      y: this._camera.position.y,
      z: this._camera.position.z,
    }, this._tweenGroup)
      .to({
        x: targetPosition.x,
        y: targetPosition.y,
        z: targetPosition.z
      }, durationInMs)
      .onUpdate(newPosition => {
        this._camera.position.x = newPosition.x
        this._camera.position.y = newPosition.y
        this._camera.position.z = newPosition.z
      })
      .onComplete(() => {
        this._tweenGroup.remove(this._positionTween)
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
          x: this._camera.rotation.x
        }, this._tweenGroup)
          .to({ x: radians }, durationInMs)
          .delay(delay || 0)
          .easing(easingFunction)
          .onUpdate(newAngle => {
            this._camera.rotation.x = newAngle.x
          })
          .onComplete(() => {
            this._tweenGroup.remove(this._xRotationTween)
            this._xRotationTween = null
          })
          .start()
        break
      case 'Y':
        this._yRotationTween = new Tween({
          y: this._camera.rotation.y
        }, this._tweenGroup)
          .to({ y: radians }, durationInMs)
          .delay(delay || 0)
          .easing(easingFunction)
          .onUpdate(newAngle => {
            this._camera.rotation.y = newAngle.y
          })
          .onComplete(() => {
            this._tweenGroup.remove(this._yRotationTween)
            this._yRotationTween = null
          })
          .start()
        break
      case 'Z':
        this._zRotationTween = new Tween({
          z: this._camera.rotation.z
        }, this._tweenGroup)
          .to({ z: radians }, durationInMs)
          .delay(delay || 0)
          .easing(easingFunction)
          .onUpdate(newAngle => {
            this._camera.rotation.z = newAngle.z
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

export default HomepageCamera