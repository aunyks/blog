import Post from 'components/Post'
import Hint from 'components/Hint'

export default function ToonShadingInBlender() {
  return (
    <Post
      title="Toon Shading in Blender"
      description="Walking through how to create a cartoon-looking material in Blender."
      date="2020-12-08"
      cardImage="https://blog.aunyks.com/img/art-n-design/toon-sphere-4.jpg">
      <p>
        I've discovered a{' '}
        <Hint msg="Toon shading is sometimes called cel shading, in reference to the cels that were used in 20th century 2D animation. Cels, short for celluloid, are clear sheets of acetate that animators drew on.">
          toon shading
        </Hint>{' '}
        style that I really like in Blender. Here's what it looks like and in
        this post we'll briefly walk through how to reproduce the style.{' '}
        <em>
          Note: This post assumes basic knowledge of Blender concepts and how to
          navigate the interface.
        </em>
      </p>
      <figure>
        <img
          src="/img/art-n-design/toon-sphere-4.jpg"
          alt="A vibrantly red circle with black outline that's colored as if a light is shining on it from 2 o'clock."
        />
        <figcaption className="text-xs text-center mx-auto">
          What we'll have in the end.
        </figcaption>
      </figure>
      <p>
        Before we get started, let's remove the default cube from our scene and
        add a UV Sphere and shade it smooth so we can get an idea of how our
        materials appear in the light. Since spheres are often used in
        traditional art classes to visualize and practice shading in light, I
        think it's a great geometry to use for this.
      </p>
      <figure>
        <img src="/img/art-n-design/toon-sphere-1.jpg" />
        <figcaption className="text-xs text-center mx-auto">
          Our new sphere with default material.
        </figcaption>
      </figure>
      <p>
        Next we need to add our toon shader. To do this, go to the shading tab
        and create a new material. Then, set up your nodes to look like this.
        This is the core of the toon shader appearance.{' '}
        <em>
          Notice that the rightmost dropdown in the ColorRamp node is set to{' '}
          <u>Constant</u>. By default it's set to <u>Linear</u> so you have to
          change it
        </em>
        .
      </p>
      <figure>
        <img
          src="/img/art-n-design/toon-shader-nodes-1.png"
          alt="A Blender shader graph. A Diffuse BSDF node connects to a Shader to RGB node. The Shader to RGB Node connects its color output to the Fac input of a ColorRamp node. The ColorRamp node's Color output is connected to the Surface input of the Material Output node."
        />
        <figcaption className="text-xs text-center mx-auto">
          The core toon shader material.
        </figcaption>
      </figure>
      <figure>
        <img
          src="/img/art-n-design/toon-sphere-2.jpg"
          alt="A two-dimensional circle colored white and black with no gradient blending the colors together."
        />
        <figcaption className="text-xs w-full lg:w-2/3 text-center mx-auto">
          Now our sphere looks like this! This flat coloring with no smooth
          blend makes toon what it is.
        </figcaption>
      </figure>
      <p>
        But, it's a bit tricky to understand how this shader is{' '}
        <em>actually</em> toony. To help see our impact, let's give our material
        some color. Below you can see that I changed the white into bright red
        and the black into a slightly darker red. This way, the it looks like
        our light is casting a shadow.
      </p>
      <figure>
        <img
          src="/img/art-n-design/toon-sphere-3.jpg"
          alt="A two-dimensional circle with two tones of red color."
        />
        <figcaption className="text-xs text-center mx-auto">
          Now check out the sphere. We're almost done.
        </figcaption>
      </figure>
      <p>
        Although our sphere is pretty much complete, the colors look a bit
        duller than we defined. That's because of how Blender renders colors by
        default. We want it to ignore most of the raytracing that Eevee and
        Cycles do, so in order to get that true, vibrant colors that we want we
        need to change the View Transform from <u>Filmic</u> to <u>Standard</u>.
      </p>
      <figure>
        <img
          src="/img/art-n-design/toon-shade-coloring-1.jpg"
          alt="A screenshot of a Blender window showing the View Transform value set to Filmic."
        />
      </figure>
      <figure>
        <img
          src="/img/art-n-design/toon-shade-coloring-2.jpg"
          alt="A screenshot of a Blender window showing the View Transform value set to Standard."
        />
      </figure>
      <p>
        That brightened the colors in our scene and gave our sphere a much more
        familiar, toony look. And that's it! We've created a shader material
        that gives meshes a toon look.
      </p>
      <p>
        You also may have noticed that the sphere I had in the first image in
        this post has a black outline. I added that, because it's a detail that
        I like. It reminds me of some of my favorite 2D animation styles. If
        you'd like to add colored outlines to your meshes,{' '}
        <a href="https://www.youtube.com/watch?v=6YreUxnIP6U">
          this YouTube video
        </a>{' '}
        walks you through it.
      </p>
      <figure>
        <img
          src="/img/art-n-design/toon-sphere-4.jpg"
          alt="A vibrantly red circle with black outline that's colored as if a light is shining on it from 2 o'clock."
        />
      </figure>
      <p>I hope this helped. Happy creating!</p>
    </Post>
  )
}
