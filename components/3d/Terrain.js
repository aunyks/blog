import {
  useMemo, useRef
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
import useSWR from 'swr'
import createUserData from 'utils/3d/createUserData'

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

// A pixel value of 0xff / 2 will be at height (y value) of 0
// 1 pixel = elementSize square meters. Size the image accordingly
// Use resolution to add graphical vertices between each element. 
// It smooths the terrain for great visual fidelity but quickly harms performance
export function Heightmap({
  // Url must point to a square, black and white image
  heightMap,
  elementSize = 1,
  resolution = 1,
  maxHeight = 100,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  ...props
}) {
  const heightmap = useLoader(TextureLoader, heightMap)
  const { data: heights } = useSWR('heightfieldMatrix', async () => {
    return createHeightfieldMatrix(heightmap.image, maxHeight)
  }, { suspense: true })
  const heightfieldRef = useRef()
  useHeightfield(() => {
    const calculatedPosition = [
      position[0] - heights[0].length * elementSize / 2,
      position[1],
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
  }, heightfieldRef, [heights, elementSize, position, rotation, maxHeight])

  const userData = useRef(createUserData({
    type: 'Ground',
    name: 'Terrain'
  }))

  return (
    <mesh
      position={position}
      rotation={[rotation[0] - Math.PI / 2, rotation[1] + Math.PI / 2, rotation[2], 'YXZ']}
      receiveShadow
      userData={userData.current}
      {...props}>
      <planeBufferGeometry args={[
        heightmap.image.width * elementSize,
        heightmap.image.height * elementSize,
        heightmap.image.width * elementSize * resolution,
        heightmap.image.height * elementSize * resolution
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