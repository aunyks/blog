import {
  useRef
} from 'react'
import {
  BackSide,
  Color
} from 'three'
import {
  useFrame
} from '@react-three/fiber'

const VERTEX_SHADER = `
// This will hold the v coordinate from the 
// sphere's UV. In this context, it's the y (vertical)
// coordinate. By tracking this, we can change colors and stuff
// based on this pixel / vertex's height and get creative with 
// skies and horizons
varying float v;

void main() {
  // Should be 0 at bottom of sphere, 1 at top
  v = uv.y;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const FRAGMENT_SHADER = `
varying float v;
uniform vec3 horizonColor;
uniform vec3 skyColor;

// A sigmoid maps the input in range (-Infinity, Infinity) to 
// (-1, 1) with most of the change within (-1, 1). We can use this property to map (0, 1) inputs in GLSL 
// to more precisely controlled outputs in (0, 1).
// We use an algebraic function as opposed to other types (https://en.wikipedia.org/wiki/Sigmoid_function) 
// for simplicity and speed.

// Function: f(x, a, b, c) = (ax - b) / sqrt(c + (ax - b)^2)
// a (1 or -1) being negative flips the function over the y axis.
// b shifts it across the x axis
// c (0, 1) controls the width of the sigmoid. Closer to 0 makes it slim, closer to 1 makes it wide
float algebraicSigmoid(float x, float a, float b, float c) {
  return (a * x - b) / sqrt(c + pow(a * x - b, 2.0));
}

float horizonCurve(float x, float blendFactor, float blendHeight) {
  return 0.5 * algebraicSigmoid(x, 1.0, blendHeight, blendFactor) + 0.5;
}

// Interpolate between colors
vec3 lerpColors(vec3 a, vec3 b, float t) {
  return mix(a, b, t);
}

void main() {
  float horizonHandle = horizonCurve(v, 0.005, 0.55);
  vec3 finalColor = lerpColors(horizonColor, skyColor, horizonHandle);
  // RGBA color
  gl_FragColor = vec4(finalColor, 1.0);
}
`

// On prop change, this component will smoothly interpolate to the next colors
export default function SkyDome({
  horizonColor,
  skyColor,
  ...props
}) {

  const targetHorizonColor = new Color(horizonColor || 0xc9e9f6)
  const targetSkyColor = new Color(skyColor || 0x5bbce4)

  const materialRef = useRef()
  const uniformsRef = useRef({
    // Default colors
    horizonColor: { value: targetHorizonColor },
    skyColor: { value: targetSkyColor }
  })

  useFrame(() => {
    if (horizonColor) {
      materialRef.current.uniforms.horizonColor.value.lerp(
        targetHorizonColor,
        0.05
      )
    }
    if (skyColor) {
      materialRef.current.uniforms.skyColor.value.lerp(
        targetSkyColor,
        0.05
      )
    }
  })

  return (
    <>
      <mesh {...props}>
        <sphereBufferGeometry args={[1000 * 10, 9, 17]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={VERTEX_SHADER}
          fragmentShader={FRAGMENT_SHADER}
          uniforms={uniformsRef.current}
          side={BackSide} />
      </mesh>
      <hemisphereLight
        intensity={0.2}
        color={targetSkyColor}
        groundColor={targetHorizonColor} />
    </>
  )
}