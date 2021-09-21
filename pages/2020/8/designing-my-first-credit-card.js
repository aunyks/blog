import {
  Suspense
} from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Post from 'components/Post'
import Hint from 'components/Hint'
import ThreeDFigure from 'components/3d/ThreeDFigure'
import OrbitControls from 'components/3d/controls/OrbitControls'

function Card() {
  const { scene } = useLoader(GLTFLoader, '/3d/models/true-potential-card-v1.glb')
  return (
    <primitive rotation={[-Math.PI / 2, Math.PI / 2, 0]} object={scene} />
  )
}

export default function DesigningMyFirstCreditCard() {
  return (
    <Post
      title="Designing My First Credit Card"
      subtitle="A Fun Project"
      description="Recounting the inspiration and process for designing my first credit card."
      date="2020-08-21"
      cardImage="https://blog.aunyks.com/img/art-n-design/true-potential-card-rear-slant.jpg">
      <p>
        I was scrolling through Twitter when I saw someone had interacted with one of <a href="https://twitter.com/lehrjulian">Julian Lehr's</a> tweets.
        I'd never seen his account on my timeline before, so I visited his profile. One of his most recent tweets featured some credit cards that he found to be well designed.
      </p>
      <div className="my-6" dangerouslySetInnerHTML={{
        __html: `<blockquote class="twitter-tweet"><p lang="en" dir="ltr">List of well-designed credit cards:<br><br>• <a href="https://twitter.com/n26?ref_src=twsrc%5Etfw">@n26</a> Transparent <br>• <a href="https://twitter.com/pointcardhq?ref_src=twsrc%5Etfw">@pointcardhq</a> Runway Yellow<br>• <a href="https://twitter.com/CashApp?ref_src=twsrc%5Etfw">@CashApp</a> Glow in the Dark<br>• <a href="https://twitter.com/AppleCard?ref_src=twsrc%5Etfw">@AppleCard</a> Titanium<br><br>(I&#39;m writing a blog post about card design - what other companies should I look at?) <a href="https://t.co/neU8au0jMZ">pic.twitter.com/neU8au0jMZ</a></p>&mdash; Julian Lehr (@lehrjulian) <a href="https://twitter.com/lehrjulian/status/1295024066869567488?ref_src=twsrc%5Etfw">August 16, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`
      }} />
      <p>
        <a href="https://twitter.com/aunyks/status/1292514140616105985">3D modeling has piqued my interest lately</a>, so I decided to use his tweet as inspiration and challenge myself with a design project.
      </p>
      <p>
        With this in mind, I opened up <a href="https://www.blender.org/">Blender</a> and got to transforming the default cube into the shape of a credit card. I'd just learned
        how to round corners and edges, so this part was relatively straightforward. The novelty in this project came primarily from the process of <a href="https://en.wikipedia.org/wiki/Texture_mapping">texturing</a> the card and actually putting a design into the card, since
        the default all gray look wasn't at all satisfactory.
      </p>
      <p>
        To start texturing the card with the design I had in mind, I needed to export the card's <Hint msg="A UV map is like a net from high school geometry. It's a flat representation of a 3D object, and it's used by artists and designers to add textures to 3D models.">UV Map</Hint> from Blender. I had no idea how to do that beforehand, but luckily there's a sea of
        tutorials related to this on YouTube. I used <a href="https://www.youtube.com/watch?v=rng7AYfJk4Q">BornCG's excellent tutorial</a> on the topic, and, while I ran into some issues with my map not scaling and formatting properly, I got it to export somewhat quickly.
      </p>
      <p>
        The next step was to actually design the card. I didn't think <a href="https://gimp.org">GIMP</a> was the best tool for a job like this, and I've always had a fascination with <a href="https://figma.com">Figma</a> despite <a href="https://twitter.com/aunyks/status/1284144578187063296">not knowing how to use it</a>,
        so I used this project as a reason to not only practice my overall design skills but also get familiar with one of today's most popular design tools.
      </p>
      <figure className="my-2">
        <img alt="The front of the card." src="/img/art-n-design/true-potential-card-front.jpg" />
        <figcaption className="text-xs text-center"></figcaption>
      </figure>
      <p>
        Importing the map into Figma was as simple as a drag and drop, since I most often use the desktop client. I decided to go with a card lacking a <a href="https://en.wikipedia.org/wiki/Smart_card">chip</a> so
        that I had less constraints on the front of the card. This gave me more space to feature realistic black lightning bolts. The real challenge in the design came from deciding what to put on the rear.
      </p>
      <p>
        If you look at any payment card in your wallet, it probably has a lot of small text on the back that you previously didn't notice. Phone numbers, web links, and random disclaimers and notices are littered on millions of payment cards. They provide lots of visual noise and, in many cases, visual balance that we often take for granted.
      </p>
      <p>
        I didn't feel like adding these artifacts not only because I didn't exactly know what placeholder text to use but also because I wanted to give myself more creative freedom to explore. With this being said, I also need to consider what information or artifacts we all expect to be on the back of a payment card. The mag stripe, credit card number, security code, and expiration date are the first of which that come to mind.
      </p>
      <figure className="my-2">
        <img alt="The back of the card." src="/img/art-n-design/true-potential-card-rear.jpg" />
        <figcaption className="text-xs text-center"></figcaption>
      </figure>
      <p>
        Without getting into too much detail, I decided to group the essential payment information close to each other since they're often needed at the same time. Because of its exceptional length, I gave the credit card number more size to increase visibility when reading it. I also chose to use a vertical partition to separate it from the expiration date and security code to help prevent a reader from getting overwhelmed with numbers. The vertical stacking of parts of the credit card number allowed me to conserve more space when keeping the group to the left of the card.
      </p>
      <p>
        The magstripe was pretty simple in my opinion. I just made it my solid yellow color and put a lightning bolt toward the left side of the card to help make it my own.
      </p>
      <p>
        The right side of the card had a lot of open space that needed to be filled for some balance. Frankly, I had no idea what to put here, so I decided to get creative and put random information in the space like the title of the project, the languages I speak or am learning at the time, and a random phone number with an Atlanta area code. To round it all off, I put my domain in the bottom corner as a sort of signature.
      </p>
      <figure className="my-2">
        <img alt="The back of the card, but the card is oriented with the right side up higher than the left side for visual appeal." src="/img/art-n-design/true-potential-card-rear-slant.jpg" />
        <figcaption className="text-xs text-center"></figcaption>
      </figure>
      <p>
        The next step was to export this newly textured map and apply it in 3D to the card in Blender. This was also somewhat straightforward, since I just needed to import the new map and connect some nodes in the material editor graph. The card was essentially finished, so now I just needed to capture some photos of it.
        I'd learned from <a href="https://twitter.com/aunyks/status/1293201724774244352">my first Blender 3D project</a> a week earlier that using lighting and camera work to design nice scenes can get really tricky really quickly. But, that prior experience paired inspiration from the shots in Julian's tweet gave me the necessary skills to get some decent photos. At this point, I was pretty much finished.
      </p>
      <div className="my-6" dangerouslySetInnerHTML={{
        __html: `<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Here’s my custom credit card concept:<br><br>“True Potential Card v1”<a href="https://t.co/r65UfmeMpS">https://t.co/r65UfmeMpS</a> <a href="https://t.co/wHogc3nY4A">pic.twitter.com/wHogc3nY4A</a></p>&mdash; Nash (刘光瑞） (@aunyks) <a href="https://twitter.com/aunyks/status/1295883721988546561?ref_src=twsrc%5Etfw">August 19, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`
      }} />
      <p>
        Overall, it was a fun project, and I hope to try so many more in the future to get really good at stuff like this. If you want to play with the card yourself and get an up close view, check it out below.
      </p>
      <ThreeDFigure caption={(
        <figcaption className="text-xs text-center mx-auto">
          Drag to rotate the card.
        </figcaption>
      )}>
        <Suspense fallback={null}>
          <Card />
        </Suspense>
        <ambientLight intensity={1} />
        <OrbitControls cameraDistance={1.5} />
      </ThreeDFigure>
      <h4>Tools Used</h4>
      <ul>
        <li>
          <a href="https://www.blender.org/">Blender</a> - Modeling the card, exporting/importing its UV map, capturing photos, and exporting the card
        </li>
        <li>
          <a href="https://www.figma.com/">Figma</a> - Texturing the card and actually applying the design
        </li>
        <li>
          <a href="https://threejs.org/">Three.js</a> - Rendering the card in the browser
        </li>
      </ul>
      <h4>Things Learned</h4>
      <ul>
        <li>How to bevel and unwrap basic objects in Blender</li>
        <li>How to export/import UV maps in Blender</li>
        <li>Vector operations, layering, and methods of grouping in Figma</li>
        <li>Basics of user-centric design</li>
      </ul>
    </Post>
  )
}