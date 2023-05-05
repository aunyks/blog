import THREE from 'three'

class Mesh extends THREE.Mesh {
  constructor(geometry, material) {
    super(geometry, material)
    this.castShadow = true
    this.receiveShadow = true
  }
}

export default Mesh
