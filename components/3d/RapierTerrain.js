import { useMemo, useRef } from 'react'
import { useLoader } from '@react-three/fiber'
import { Euler, Quaternion, TextureLoader } from 'three'
import { useHeightfield } from 'components/3d/RapierPhysics'
import useSWR from 'swr'

// Returns matrix data to be passed to heightfield
function createHeightfieldMatrix(image) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  if (context) {
    context.imageSmoothingEnabled = false
  } else {
    throw new Error('Heightfield could not be created')
  }
  const width = image.width
  const height = image.height
  const heightValues = new Float32Array(width * height)

  canvas.width = width
  canvas.height = height
  context.drawImage(image, 0, 0, width, height)

  const { data } = context.getImageData(0, 0, width, height)

  let i = 0
  for (let j = 0; j < heightValues.length; j++) {
    // pixel data is [r, g, b, alpha]
    // since image is in b/w -> any rgb val

    // the below gets the red only, from each pixel
    heightValues[j] = data[i] / 255
    i += 4
  }
  context.clearRect(0, 0, width, height)
  return { heightValues, nRows: height - 1, nCols: width - 1 }
}

// A pixel value of 0xff / 2 will be at height (y value) of 0
// 1 pixel = elementSize square meters. Size the image accordingly
// Use resolution to add graphical vertices between each element.
// It smooths the terrain for great visual fidelity but quickly harms performance
export function Heightmap({
  // Url must point to a square, black and white image
  heightMapUrl,
  resolution = 1,
  maxHeight = 100,
  position = [0, 0, 0],
  //
  rotation = [0, 0, 0],
  // x direction
  width,
  // z direction
  length,
  ...props
}) {
  const heightmap = useLoader(TextureLoader, heightMapUrl)
  const { data: fieldData } = useSWR(
    'heightfieldMatrix',
    async () => {
      return createHeightfieldMatrix(heightmap.image)
    },
    { suspense: true }
  )
  const yOrigin = -maxHeight / 2
  const heightfieldRef = useRef(null)
  let fieldQuaternion = new Quaternion().setFromEuler(
    new Euler(
      0 + rotation[0],
      -Math.PI / 2 + rotation[1],
      0 + rotation[2],
      'YXZ'
    )
  )
  const scale = useRef({
    x: length || heightmap.image.height,
    y: maxHeight,
    z: width || heightmap.image.width,
  })
  useHeightfield(
    () => {
      return {
        args: [
          fieldData.nRows,
          fieldData.nCols,
          fieldData.heightValues,
          scale.current,
        ],
        position: [0, yOrigin, 0],
        quaternion: [
          fieldQuaternion.w,
          fieldQuaternion.x,
          fieldQuaternion.y,
          fieldQuaternion.z,
        ],
      }
    },
    heightfieldRef,
    [fieldData]
  )
  return (
    <mesh
      position={position}
      rotation={[rotation[0], rotation[1], rotation[2], 'YXZ']}>
      <mesh
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0, 'YXZ']}
        receiveShadow
        {...props}>
        <planeBufferGeometry
          args={[
            scale.current.z,
            scale.current.x,
            scale.current.z * resolution,
            scale.current.x * resolution,
          ]}
        />
        <meshPhongMaterial
          map={heightmap}
          displacementMap={heightmap}
          displacementScale={maxHeight}
          displacementBias={yOrigin}
        />
      </mesh>
    </mesh>
  )
}

export default function Terrain(props) {
  return <Heightmap heightMapUrl="/3d/textures/heightmap.jpg" {...props} />
}
