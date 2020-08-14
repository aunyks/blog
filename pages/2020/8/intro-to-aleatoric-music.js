import Post from 'components/Post'
import IGPost from 'components/IGPost'

export default () => (
  <Post
    title="An Intro to Aleatoric Music"
    description="Chance-based music"
    date="2020-08-13">
    <p>
      Every now and then, I experiment with making music by giving a computer a <a href="/2019/11/musical-scales">scale</a> to work with for my melody so that I can manually produce accompanying sounds. These ideas came to me as a result of my learning how cohesive certain notes in a scale always seem to be.
      I used a JavaScript library called <a href="https://scribbletune.com/">Scribbletune</a> to generate the sounds and decided to look deeper into its functionality to see how creative I could get.
    </p>
    <figure className="my-5">
      <img className="w-full" src="/img/music/aleatoric-proj-1.jpg"
        alt="A screenshot of the Instagram post about my first computer-generated melody project." />
      <figcaption className="w-full lg:w-1/2 text-xs text-center mx-auto">Actual post <a target="_blank" href="https://www.instagram.com/p/B4z7RkdBXtf/">here</a>.</figcaption>
    </figure>
    <p>
      I discovered that it lets us declare a track such that it "shuffles". In this context, shuffling means that the sequence of notes played in the track is randomized and doesn't follow a predefined pattern. When listening to music generated with this in mind,
      it first struck me as organized noise. But, the fact that the notes were kept within a scale rather than being completely random gave the music some hints of structure.
    </p>
    <p>
      I wondered if I could add some more human aspects to the music to make it sound more natural, so I had it export to a <a href="https://en.wikipedia.org/wiki/MIDI">MIDI</a> file so
      that I could import the sound into my <a href="https://en.wikipedia.org/wiki/Digital_audio_workstation">DAW</a> and add some supporting tracks. Upon doing so, I added a very simple drum line and it immediately sounded more natural.
    </p>
    <figure className="my-5">
      <img className="w-full" src="/img/music/aleatoric-proj-2.jpg"
        alt="A screenshot of the Instagram post about my second computer-generated melody project." />
      <figcaption className="w-full lg:w-1/2 text-xs text-center mx-auto">Actual post <a target="_blank" href="https://www.instagram.com/p/B40qn-PBlAS/">here</a>.</figcaption>
    </figure>
    <h2>A-lee-uh-tor-ic</h2>
    <p>
      The interesting thing about this music is that the melodies were generated mostly by the computer. And, it did so randomly, which means that each melody it generated was somewhat unique and almost entirely up to chance.
      Music that's generated in some part by chance is called <a href="https://en.wikipedia.org/wiki/Aleatoric_music">Aleatoric music</a>.
    </p>
    <p>
      Funnily enough, I didn't think there was a term for this until I saw <a href="https://www.tiktok.com/@juanteachesmusic/video/6852699952301231365">this TikTok</a>. Since then, I've been researching the history of this style of composition, and it has relatively deep roots.
      For a long time, humans completely decided the chance component of aleatoric music, but I wonder how far we can go if we let machines decide them from now on.
    </p>
  </Post>
)