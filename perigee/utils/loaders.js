import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { AudioLoader, TextureLoader } from 'three'

const gltfLoader = new GLTFLoader()
function loadGltf(path) {
  return new Promise((resolve, reject) => {
    gltfLoader.load(
      path,
      (gltf) => {
        resolve(gltf)
      },
      () => {},
      (error) => reject(error)
    )
  })
}

function parseGltf(arrayBuffer) {
  return new Promise((resolve, reject) => {
    gltfLoader.parse(
      arrayBuffer,
      '',
      (gltf) => {
        resolve(gltf)
      },
      (error) => reject(error)
    )
  })
}

const textureLoader = new TextureLoader()
function loadTexture(path) {
  return new Promise((resolve, reject) => {
    textureLoader.load(
      path,
      (texture) => {
        resolve(texture)
      },
      () => {},
      (error) => reject(error)
    )
  })
}

const audioLoader = new AudioLoader()
function loadAudioBuffer(path) {
  return new Promise((resolve, reject) => {
    audioLoader.load(
      path,
      (audioBuffer) => {
        resolve(audioBuffer)
      },
      () => {},
      (error) => reject(error)
    )
  })
}

export { loadAudioBuffer, loadTexture, loadGltf, parseGltf }
