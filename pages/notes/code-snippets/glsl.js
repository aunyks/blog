import CodeSnippetPost from 'components/CodeSnippetPost'
import CodeBlock from 'components/CodeBlock'
import CodeSnippet from 'components/CodeSnippet'

export default function GoCodeSnippets() {
  return (
    <CodeSnippetPost
      title="OpenGL Shader Code Snippets"
      description="Useful bites of Go code that I often write and rewrite."
    >
      <CodeSnippet title="Horizon Shader">
        <p>
          A non-<a href="https://en.wikipedia.org/wiki/Physically_based_rendering" target="_blank">PBR</a> shader that
          quickly blends between two colors near the middle of the vertical axis. When applied to large, inward-facing meshes,
          this material can be used as a sky box or sky dome.
        </p>
        <p>
          It works by using an algebraic <a href="https://en.wikipedia.org/wiki/Sigmoid_function" target="_blank">sigmoid</a> to
          map the v coordinate of a vertex (in range [0, 1]) to some value (in the range [0, 1]) defined by the sigmoid function.
          The resulting value is used to mix or linearly interpolate between two colors. In this case, one is the horizon color and the
          other is the sky color. If you have access to this website's source code, see the <code>SkyDome</code> 3D component for more details about its use.
        </p>
        <h3>Vertex</h3>
        <CodeBlock lang="glsl">{`
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
`}</CodeBlock>
        <h3>Fragment</h3>
        <CodeBlock lang="glsl">{`
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
`}</CodeBlock>
      </CodeSnippet>
    </CodeSnippetPost>
  )
}