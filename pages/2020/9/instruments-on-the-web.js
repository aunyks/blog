import Post from 'components/Post'
import Hint from 'components/Hint'

export default function InstrumentsOnWeb() {
  return (
    <Post
      title="Instruments On The Web"
      description="Quickly covering my Polysynth project and the WebMIDI API."
      date="2020-09-13">
      <p>
        Recently, I remade my <a href="https://music.aunyks.com/polysynth">Polysynth</a> project so that musicians can connect a <a href="https://www.midi.org/">MIDI</a> conroller to it and jam. It uses the WebMIDI API and <a href="https://tonejs.github.io/">Tone.js</a> to provide a
        web-based polyphonic synthesizer. Ever since I'd learned of the WebMIDI API, something like this has always been an idea of mine.
      </p>
      <div dangerouslySetInnerHTML={{ __html: '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Here’s a demo featuring my creaky controller if you wanna hear it <a href="https://t.co/9vQcx6n6YL">pic.twitter.com/9vQcx6n6YL</a></p>&mdash; Nash (刘光瑞） (@aunyks) <a href="https://twitter.com/aunyks/status/1305207514405847040?ref_src=twsrc%5Etfw">September 13, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>' }} />
      <p>
        Quickly, the WebMIDI API is a set of interfaces provided by the browser that lets web pages interact with MIDI devices. This lets web developers build apps that work
        with instruments through a protocol older than the web itself.
      </p>
      <div dangerouslySetInnerHTML={{ __html: '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">More specifically, MIDI (Musical Instrument Digital Interface) was introduced before HTTP</p>&mdash; Nash (刘光瑞） (@aunyks) <a href="https://twitter.com/aunyks/status/1174001132106125312?ref_src=twsrc%5Etfw">September 17, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>' }} />
      <p>
        Bringing this functionality into the project was made much simpler thanks to <a href="https://twitter.com/notwaldorf">Monica's</a> <a href="https://webmidi-examples.glitch.me/">WebMIDI examples</a>. The bulk of my development effort actually came from converting the logic to work more intuitively with <a href="https://nextjs.org">Next.js</a>.
    </p>
      <p>
        But, MIDI controllers are just that: controllers. In the future, I may choose to make some kind of visualizer or who-knows-what. This was a day project, but I've learned so much in such a short period of time that it's inspired me to try taking on larger projects. What about a free web-based <a href="">DAW</a>? How about a
        looping tool? The fact that the web can make this software free, cross-platform, and not require any downloading opens up so many opportunities. <em>Here's to more instruments on the web.</em>
      </p>
    </Post>
  )
}