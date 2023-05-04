import GameEvents from './events.js'

// Provide utility functions as a super class
// to make it easier to "import" them.
//
// Having a simulation extend this class instead of
// importing each function individually takes less mind share imo.
class Simulation {
  constructor() {
    this.events = new GameEvents()
    this._wasmExports = null
    this._wasmMemory = null
    this._textDecoder = new TextDecoder('utf-8')
    this._textEncoder = new TextEncoder()
    // Maintain a map between strings and their pointers in WASM memory
    // so that we're not creating the same string multiple times, saving
    // a few bytes of WASM memory here and there.
    this._stringMap = Object.create(null)
  }

  nowHandlers() {
    return {
      now: () => performance.now()
    }
  }

  audioHandlers() {
    return {
      play_audio_hook: (
        sceneObjPtr,
        sceneObjLen,
        audioNamePtr,
        audioNameLen,
        playbackRate,
        volume
      ) => {
        const sceneObj = this.getString(sceneObjPtr, sceneObjLen)
        const audioName = this.getString(audioNamePtr, audioNameLen)
        this.events.emit('PLAY_AUDIO', [
          sceneObj,
          audioName,
          playbackRate,
          volume
        ])
      },
      stop_audio_hook: (
        sceneObjPtr,
        sceneObjLen,
        audioNamePtr,
        audioNameLen
      ) => {
        const sceneObj = this.getString(sceneObjPtr, sceneObjLen)
        const audioName = this.getString(audioNamePtr, audioNameLen)
        this.events.emit('STOP_AUDIO', [sceneObj, audioName])
      },
      loop_audio_hook: (
        sceneObjPtr,
        sceneObjLen,
        audioNamePtr,
        audioNameLen,
        playbackRate,
        volume
      ) => {
        const sceneObj = this.getString(sceneObjPtr, sceneObjLen)
        const audioName = this.getString(audioNamePtr, audioNameLen)
        this.events.emit('LOOP_AUDIO', [
          sceneObj,
          audioName,
          playbackRate,
          volume
        ])
      }
    }
  }

  animationHandlers() {
    return {
      loop_animation_hook: (
        sceneObjNamePtr,
        sceneObjNameLen,
        animNamePtr,
        animNameLen,
        timeScale
      ) => {
        const sceneObjName = this.getString(sceneObjNamePtr, sceneObjNameLen)
        const animName = this.getString(animNamePtr, animNameLen)
        this.events.emit('LOOP_ANIMATION', [sceneObjName, animName, timeScale])
      },
      stop_animation_hook: (
        sceneObjNamePtr,
        sceneObjNameLen,
        animNamePtr,
        animNameLen
      ) => {
        const sceneObjName = this.getString(sceneObjNamePtr, sceneObjNameLen)
        const animName = this.getString(animNamePtr, animNameLen)
        this.events.emit('STOP_ANIMATION', [sceneObjName, animName])
      }
    }
  }

  assistiveDeviceHandlers() {
    return {
      assistive_device_announce_hook: (
        announcementMsgPtr,
        announcementMsgLen
      ) => {
        const announcementMsg = this.getString(
          announcementMsgPtr,
          announcementMsgLen
        )
        this.events.emit('AD_ANNOUNCEMENT', [announcementMsg])
      }
    }
  }

  // This is static because it's used in the WASM imports
  // which are created before a Level1Sim is constructed
  getCString(memoryTypedArray, memoryAddress) {
    const view = new Uint8Array(memoryTypedArray.buffer)

    let terminalByteAddress = memoryAddress
    while (view[terminalByteAddress]) {
      terminalByteAddress++
    }

    const strBytes = new Uint8Array(
      view.subarray(memoryAddress, terminalByteAddress)
    )
    return this._textDecoder.decode(strBytes)
  }

  getString(memoryAddress, strLen) {
    const view = new Uint8Array(this._wasmMemory.buffer)
    const strBytes = new Uint8Array(
      view.subarray(memoryAddress, memoryAddress + strLen)
    )
    return this._textDecoder.decode(strBytes)
  }

