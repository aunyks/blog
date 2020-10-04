import Post from 'components/Post'
import Hint from 'components/Hint'

export default () => (
  <Post
    title="Making Serenity's Arrival"
    subtitle="A Short Music Video"
    description="Walking through the inspiration and process for making Serenity's Arrival."
    date="2020-10-04"
    cardImage="https://blog.aunyks.com/img/art-n-design/serenitys-arrival/dusk-render.jpg">
    <p>
      I approached <a target="_blank" href="https://art.aunyks.com/2020/serenitys-arrival">this project</a> in a way a bit different from previous ones. It was actually the audio
      that accompanies this piece that inspired me to make it.
      </p>
    <p>
      I was scrolling through TikTok when I stumbled upon a video that played the sound in the background. I was so mesmerized by the sound that I neither
      remember the video itself nor its content. I just remember quickly clicking the sound in hopes that the person who posted it to TikTok would have mentioned the original
      producer. Luckily they did, so I went to YouTube to find it.
      </p>
    <p>
      "imperial. [] by j^p^n" quickly came up in the suggestions as I went to type it in the search bar. I clicked <a target="_blank" href="https://www.youtube.com/watch?v=mrWjrTG3I8k">the first video to come up</a>. I was met with the same entrancing sound
      but this time accompanied by some captivating visuals from the <a target="_blank" href="https://www.imdb.com/title/tt0983213/">5 Centimeters Per Second movie</a>. I immediately knew that I wanted to make visuals for the song and that I wanted to feature
      landscape shots.
      </p>
    <p>
      I put off the project for some time, because I knew that the ideas I had in mind couldn't yet be brought to life with my current skill level. After some thought, I told myself to just try
      it out since I can always approach the project again when I have more skill. That, paired with the fact that I'm always looking for new projects to push the frontier of my skill level, was
      enough to get me going.
      </p>
    <p>
      So, I opened Blender and started by making a huge ocean.
      </p>
    <figure className="my-5">
      <img className="w-full" src="/img/art-n-design/serenitys-arrival/ocean.jpg"
        alt="The Blender viewport featuring the ocean mesh." />
      <figcaption className="text-sm text-center">Notice the ripples of the waves.</figcaption>
    </figure>
    <p>
      Unlike my last project, I finally got the waves to continuously loop so they look more natural. After messing with the water's material
      so that it had some reflectiveness.
      </p>
    <figure className="my-5">
      <img className="w-full" src="/img/art-n-design/serenitys-arrival/ocean-reflective.jpg"
        alt="The Blender viewport featuring the ocean mesh with reflective material applied." />
    </figure>
    <p>
      I decided to add a mountain to give the scene some depth.
      </p>
    <figure className="my-5">
      <img className="w-full" src="/img/art-n-design/serenitys-arrival/mountain.jpg"
        alt="The Blender viewport with ocean and mountain in view." />
    </figure>
    <p>
      Now, I just need it to add a sky and sun to fill the background. After messing around with color schemes for the scene, I actually decided to go with two schemes: one for day and another for dusk.
      My next step was to learn how to animate the camera movement to get different kinds of shots. The cool thing is that I found out how to do this without watching any tutorials.
      </p>
    <figure className="my-5">
      <img className="w-full" src="/img/art-n-design/serenitys-arrival/day.jpg"
        alt="A render preview of one of the day scenes." />
    </figure>
    <figure className="my-5">
      <img className="w-full" src="/img/art-n-design/serenitys-arrival/dusk.jpg"
        alt="A render preview of one of the dusk scenes." />
    </figure>
    <p>
      My first animated scene was a <a target="_blank" href="https://www.premiumbeat.com/blog/how-to-achieve-perfect-dolly-shot/">dolly shot</a> that moved the camera from the middle of the ocean toward the mountain. Once I'd finished that, I knew I needed shots from more perspectives to really bring the
        film together. But, I didn't want to make any more changes to <em>this specific</em> scene. With this in mind, I made use of Blender's <Hint msg="A Blender project can have several scenes. They can exist dependently or independently of each other.">multiple scene functionality</Hint> for
        the first time. After rendering each of my day and dusk scenes, my next step was putting it all together in post-production.
      </p>
    <p>
      I grabbed an MP3 copy of the song from the YouTube video and got to work. I opened the audio and video files in iMovie and tried my best to edit everything so that the video transitions lined up well with
      counts of the music. After some tweaking and crediting, it was done!
      </p>
    <figure className="mb-2">
      <video controls className="mx-auto w-full mb-2 lg:w-2/3">
        <source src="https://art.aunyks.com/assets/vid/serenitys-arrival.mp4" type="video/mp4" />
        Looks like your browser doesn't support embedded videos.
        </video>
      <figcaption className="text-sm text-center">The final product!</figcaption>
    </figure>
    <p>
      In the end, I learned more of Blender's Ocean Modifier, animation keyframing, and scene features. While the final result didn't quite bring my original idea to life, I was happy that I <a target="_blank" href="https://salman.io/blog/expectation/">overcame expectations</a> and reached satisfaction. I enjoy this song so that much
      that I'm certain I'll use it in a future project. May my skillset enable an even better piece in the future!
      </p>
    <h4>Tools Used</h4>
    <p>
      <ul>
        <li>
          <a href="https://www.blender.org/">Blender</a> - Building and rendering the scenes
        </li>
        <li>
          <a href="https://www.apple.com/imovie">iMovie</a> - Editing the audio and rendered video together to produce the final product
        </li>
      </ul>
    </p>
    <h4>Things Learned</h4>
    <p>
      <ul>
        <li>More details & how to loop Blender's Ocean Modifier</li>
        <li>Better keyframing, and how to keyframe camera position and orientation in Blender</li>
        <li>How to add and alternate between multiple scenes in a Blender project</li>
        <li>How to mix black video into iMovie tracks</li>
      </ul>
    </p>
  </Post>
)