import CodeSnippetPost from 'components/CodeSnippetPost'
import CodeBlock from 'components/CodeBlock'
import CodeSnippet from 'components/CodeSnippet'
import Tex from 'components/Tex'

export default function GoCodeSnippets() {
  return (
    <CodeSnippetPost
      title="OpenGL Shader Code Snippets"
      description="Useful bites of Go code that I often write and rewrite."
      hasMath
    >
      <CodeSnippet title="Horizon Shader">
        <p>
          A non-<a href="https://en.wikipedia.org/wiki/Physically_based_rendering" target="_blank">PBR</a> shader that
          quickly blends between two colors near the middle of the vertical axis. When applied to large, inward-facing meshes,
          this material can be used as a sky box or sky dome.
        </p>
        <p>
          It uses an <a href="#algebraic-sigmoid">algebraic sigmoid</a> to
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
      <CodeSnippet title="Algebraic Sigmoid">
        <p>
          The algebraic <a href="https://en.wikipedia.org/wiki/Sigmoid_function" target="_blank">sigmoid</a> (or S curve) is the function <Tex isFigure tex="\frac{ax-b}{\sqrt{c + (ax-b)^2}}" />. It's used to
          to map values in the range [-Infinity, Infinity] common in GLSL to the range [0, 1]. Changing the parameters of the curve changes its shape and has a wide
          range of applications in graphics. <code>a</code> being <code>1</code> or <code>-1</code> flips the curve over the y axis. <code>b</code> shifts it across the x axis. <code>c</code> being <code>0</code> or <code>1</code> controls the curve's width: closer to <code>0</code> makes it slim, closer to <code>1</code> makes it wide.
        </p>
        <CodeBlock lang="glsl">{`
float algebraicSigmoid(float x, float a, float b, float c) {
  return (a * x - b) / sqrt(c + pow(a * x - b, 2.0));
}
`}</CodeBlock>
      </CodeSnippet>
    </CodeSnippetPost>
  )
}