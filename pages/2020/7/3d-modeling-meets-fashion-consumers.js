import Post from 'components/Post'

export default function ThreeDMeetsFashion() {
  return (
    <Post
      title="3D Modeling Meets Fashion Consumers"
      subtitle="A new dimension of technology in fashion"
      date="2020-07-04"
      description="Taking a look at the introduction of 3D modeling to new parts of the fashion industry."
      cardImage="https://blog.aunyks.com/img/tech-culture/hanifa-show-cap.png"
    >
      <p>
        The digital age has caused the fashion industry to innovate alongside many others, but the COVID-19 pandemic has accelerated some of this innovation in ways that many have not expected.
        One of the innovations immediately visible to consumers is the use of 3D models for applications like fashion shows, garment and outfit preview, and apparel design.
        Let's take a look at this increasingly prevalent phenomenon.
    </p>
      <h2>Fashion Shows</h2>
      <figure className="my-5">
        <img className="w-full" src="/img/tech-culture/hanifa-virtual-show.gif"
          alt="An animated GIF of a white two-piece dress walking down a virtual runway." />
        <figcaption className="w-full lg:w-1/2 text-xs text-center mx-auto">Check out the actual post <a className="text-xs" target="_blank" href="https://www.instagram.com/p/CBok4KNHgbP">here</a>.</figcaption>
      </figure>
      <p>
        The world was met with awe when fashion brand <a target="_blank" href="https://hanifa.co/">Hanifa</a>, owned by designer Anifa Mvuemba, unveiled the Pink Label Congo collection via a fashion show streamed to Instagram Live.
      That's not where the magic is, though. Hanifa's fashion show featured 3D models of the new pieces, which were worn by invisible, virtual runway models. This was the first time
      a 100% virtual fashion show was displayed on such a grand scale, and it may be the precursor to a completely new style of fashion show for the future.
    </p>
      <p>
        The bulk of the design for this show was done in 3D fashion design software <a href="https://www.clo3d.com/">CLO3D</a>. CLO3D is industry-standard design software often used for low-cost prototyping. The use of the software
      in part to produce such an immersive virtual experience is something to take note of, and its use begs the question of whether similar experiences can be created with free 3D software like Blender.
    </p>
      <h2>Try-on / Preview</h2>
      <figure>
        <img className="w-full" src="/img/tech-culture/gap-dressingroom.gif"
          alt="A person with their phone places a virtual mannequin on the ground in front of her and proceeds to select items to comprise the mannequins outfit as it updates live.">
        </img>
      </figure>
      <p>
        Gap's <a target="_blank" href="https://www.gapinc.com/en-us/articles/2017/01/gap-tests-new-virtual-dressing-room">DressingRoom</a> app lets customers see outfits in real space using 3D models projected into real-world space via augmented reality. While this is no longer a new concept since it was released in 2017, it marked an
      important point in which a large apparel brand used such technology to appeal to customers. Using 3D models to preview pieces lets customers get an idea of what certain pieces would look like not only on themselves but also how the pieces would look when grouped with each other as outfits.
      We should expect 3D try-on and preview to become increasingly popular, especially as brands adjust to online-native versions of retail store concepts, like mannequins that can be replaced with virtual counterparts.
    </p>
      <p>
        DressingRoom was built by <a target="_blank" href="https://www.avametric.com/">Avametric</a>, where they leveraged Google's Tango platform to provide a snappy and responsive experience. It's likely that similar experiences can be made with more widely available technology like Apple's ARKit, so we should expect to see many more experiences similar to this in the near future. The ability to model 3D objects
      and view them in the physical world has a very wide range of applications, but fashion may be the <i>most</i> appealing to consumers.
    </p>
      <h2>Apparel Design</h2>
      <figure>
        <img className="w-1/2" src="/img/tech-culture/carlings-last-statement.gif"
          alt="An animated GIF in which the camera cyles between several filters, each of which project a new design on the subject's t-shirt.">
        </img>
      </figure>
      <p>
        The very early applications of augmented reality in apparel design has opened the door for large brands to experiment with more immersive designs.
      European fashion brand Carlings even released its <a target="_blank" href="https://carlings.com/en/p/atf-the-last-statement-t-shirt-white-top-t-shirt-unisex/7251037_F900">Last Statement</a> tee, which is
      compatible with a slew of Instagram filters available on the company's page. Some of these filters incorporate 3D models of the planet among other things, and every filter has a political theme, the most common of which is sustainability.
    </p>
      <p>
        AR effects available through Instagram and Snapchat filters make producing these experience an order of magnitude easier than other like building a standalone mobile app, as they give creators quick access to experiences that span multiple platforms and space that's already on peoples' phones.
        This means that creators can leverage these platforms to quickly and seamlessly provide all kinds of experiences that span all three dimensions of space.
    </p>
      <h2>In Conclusion</h2>
      <p>
        As the fashion industry adopts more cutting edge technology, we should expect to see more applications of 3D modeling and simulation to completely new areas. The sheer amount of creative freedom that such a technology provides should excite people from all sides of the industry.
    </p>
    </Post>
  )
}