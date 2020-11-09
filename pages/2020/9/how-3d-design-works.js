import Post from 'components/Post'
import Hint from 'components/Hint'

export default function ThreeDDesignWorks() {
  return (
    <Post
      title="How 3D Design Works"
      subtitle="The Basics of Modeling, Design & Animation"
      description="Covering how many virtual 3D graphics achieve realistic appearances."
      date="2020-09-11"
      cardImage="https://blog.aunyks.com/img/art-n-design/photo-of-cube.jpg">
      <p>
        All applications of 3D design consist of the same basic properties. Modeling, <Hint msg="Video effects">VFX</Hint>, and animation are
          each made of scenes that are constructed with objects that emulate those of the real world. By mimicking real-world conditions, we're able
          to get realistic-looking scenes. To see how components of physical and virtual scenes can create very similar appearances, we'll use light, shape,
          material, and camera positioning to make something that looks like this real-world photo of a cube using <a href="https://blender.org">Blender</a>, although it can be done it all kinds of 3D design software.
        </p>
      <figure className="mb-2">
        <img className="w-full" src="/img/art-n-design/photo-of-cube.jpg" alt="An isometric photo of a white cube. It has a pitch black background and shadows going down its sides." />
        <figcaption className="w-full lg:w-3/4 text-xs text-center mx-auto">This will be our reference image throughout the post.</figcaption>
      </figure>
      <h3>1. Construcing the Scene</h3>
      <figure className="mb-5">
        <img className="w-full" src="/img/art-n-design/default-cube.jpg" alt="A default Blender scene fit with default cube, point light, and camera." />
        <figcaption className="w-full lg:w-3/4 text-xs text-center mx-auto">A scene with a cube, light, and camera.</figcaption>
      </figure>
      <p>
        Our first step is to open Blender and add whatever items we need to the scene. In our reference photo, the only thing visible is a cube, so we add that to our scene. But, we also
        need to add other things like the light source that's casting rays onto the cube and the camera that's capturing the photo.
      </p>
      <p>
        Normally, we don't think about lighting or perspective unless we're already familiar with visual art forms like photography, drawing, painting, and more. 3D design is no different from these forms in that
        we have to add <em>everything</em> that makes the scene what it is, to the scene.
      </p>
      <h3>2. Change Our Perspective</h3>
      <figure className="mb-5">
        <img className="w-full" src="/img/art-n-design/cube-w-reference-perspective.jpg" alt="The same scene as before but with a view that is close to an isometric perspective." />
        <figcaption className="w-full lg:w-3/4 text-xs text-center mx-auto">A more isometric perspective of our cube.</figcaption>
      </figure>
      <p>
        To help make our changes to the scene more accurate, we'll look at it from a similar perspective as what's provided in the reference image.
      </p>
      <h3>3. Materials and Shading</h3>
      <figure className="mb-5">
        <img className="w-full" src="/img/art-n-design/change-bg-and-cube-color.jpg" alt="The cube is now white with a black background behind it." />
        <figcaption className="w-full lg:w-3/4 text-xs text-center mx-auto">Our cube is colored white and the background is colored black.</figcaption>
      </figure>
      <p>
        The cube in our reference image is white with a black background. So, we give the world around our cube a pitch black color, and we color the cube white. Similar to that of our reference photo,
      our cube has its material properties configured so that it reflects just the right amount of light. Too reflective and it could appear metallic. Too <Hint msg="Higher amounts of roughness cause objects to scatter more light in all directions.">rough</Hint> and it could appear to be made of fabric.
    </p>
      <h3>4. Positioning the Light</h3>
      <figure className="mb-5">
        <img className="w-full" src="/img/art-n-design/position-light.jpg" alt="The light in the Blender scene is selected, with an orange tint to it." />
        <figcaption className="w-full lg:w-3/4 text-xs text-center mx-auto">Our scene with the light selected.</figcaption>
      </figure>
      <p>
        By default, our light emits white light, so we don't need to change that at the moment. But, it was previously casting shadows on our cube that caused it to appear different from the cube in our reference image.
        So, we can move the light around until the cube and the shadows casted on its faces look like those in our reference image.
    </p>
      <h3>5. Positioning the Camera</h3>
      <figure className="mb-5">
        <img className="w-full" src="/img/art-n-design/position-camera.jpg" alt="The camera in the Blender scene is selected, with an orange tint to it." />
        <figcaption className="w-full lg:w-3/4 text-xs text-center mx-auto">Our scene with the camera selected and positioned about where the camera of the reference photo is.</figcaption>
      </figure>
      <p>
        Our scene looks pretty good now, but, when we look at it from the perspective of the camera, things don't look right. To fix this, we move the camera into a position similar to where we imagine the camera was in our reference,
        relative to its cube.
    </p>
      <h3>6. Previewing the Render</h3>
      <figure className="mb-5">
        <img className="w-full" src="/img/art-n-design/preview-camera.jpg" alt="A view of the cube from the camera's perspective." />
        <figcaption className="w-full lg:w-3/4 text-xs text-center mx-auto">A preview of our scene from the camera's perspective.</figcaption>
      </figure>
      <p>
        To make sure that we've positioned the camera in the right place, we can preview what the scene looks like from its perspective. In this case, it looks fine, so the scene is ready for rendering!
    </p>
      <h3>7. Rendering the Scene</h3>
      <figure className="mb-5">
        <img className="w-full" src="/img/art-n-design/cube-final.jpg" alt="A white cube with a black backround behind it with shadows on its sides." />
        <figcaption className="w-full lg:w-3/4 text-xs text-center mx-auto">Our final render!</figcaption>
      </figure>
      <p>
        In 3D design, rendering a scene is the act of capturing objects in the scene from the perspective of the camera and outputting the result to a desired media format. The most common of these formats are videos and still images. In our case, we've rendered
        our scene to a normal still image. If we so pleased, we could have decided to animate the the position, size, or orientation of the cube or camera during rendering and outputted it to a video. For some added effects, we could even add some sound!
    </p>
      <h3>Wrapping Up</h3>
      <p>
        Ultimately, I think our render is very similar to the reference image that we tried to model. There are some details that we ignored for the sake of brevity, like rounding some corners and edges and brightening the light, but the general idea is still here.
      </p>
      <p>
        Everyday 3D design can get even more complex and exciting, though. Designers often get creative with perspective, physics, shading/materials, sound, and so much more to bring ideas to life. Just imagine all of the lighting, modeling detail, and camera work in addition to other aspects
      that went into creating a large work like <a href="https://www.imdb.com/title/tt0317705/">The Incredibles</a> or your favorite 3D animated work.
    </p>
    </Post>
  )
}