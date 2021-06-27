import {
  useMemo
} from 'react'
import {
  useLoader
} from '@react-three/fiber'
import {
  TextureLoader
} from 'three'
import {
  useHeightfield
} from '@react-three/cannon'

// Returns matrix data to be passed to heightfield
function createHeightfieldMatrix(image, scale) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  if (context) {
    context.imageSmoothingEnabled = false
  } else {
    throw new Error('Heightfield could not be created')
  }
  const width = image.width
  const height = image.height
  const matrix = Array(width)
  const row = Array(height)
  let p = null

  canvas.width = width
  canvas.height = height
  context.drawImage(image, 0, 0, width, height)

  const { data } = context.getImageData(0, 0, width, height)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // pixel data is [r, g, b, alpha]
      // since image is in b/w -> any rgb val
      p = data[4 * (y * width + x)] / 255 * scale
      row[x] = p - scale / 2
    }
    matrix[y] = [...row]
  }
  context.clearRect(0, 0, width, height)
  return matrix
}

// Set elementSize as `size` / matrix[0].length (image width)
// and rotate heightfield to match (rotation.x = -Math.PI/2)
export function Heightmap({
  // Url must point to a square, black and white image
  heightMap,
  elementSize = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  maxHeight = 100,
  ...props
}) {
  const heightmap = useLoader(TextureLoader, heightMap)
  const heights = useMemo(() => {
    return createHeightfieldMatrix(heightmap.image, maxHeight)
  }, [heightmap])
  const [heightfieldRef] = useHeightfield(() => {
    const calculatedPosition = [
      // Width
      position[0] - heights[0].length * elementSize / 2,
      position[1],
      // Height
      position[2] + heights.length * elementSize / 2
    ]
    const calculatedRotation = [
      rotation[0] + -Math.PI / 2,
      rotation[1],
      rotation[2]
    ]
    return ({
      args: [heights, { elementSize, minValue: -maxHeight / 2, maxValue: maxHeight }],
      position: calculatedPosition,
      rotation: calculatedRotation
    })
  }, null, [heights, elementSize, position, rotation, maxHeight])

  return (
    <mesh
      position={position}
      rotation={[rotation[0] + -Math.PI / 2, rotation[1] + Math.PI / 2, rotation[2], 'YXZ']}>
      <planeBufferGeometry args={[
        heightmap.image.width,
        heightmap.image.height,
        heightmap.image.width / elementSize,
        heightmap.image.height / elementSize
      ]} />
      <meshPhongMaterial
        map={heightmap}
        displacementMap={heightmap}
        displacementScale={maxHeight}
        displacementBias={-maxHeight / 2}
      />
    </mesh>
  )
}

export default function Terrain(props) {
  return (
    <Heightmap
      heightMap="/3d/textures/heightmap.jpg"
      {...props} />
  )
}