  logHandlers() {
    return {
      on_error: (stringPtr, strLen) => {
        console.error(this.getString(stringPtr, strLen))
      },
      on_warn: (stringPtr, strLen) => {
        console.warn(this.getString(stringPtr, strLen))
      },
      on_debug: (stringPtr, strLen) => {
        console.log('[DEBUG]', this.getString(stringPtr, strLen))
      },
      on_info: (stringPtr, strLen) => {
        console.log('[INFO]', this.getString(stringPtr, strLen))
      },
      on_trace: (stringPtr, strLen) => {
        console.log('[TRACE]', this.getString(stringPtr, strLen))
      }
    }
  }

  async instantiateModule(wasmPath, wasmImports) {
    let wasmModule = null
    if (typeof Deno !== 'undefined') {
      const wasmBuffer = Deno.readFileSync(wasmPath)
      wasmModule = await WebAssembly.instantiate(wasmBuffer, wasmImports)
    } else {
      wasmModule = await WebAssembly.instantiateStreaming(
        fetch(wasmPath),
        wasmImports
      )
    }
    this._wasmExports = wasmModule.instance.exports
    this._wasmMemory = wasmModule.instance.exports.memory
  }

  ptrToString(str, allocFn) {
    const strPtr = this._stringMap[str]
    if (strPtr !== undefined) {
      return strPtr
    } else {
      const strBytes = this._textEncoder.encode(str)
      // Copy the string into memory allocated in the WebAssembly
      const newStrPtr = allocFn(strBytes.byteLength)
      const byteBuffer = new Uint8Array(
        this._wasmMemory.buffer,
        newStrPtr,
        strBytes.byteLength
      )
      // Write the string into newly allocated space
      byteBuffer.set(strBytes)
      // Cache the string's pointer in JS memory
      this._stringMap[str] = newStrPtr
      return newStrPtr
    }
  }

  _getUint8LE(memoryAddress, startIndex) {
    if (this._wasmMemory.buffer.length - startIndex < 1) {
      throw new Error(
        `Cannot get Uint8LE: index ${startIndex} is out of bounds`
      )
    }
    const dataView = new DataView(this._wasmMemory.buffer, memoryAddress)
    return dataView.getUint8(startIndex)
  }

  _getUint32LE(memoryAddress, startIndex) {
    if (this._wasmMemory.buffer.length - startIndex < 4) {
      throw new Error(
        `Cannot get Uint32LE: index ${startIndex} is out of bounds`
      )
    }
    const dataView = new DataView(this._wasmMemory.buffer, memoryAddress)
    return dataView.getUint32(startIndex, true)
  }

  getFloat32LE(memoryAddress, startIndex) {
    if (this._wasmMemory.buffer.length - startIndex < 4) {
      throw new Error(
        `Cannot get Float32LE: index ${startIndex} is out of bounds`
      )
    }
    const dataView = new DataView(this._wasmMemory.buffer, memoryAddress)
    return dataView.getFloat32(startIndex, true)
  }

  getVector3F32(vectorPtr) {
    return [
      this.getFloat32LE(vectorPtr, 0),
      this.getFloat32LE(vectorPtr, 4),
      this.getFloat32LE(vectorPtr, 8)
    ]
  }

  getQuaternionF32(quatPtr) {
    return [
      this.getFloat32LE(quatPtr, 0),
      this.getFloat32LE(quatPtr, 4),
      this.getFloat32LE(quatPtr, 8),
      this.getFloat32LE(quatPtr, 12)
    ]
  }

  getIsometryF32(isoPtr) {
    return [this.getQuaternionF32(isoPtr), this.getVector3F32(isoPtr + 16)]
  }

  getTransformF32(transPtr) {
    const isometry = this.getIsometryF32(transPtr)
    return [isometry[0], isometry[1], this.getVector3F32(transPtr + 28)]
  }
}

export { Simulation }
