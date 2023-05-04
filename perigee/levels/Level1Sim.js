import { Simulation } from '../utils/sim-utils.js'

class Level1Sim extends Simulation {
  constructor() {
    super()
    this._simPointer = null
    // this._vectorPointer = null
    // this._quaternionPointer = null
    this._isometryPointer = null
  }

  async loadWasm(wasmPath) {
    const wasmFunctionImports = {
      level_event_hook: (ptr, len) => {
        this.events.emit(this.getString(ptr, len), [])
      },
      ...this.nowHandlers(),
      ...this.audioHandlers(),
      ...this.animationHandlers(),
      ...this.assistiveDeviceHandlers(),
      ...this.logHandlers()
    }

    await this.instantiateModule(wasmPath, {
      env: wasmFunctionImports,
      js: {
        mem: new WebAssembly.Memory({
          initial: 1,
          maximum: 2 ** 16
        })
      }
    })

    // const vecPtr = wasmExports.allocate_vector3f32_space()
    // const quatPtr = wasmExports.allocate_unitquaternionf32_space()
    this._isometryPointer = this._wasmExports.allocate_isometry3_f32__space()
    this._simPointer = this._wasmExports.create_sim()
  }

  initialize() {
    this._wasmExports.initialize_sim(this._simPointer)
  }

  desiredFps() {
    return this._wasmExports.desired_fps()
  }

  reset() {
    this._wasmExports.destroy_sim(this._simPointer)
    this._simPointer = this._wasmExports.create_sim()
    this.initialize()
  }

  getSceneGltfBytes() {
    const ptrToGltf = this._wasmExports.scene_gltf_bytes_ptr(this._simPointer)
    const gltfLen = this._wasmExports.scene_gltf_bytes_len(this._simPointer)
    return this._wasmMemory.buffer.slice(ptrToGltf, ptrToGltf + gltfLen)
  }

  getPlayerGltfBytes() {
    const ptrToGltf = this._wasmExports.player_gltf_bytes_ptr(this._simPointer)
    const gltfLen = this._wasmExports.player_gltf_bytes_len(this._simPointer)
    return this._wasmMemory.buffer.slice(ptrToGltf, ptrToGltf + gltfLen)
  }

  inputSetMoveForward(newMagnitude) {
    this._wasmExports.input_set_move_forward(this._simPointer, newMagnitude)
  }

  inputSetMoveRight(newMagnitude) {
    this._wasmExports.input_set_move_right(this._simPointer, newMagnitude)
  }

  inputSetRotateUp(newMagnitude) {
    this._wasmExports.input_set_rotate_up(this._simPointer, newMagnitude)
  }

  inputSetRotateRight(newMagnitude) {
    this._wasmExports.input_set_rotate_right(this._simPointer, newMagnitude)
  }

  inputSetJump(jumpVal) {
    this._wasmExports.input_set_jump(this._simPointer, jumpVal ? 1 : 0)
  }

  inputSetAim(aimVal) {
    this._wasmExports.input_set_aim(this._simPointer, aimVal ? 1 : 0)
  }

  step(deltaSeconds) {
    this._wasmExports.step(this._simPointer, deltaSeconds)
  }

  leftRightLookSensitivity() {
    return this._wasmExports.settings_left_right_look_sensitivity(
      this._simPointer
    )
  }

  upDownLookSensitivity() {
    return this._wasmExports.settings_up_down_look_sensitivity(this._simPointer)
  }

  setLeftRightLookSensitivity(newSensitivity) {
    this._wasmExports.settings_set_left_right_look_sensitivity(
      this._simPointer,
      newSensitivity
    )
  }

  setUpDownLookSensitivity(newSensitivity) {
    this._wasmExports.settings_set_up_down_look_sensitivity(
      this._simPointer,
      newSensitivity
    )
  }

  propIsometry(name) {
    this._wasmExports.prop_isometry(
      this._simPointer,
      this.ptrToString(name, this._wasmExports.alloc_string),
      this._isometryPointer
    )
    return this.getIsometryF32(this._isometryPointer)
  }

  getPoiIsometry(name) {
    this._wasmExports.poi(
      this._simPointer,
      this.ptrToString(name, this._wasmExports.alloc_string),
      this._isometryPointer
    )
    return this.getIsometryF32(this._isometryPointer)
  }

  playerBodyIsometry() {
    this._wasmExports.player_body_isometry(
      this._simPointer,
      this._isometryPointer
    )
    return this.getIsometryF32(this._isometryPointer)
  }

  cameraGlobalIsometry() {
    this._wasmExports.camera_global_isometry(
      this._simPointer,
      this._isometryPointer
    )
    return this.getIsometryF32(this._isometryPointer)
  }
}

export { Level1Sim }
