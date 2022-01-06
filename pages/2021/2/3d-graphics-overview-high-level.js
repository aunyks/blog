import Post from 'components/Post'

export default function ThreeDGraphicsHighLevel() {
  return (
    <Post
      title="3D Graphics High Level Overview"
      description="Discussing how 3D graphics work, with no math or code."
      date="2021-02-23">
      <p>
        More than 40 years of innovation in computing has granted us the ability
        to put 3D objects on a 2D screen. 3D computer graphics has moved from
        rotating a wireframe cube on a screen to Pixar animated movies telling
        stories like never before and video games looking more like real-life
        films with each new generation. With more realism, it really begs the
        question: how do 3D graphics work?
      </p>
      <p>
        3D graphics work much like photo shoots or film shoots. Someone lays out
        a scene in a 3D environment that consists of lights, camera(s), and
        objects. The cameras then capture what they see for others to consume at
        a later time, or live!
      </p>
      <p>
        In the physical world, odds are that the objects in the scene (say, a
        human or a chair) are "pre-made" and some light sources are naturally
        occurring: you don't need to make a lot of the components of a
        real-world scene from scratch. In computer graphics, we have none of
        that. We have to add any lights, cameras, and objects to our scene and
        define exactly where they are and how they act to achieve the desired
        look. This can be a blessing, because we can create worlds that wouldn't
        be possible in physical space, but it can also be a curse in that it can
        be difficult to achieve realism or set up the scene exactly how we
        imagine.
      </p>
      <p>
        What does a 3D scene really look like? The scene hierarchy is as
        follows. We have a scene. The scene has a set of cameras, a set of
        lights, and a set of objects, which are called meshes. Every mesh
        consists of a material that defines how the mesh responds to light and
        looks to the camera. Every mesh also has a geometry, which defines its
        shape. These shapes can be simple shapes like cubes, spheres, and
        pyramids, or they could be complex shapes like a house or human.
      </p>
      <p>
        Much like a physical world scene, rays of light project from a light
        source and bounce off of meshes. That light then reaches the camera so
        we can see everything.
      </p>
      <p>
        In pre-rendered graphics like images and videos you can create in tools
        like Maya and Blender, this process of casting light, seeing how it
        affects objects in the scene, and using that information to draw the
        scene is often a slow process that produces relatively high quality
        results. In real-time graphics like video games, this process takes
        place between 30 and 60 times each second, but that speed comes at the
        cost of quality. The good thing is that the lines between these systems
        continue to blur as graphics processors get faster, though. This is why
        the graphics on gaming consoles and PCs look better with each new
        generation.
      </p>
      <p>
        I hope this was helpful. If you want to see me making a really basic
        scene in Blender, read{' '}
        <a href="/2020/9/how-3d-design-works">this post</a>.
      </p>
    </Post>
  )
}
