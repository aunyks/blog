import {
  useState,
  useRef
} from 'react'
import {
  BackSide,
  Color
} from 'three'
import {
  EffectComposer,
  Bloom
} from '@react-three/postprocessing'
import Post from 'components/Post'
import Hint from 'components/Hint'
import CodeBlock from 'components/CodeBlock'
import Tex from 'components/Tex'
import Sun from 'components/3d/Sun'
import SkyDome from 'components/3d/SkyDome'
import ThreeDFigure from 'components/3d/ThreeDFigure'
import OrbitControls from 'components/3d/controls/OrbitControls'

export default function ProcSkydomesOnWeb() {
  const horizonColor = useRef(new Color(0x5bbce4))
  const skyColor = useRef(new Color(0x1f8dba))
  const sunColor = useRef(new Color(0xffffff))
  const [dayCycle, setDayCycle] = useState('day')

  const handleDayCycleChange = e => {
    switch (e.target.value) {
      case 'day':
        sunColor.current = new Color(0xaaaa55)
        horizonColor.current = new Color(0x5bbce4)
        skyColor.current = new Color(0x1f8dba)
        break
      case 'dusk':
        sunColor.current = new Color(0x705a01)
        horizonColor.current = new Color(0xfbcc0a)
        skyColor.current = new Color(0x743a6d)
        break
      case 'night':
        sunColor.current = new Color(0xffffff)
        horizonColor.current = new Color(0x888888)
        skyColor.current = new Color(0x111111)
        break
      default:
        throw new Error(`Unknown day cycle state ${e.target.value} found`)
    }
    setDayCycle(e.target.value)
  }
  return (
    <Post
      title="Procedural Skydomes on the Web"
      description="A brief dive into what skydomes are in graphics and how to make one that runs smoothly on all devices."
      date="2021-07-10"
      hasMath
      hasCodeSnippet>
      <p>
        Ever since I've been exploring 3D graphics, I've been veering into game development and realtime graphics, particularly on the web.
        Exploring this has shown me the importance of <a href="https://en.wikipedia.org/wiki/Skybox_%28video_games%29">skyboxes</a> and <Hint msg="A skydome is similar to a skybox, except it's a spherical in shape instead of cubic.">skydomes</Hint>.
        When building virtual worlds, having a skydome adds to the immersion of a scene by introducing a sort of backdrop. With that said, it's probably easier to show than tell.
      </p>
      <p>
        Let's say I want an outdoor scene that takes place during the day. Just to quickly set up the scene, here's a ground plane we can
        get started with.
      </p>
      <ThreeDFigure caption={(
        <figcaption className="mt-2 text-xs text-center mx-auto">
          Drag around the image to look around!
        </figcaption>
      )}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeBufferGeometry args={[1000, 1000]} />
          <meshBasicMaterial color="green" />
        </mesh>
        <ambientLight intensity={1} />
        <OrbitControls origin={[0, 2, 0]} cameraDistance={0} />
      </ThreeDFigure>
      <p>
        There's not much else there, and as a matter of fact the background of the scene is the background of this webpage. Let's add a sphere to work
        as our skydome. I'm gonna add a sphere, scale it up really big, and make the faces point inward so that we can see it from the inside. Let's go with
        a softer color palette too.
      </p>
      <ThreeDFigure>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeBufferGeometry args={[1000, 1000]} />
          <meshBasicMaterial color={0x54a222} />
        </mesh>
        <mesh>
          <sphereBufferGeometry args={[10 * 10, 9, 9]} />
          <meshBasicMaterial color={0x5bbce4}
            side={BackSide} />
        </mesh>
        <ambientLight intensity={1} />
        <OrbitControls origin={[0, 2, 0]} cameraDistance={0} />
      </ThreeDFigure>
      <p>
        Okay, now we have some semblance of a sky and horizon. Now, most
        clear skies are actually a blend of at least two colors: one near the horizon
        blends into others higher in the sky. Take a look at this real-world example.
      </p>
      <figure className="my-2">
        <img alt="A roadside scene in the farmlands of Drummond, Idaho. Most apparent in the photo is the gradient between a deep blue and sky blue at the horizon"
          src="/img/tech/natural-horizon-example.jpg" />
        <figcaption className="mx-auto text-center text-xs">Image courtesy: <a target="_blank" href="https://unsplash.com/photos/lX5wMeZUidA">Cate Bligh</a></figcaption>
      </figure>
      <p>
        Notice how the sky is composed of a deep blue high in the sky and a softer blue near the horizon? If you look at <em>any</em> horizon
        at <Hint msg="Even at night the horizon is a bit of a different color from the high sky!">any time of day</Hint>, you can see a gradient of two, three, and
        sometimes four colors. Now that we know this, we need our skydome to smoothly blend between two colors. We can do this using some <a href="https://en.wikipedia.org/wiki/OpenGL_Shading_Language" target="_blank">GLSL</a> shaders,
        thanks to <a href="https://en.wikipedia.org/wiki/WebGL" target="_blank">WebGL</a>.
      </p>
      <p>
        I'll save the basics of how these shaders work for another article, but I'll try my best to explain some high level stuff as we go. Basically, we want the color of
        our skydome sphere to change according to where on the sphere we are. At the top of the sphere, we want to be one color, and at the bottom we want to be another. As
        we move down the sphere, the colors should smoothly blend between each other. To do this, we write a fragment shader so that we can get the UV position of any part of the sphere.
      </p>
      <figure className="my-2">
        <CodeBlock
          lang="glsl"
          showCodeByDefault
          noButton>{`
varying float v;

void main() {
  v = uv.y;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`}</CodeBlock>
      </figure>
      <p>
        Here, we define a variable <code>v</code> to keep track of where we are along the height of the sphere. Its
        value will be <code>0</code> at the very bottom of the sphere and <code>1</code> at the very top. We make it <code>varying</code>,
        because we'll be using it in our fragment shader to decide the colors of the sphere.
      </p>
      <p>
        Now, for a basic gradient we just use <code>v</code> to <a href="https://en.wikipedia.org/wiki/Linear_interpolation" target="_blank">linearly interpolate</a> between
        our horizon color and sky color.
      </p>
      <figure className="my-2">
        <CodeBlock
          lang="glsl"
          showCodeByDefault
          noButton>{`
varying float v;
uniform vec3 horizonColor;
uniform vec3 skyColor;

void main() {
  vec3 finalColor = mix(horizonColor, skyColor, v);
  gl_FragColor = vec4(finalColor, 1.0);
}
`}</CodeBlock>
      </figure>
      <p>
        Here, <code>horizonColor</code> is the color at the horizon and <code>skyColor</code> is the color high in the sky. Let's see how this looks.
      </p>
      <ThreeDFigure>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeBufferGeometry args={[1000, 1000]} />
          <meshBasicMaterial color={0x54a222} />
        </mesh>
        <mesh>
          <sphereBufferGeometry args={[10 * 10, 9, 9]} />
          <shaderMaterial
            vertexShader={`
          varying float v;

          void main() {
            v = uv.y;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }`}
            fragmentShader={`
          varying float v;
uniform vec3 horizonColor;
uniform vec3 skyColor;

void main() {
  vec3 finalColor = mix(horizonColor, skyColor, v);
  gl_FragColor = vec4(finalColor, 1.0);
}
          `}
            uniforms={{
              horizonColor: { value: new Color(0x5bbce4) },
              skyColor: { value: new Color(0x1f8dba) }
            }}
            side={BackSide} />
        </mesh>
        <ambientLight intensity={1} />
        <OrbitControls origin={[0, 2, 0]} cameraDistance={0} />
      </ThreeDFigure>
      <p>
        Huh. We can barely see a difference between this and our last scene. Why is that? Well, it's because
        our gradient is so smooth and our sphere is so big that it's really hard for us to even see any change in color.
        We can only see half of the gradient anyway, since half of the sphere is below the ground plane.
      </p>
      <p>
        To make our dome more realistic, we need to control where and how quickly the color blending occurs. If our <code>v</code> variable
        from earlier is 0 at the bottom of the sphere and 1 at the top, how can we modify that to control where and when 0 goes to 1?
        Luckily, there's a nice set of mathematical functions that we can use to do this called <a href="https://en.wikipedia.org/wiki/Sigmoid_function" target="_blank">Sigmoid functions</a>.
      </p>
      <p>
        We'll use an algebraic sigmoid function for this job, since we can tweak it to our needs and it's not too computationally intensive.
      </p>
      <figure className="my-4">
        <Tex isFigure tex="d\frac{ax-b}{\sqrt{c + (ax-b)^2}} + e" />
        <figcaption className="text-xs lg:w-3/4 mx-auto">Put this function in <a href="https://www.desmos.com/calculator" target="_blank">a graphing calculator</a> and mess with the parameters to change the curve's shape.</figcaption>
      </figure>
      <p>
        Remember algebra from school. We can use <code>d</code> to control the height of the function, <code>b</code> to control its shift along
        the horizontal axis, and <code>e</code> to control its shift along the vertical axis. <code>a</code> and <code>c</code> control the actual shape of the S-curve.
      </p>
      <p>
        For example, this is what the curve looks like when <code>a</code> is 1, <code>c</code> is 0.05, and <code>b</code>, <code>d</code> and <code>e</code> are 0.5.
      </p>
      <figure className="my-4">
        <img alt="The algebraic sigmoid curve with said parameters" src="/img/tech/algebraic-sigmoid-0-1.jpg" />
        <figcaption className="text-xs text-center mx-auto">Notice how most of the action in the function takes place between 0 and 1 on both axes, which is great for our use in GLSL.</figcaption>
      </figure>
      <p>
        But who care's about the math right? Let's just put this into some code, give some parameters to shape our curve, and see what we get.
        Doing just that, here's our new fragment shader.
      </p>
      <figure className="my-2">
        <CodeBlock
          lang="glsl"
          showCodeByDefault
          noButton>{`
varying float v;
uniform vec3 horizonColor;
uniform vec3 skyColor;

float algebraicSigmoid(float x, float a, float b, float c) {
  return (a * x - b) / sqrt(c + pow(a * x - b, 2.0));
}

float horizonCurve(float x, float blendFactor, float blendHeight) {
  return 0.5 * algebraicSigmoid(x, 1.0, blendHeight, blendFactor) + 0.5;
}

void main() {
  float horizonHandle = horizonCurve(v, 0.005, 0.57);
  vec3 finalColor = mix(horizonColor, skyColor, horizonHandle);
  gl_FragColor = vec4(finalColor, 1.0);
}
`}</CodeBlock>
      </figure>
      <p>
        Here, we're implementing the algebraic sigmoid in GLSL and then making a function called <code>horizonCurve</code> that defines some parameters of the curve.
        We then use the shape of the horizon curve to interpolate between the horizon color and sky color. Here's how it looks.
      </p>
      <ThreeDFigure>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeBufferGeometry args={[1000, 1000]} />
          <meshBasicMaterial color={0x54a222} />
        </mesh>
        <mesh>
          <sphereBufferGeometry args={[10 * 10, 9, 9]} />
          <shaderMaterial
            vertexShader={`
varying float v;

void main() {
  v = uv.y;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
          `}
            fragmentShader={`
varying float v;
uniform vec3 horizonColor;
uniform vec3 skyColor;

float algebraicSigmoid(float x, float a, float b, float c) {
  return (a * x - b) / sqrt(c + pow(a * x - b, 2.0));
}

float horizonCurve(float x, float blendFactor, float blendHeight) {
  return 0.5 * algebraicSigmoid(x, 1.0, blendHeight, blendFactor) + 0.5;
}

void main() {
  float horizonHandle = horizonCurve(v, 0.005, 0.57);
  vec3 finalColor = mix(horizonColor, skyColor, horizonHandle);
  gl_FragColor = vec4(finalColor, 1.0);
}
`}
            uniforms={{
              horizonColor: { value: new Color(0xc9e9f6) },
              skyColor: { value: new Color(0x1f8dba) }
            }}
            side={BackSide} />
        </mesh>
        <ambientLight intensity={1} />
        <OrbitControls origin={[0, 2, 0]} cameraDistance={0} />
      </ThreeDFigure>
      <p>
        It's so much more natural-looking! And the best part is that, because it's procedural, we can change the colors whenever we want
        to whatever colors we want. Let's add a day cycle, where we can change the sky colors according to the time of day. Hit a button to
        change to that time of day.
      </p>
      <ThreeDFigure>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeBufferGeometry args={[1000, 1000]} />
          <meshBasicMaterial color={0x54a222} />
        </mesh>
        <SkyDome radius={100} horizonColor={horizonColor.current} skyColor={skyColor.current} />
        <ambientLight intensity={1} />
        <OrbitControls origin={[0, 2, 0]} cameraDistance={0} />
      </ThreeDFigure>
      <form className="flex flex-row justify-around mb-2">
        <label htmlFor="day-1">
          <input className="mr-1 lg:mr-2" type="radio" value="day" id="day-1" checked={dayCycle === 'day'}
            onChange={handleDayCycleChange} name="dayCycle" />
          Day
        </label>
        <label htmlFor="dusk-1">
          <input className="mr-1 lg:mr-2" type="radio" value="dusk" id="dusk-1" checked={dayCycle === 'dusk'}
            onChange={handleDayCycleChange} name="dayCycle" />
          Dusk
        </label>
        <label htmlFor="night-1">
          <input className="mr-1 lg:mr-2" type="radio" value="night" id="night-1" checked={dayCycle === 'night'}
            onChange={handleDayCycleChange} name="dayCycle" />
          Night
        </label>
      </form>
      <p>
        And while we're here, why not add a sun / moon just because? Maybe even some <Hint msg="Bloom is a postprocessing effect in computer graphics that mimics a real-life phenomenon when looking at bright light. You've seen it in the real world without even knowing you have.">bloom</Hint> for
        a bit of that <em>✨dreamy✨</em> feel.
      </p>
      <ThreeDFigure>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeBufferGeometry args={[1000, 1000]} />
          <meshBasicMaterial color={0x54a222} />
        </mesh>
        <SkyDome radius={100} horizonColor={horizonColor.current} skyColor={skyColor.current} />
        <ambientLight intensity={1} />
        <Sun position={[1, 4.5, -5]} radius={1} color={sunColor.current} />
        <EffectComposer>
          <Bloom intensity={10} luminanceThreshold={0.8} />
        </EffectComposer>
        <OrbitControls origin={[0, 2, 0]} cameraDistance={0} />
      </ThreeDFigure>
      <form className="flex flex-row justify-around mb-2">
        <label htmlFor="day-2">
          <input className="mr-1 lg:mr-2" type="radio" value="day" id="day-2" checked={dayCycle === 'day'}
            onChange={handleDayCycleChange} name="dayCycle" />
          Day
        </label>
        <label htmlFor="dusk-2">
          <input className="mr-1 lg:mr-2" type="radio" value="dusk" id="dusk-2" checked={dayCycle === 'dusk'}
            onChange={handleDayCycleChange} name="dayCycle" />
          Dusk
        </label>
        <label htmlFor="night-2">
          <input className="mr-1 lg:mr-2" type="radio" value="night" id="night-2" checked={dayCycle === 'night'}
            onChange={handleDayCycleChange} name="dayCycle" />
          Night
        </label>
      </form>
      <p>
        And there we go! To add a realtime skydome to your 3D scene, add a sphere, blow it up really big, point the faces inward and
        then do some shader tricks involving some clever math. Once that's done it's up to you to pick colors and postprocessing to get the look you want.
        And the best part is that we can get somewhat close to photorealism without modeling real-world light and atmospheric patterns.
      </p>
    </Post>
  )
}