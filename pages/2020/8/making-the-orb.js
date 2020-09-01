import Post from 'components/Post'
import Hint from 'components/Hint'

export default () => (
  <Post
    title="Making The Orb"
    subtitle="How and Why I Made a Fantasy Artifact"
    description="Discussing how and why I made a fantasy artifact: The Orb."
    date="2020-08-31"
    cardImage="https://blog.aunyks.com/img/misc/orb.jpg">
    <p>
      I found a lot of surrealist fantasy content the other day. There were eerie, mysterious scenes that that highlighted
      artifacts and architecture that didn't appear to be from this world. Such scenes inspired me to make a piece of my own, and of course
      I used this as another opportunity to practice my 3D skills.
      </p>
    <p>
      I remember in my free time I'd found an <a href="https://www.youtube.com/watch?v=-h6JLUctbYs">environment building tutorial by Ducky3D</a>. As a part of designing
        an artifact in the scene, he'd given it a <Hint msg="A Voronoi texture is a texture generated procedurally using Voronoi noise.">Voronoi type of texture</Hint> and a
        beautiful emissive hue. Captivated by such a small detail, I'd applied it to my own scene.
      </p>
    <figure className="my-3">
      <img className="w-full" src="/img/misc/orb.jpg" alt="A large sphere with wavey black designs. It emits bright blue light." />
      <figcaption className="w-full lg:w-1/2 text-xs text-center mx-auto">The Orb itself.</figcaption>
    </figure>
    <p>
      I decided to make the only subject of my scene an orb: a spherical artifact that had an ominous power to it. I wanted it to distract, or rather, suck in the viewer such that
      it entrances them. I did this by using light, motion, and especially sound to immerse the viewer in the piece so that they feel as if they're witnessing the Orb's energy, its presence, firsthand.
      </p>
    <p>
      With that being said, I opened up Blender and got to work bringing the idea to life. Actions like adding a sphere to the scene and having it shade smooth when rendered didn't require any help.
      I consulted the Internet, however, to learn how to shade the sphere so that it became The Orb as we know it. I wired together some nodes in Blender's Shader Editor and quickly saw my idea in front of my eyes.
      </p>
    <p>
      The background of the scene was still that default gray, and that wasn't good enough to keep. I searched how to change the background of Blender scenes and learned that it's possible to apply shaders to the <Hint msg="As far as I know, the World in Blender is everything that wasn't added to the scene manually. It's the global context of the scene.">World</Hint>.
      I chose a simple black color to shade the World, and at this point I was approaching a finished product. My next step was to animate the Orb rotating about its center.
    </p>
    <p>
      I'd never animated object attributes in Blender so I also consulted the Internet for such knowledge. The controls seemed a bit daunting at first, like many workflows in the tool, but with enough carefulness and taps of the undo button it became a somewhat familiar process. I tried to
      do some math with the animation duration and the number of frames so that I could get a perfect loop once the render had completed. After previewing the animated render, I had what I wanted, and the next step was to render it to a video file.
    </p>
    <p>
      I was happy to be tweaking certain export settings like the video's frames per second, dimensions, encoding, and file type. When I went to render the animation, I was met with a frustration that's common in the industry: my render took forever.
    </p>
    <div
      className="my-6" dangerouslySetInnerHTML={{
        __html: `<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Rendering a 4 second animation with Cycles and it’s looking like it’ll take a while</p>&mdash; Nash (刘光瑞） (@aunyks) <a href="https://twitter.com/aunyks/status/1299821608488534016?ref_src=twsrc%5Etfw">August 29, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`
      }}>
    </div>
    <p>
      I was using the <a href="https://www.cycles-renderer.org/">Cycles render engine</a>, which is known for allowing for more realistic renders at the expense of render speed. Even though I was rendering just 4 seconds of footage, rendering a 1920px x 1080px video at 60 frames per second was just too demanding for my laptop. It took 2 mimutes for one frame to render. With <Hint msg="239 and not 240, because it I wanted a good loop.">239</Hint> frames
      to render in total, I'd be waiting about <em>8 hours</em> for a <em>4 second</em> video.
    </p>
    <p>
      I stopped the render and tried to tweak some settings to speed it up. I kept using Cycles, because I'd heard the render quality is that much different than the default, Eevee. I changed some render settings in hopes of seeing a performance boost, but when I went to render again I was waiting 1.5 minutes for each frame.
    </p>
    <p>
      With enough frustration, I told myself to suck up whatever difference in quality rendering in Eevee could have and to use it. This is when I was struck with awe. When going to render with Eevee, frames were rendering in less than a second. The render was moving so fast that I could see the animation in front of my eyes.
      When the final video was complete, I saw no noticeable difference in quality. This is likely because of the <Hint msg="I only had one object that was its own light source, which *shouldn't* be too intensive to compute.">simplicity of my scene</Hint>, but I later learned that Eevee was designed to be a high performance realtime render engine,
      meaning that it's supposed to have the solid render quality with a significant speed boost. This certainly worked to my advantage, and I was very satisfied with the result.
    </p>
    <p>
      The visuals alone were capturing, but a truly entrancing experience would also need accompanying sound. So, I opened Garageband and picked three instruments to loop to create an eerie sonic environment. Together they had an effect
      that, in a way, lets you <em>feel</em> the energy of the Orb. Once I'd gotten a solid loop, I exported it as an MP3 file, opened it in iMovie with the video, and brought the two together.
    </p>
    <figure className="my-3">
      <video loop autoPlay className="w-full">
        <source src="/img/misc/orb.mp4" type="video/mp4" />
        Looks like your browser doesn't support embedded videos, so I can't show you this one unfortunately.
      </video>
      <figcaption className="w-full lg:w-2/3 lg:pt-3 text-xs text-center mx-auto">Don't look for long. The trance is dizzying. Version with sound: <a href="https://twitter.com/aunyks/status/1299872036509102080">here</a></figcaption>
    </figure>
    <p>
      In the end, I'm very satisified with what I'd come up with and what I'd learned! This project was lots of fun.
    </p>
    <h4>Tools Used</h4>
    <p>
      <ul>
        <li>
          <a href="https://www.blender.org/">Blender</a> - Modeling the Orb, animating the Orb's motion, and baking the Orb's texture for export
        </li>
        <li>
          <a href="https://www.apple.com/mac/garageband/">Garageband</a> - Designing the sound used in the Orb's final video
        </li>
        <li>
          <a href="https://www.apple.com/imovie">iMovie</a> - Applying the audio to the video
        </li>
        <li>
          <a href="https://sparkar.facebook.com/ar-studio/">Spark AR Studio</a> - Rendering the Orb in an Instagram filter
        </li>
        <li>
          <a href="https://threejs.org/">Three.js</a> - Rendering the Orb <a href="https://art.aunyks.com/2020/orb">in the browser</a>
        </li>
      </ul>
    </p>
    <h4>Things Learned</h4>
    <p>
      <ul>
        <li>How to make basic procedural textures in Blender</li>
        <li>How to bake procedural textures into UV maps for use outside of Blender</li>
        <li>How to lay out and render basic animations in Blender</li>
      </ul>
    </p>
  </Post>
)