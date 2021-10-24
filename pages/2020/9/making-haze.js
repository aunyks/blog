import Post from 'components/Post'
import Hint from 'components/Hint'

export default function MakingHaze() {
  return (
    <Post
      title="Making Haze"
      subtitle="An Endeavor Into Modeling Landscapes"
      description="Quickly covering my process in rendering my first landscape in 3D!"
      date="2020-09-09"
      cardImage="https://blog.aunyks.com/img/art-n-design/haze.jpg">
      <p>
        As another 3D project to help me build some skill in Blender, I wanted to try my hand at capturing landscape shots.
        Like usual, I get a general idea of how others bring similar ideas to life, so I perused a number of YouTube videos to discover how some ways to model landscapes
        using Blender. It looked like a literal "Landscape" add-on exists in Blender that, once enabled, lets us add a plane to the scene that's modified by certain parameters
        to give it a natural looking appearance. That's exactly what I needed. But, how do I add a nice sky?
        </p>
      <p>
        It was then that I looked up how people often add skies to their scenes. A popular method used in modeling and gaming is to use a <a href="https://en.wikipedia.org/wiki/Skybox_(video_games)">skybox or skydome</a>, but, sure enough,
          Blender has another add-on called "Dynamic Sky" that provides an interface that's more quick to set up than manually creating a skybox.
        </p>
      <p>
        I installed this and the Landscape add-on and started playing around with the parameters for each to get a kind of scene that I wanted. The next and arguably hardest step was to texture the landscapes so that they had another
        level of realism beyond a single colored material with some <a href="https://blender.stackexchange.com/questions/785/what-is-a-bsdf">BSDF</a> parameters. I made two landscapes, and I wanted them to appear as if they were made of
        sand and grass, respectively. To bring my grassy knoll and sand dunes to life, I wanted to unwrap the geometries and texture them in another program like I did <a href="/2020/8/designing-my-first-credit-card">my credit card</a>, but these
        landscapes were amorphous, so it'd be tough to texture them well outside of Blender.
        </p>
      <figure className="mb-5">
        <img className="w-full" src="/img/art-n-design/haze-models.jpg" alt="The gray, texture-less models of the knoll and dunes." />
        <figcaption className="w-full lg:w-1/2 text-xs text-center mx-auto">The models used in the scene.</figcaption>
      </figure>
      <p>
        I remembered seeing someone on YouTube "draw" an image onto a material before, so I searched how to do just that. I quickly learned that the functionality I was looking for is called "texture painting". After some research, I figured out that I'd need to
        grab some textures myself or buy them from a marketplace. Just for the fun of it, I went outside and took a couple of pictures of grass near me and found an old picture of some beach sand I'd taken a while back. I uploaded these into Blender and painted a couple
        of these textures I'd made onto their respective landscapes.
        </p>
      <p>
        When learning how to texture paint, I noticed that I need to export the resulting texture that I was painting on so that I can later apply it on to the material to be seen when rendering. This was a familiar flow, as, again, I'd done something similar in <a href="/2020/8/designing-my-first-credit-card">my credit card project</a>.
      A detail I took advantage of when applying these textures is making sure to make each landscape's material pretty rough so that they scatter light well, like real natural landscapes.
        </p>
      <figure className="mb-2">
        <img className="w-full" src="/img/art-n-design/dune-shader-graph.png" alt="Some nodes in the Blender shader editor. An image texture node connects to a Principled BSDF node. The BSDF node then connects to the material output node." />
        <figcaption className="w-full lg:w-3/4 text-xs text-center mx-auto">The shader graph used to apply the painted textures to the sand dune landscape.</figcaption>
      </figure>
      <p>
        Once I'd gotten that done, all that was next was making final tweaks to the scene and positioning the camera where I wanted it for renders. Originally, I wanted to render some short animations of the scene, but I noticed that it takes a while for just one frame to render after rendering a test image. With
          this in mind, I settled for taking a couple of still images so that I didn't have to wait hours like I did <Hint msg="It took an hour for me to render just 1 second of The Orb rotating with the Cycles render engine. I also used Cycles to render scenes for this project.">waiting for The Orb to render</Hint>.
        </p>
      <figure className="mb-3">
        <img className="w-full" src="/img/art-n-design/haze.jpg" alt="The sun is in the top right corner as you look over rolling sand dunes." />
        <figcaption className="w-full lg:w-1/2 text-xs text-center mx-auto">The first render of Haze</figcaption>
      </figure>
      <p>
        If you'd like to see more, check out <a href="https://art.aunyks.com/2020/haze">the page on my art site</a>. Ultimately, I think this was a pretty fun project. I'll be experimenting with more landscape shots <Hint msg="Photorealistic, toony, and all kinds of variations.">of all kinds</Hint> in the future,
          and I think this was an awesome start.
        </p>
      <h4>Tools Used</h4>
      <p>
        <ul>
          <li>
            <a href="https://www.blender.org/">Blender</a> - Modeling, texturing, and rendering the entire scene
        </li>
        </ul>
      </p>
      <h4>Things Learned</h4>
      <p>
        <ul>
          <li>How to use the Dynamic Sky add-on in Blender</li>
          <li>How to use the Landscape add-on in Blender</li>
          <li>How to texture paint meshes in Blender</li>
          <li>Shortcuts for snapping the camera to the current viewport in Blender</li>
        </ul>
      </p>
    </Post>
  )
}