import { BackSide } from 'three'

const VERTEX_SHADER = `
// This will hold the v coordinate from the 
// sphere's UV. In this context, it's the y (vertical)
// coordinate. By tracking this, we can change colors and stuff
// based on this pixel / vertex's height and get creative with 
// skies and horizons
varying float v;

void main() {
  v = uv.y;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const FRAGMENT_SHADER = `
varying float v;

void main() {
  // RGBA color
  gl_FragColor = vec4(vec3(v, 1.0, 0), 1.0);
}
`


export default function SkyBox(props) {
  return (
    <mesh {...props}>
      <sphereBufferGeometry args={[1000 * 10, 32, 32]} />
      <shaderMaterial vertexShader={VERTEX_SHADER} fragmentShader={FRAGMENT_SHADER} side={BackSide} />
    </mesh>
  )
}