import Head from 'next/head'
import Post from '../../../components/Post'

export default () => (
  <Post
    title="The Octave"
    date="2019-11-21"
    description="A brief, interactive lesson on octaves in music theory."
    cardImage="https://blog.aunyks.com/img/music/the-octave-card.png"
    remark={(
      <>
        Thanks for reading. Huge thanks to <a href="https://twitter.com/mikayla_orange">Mikayla Orange</a> for lending
          some of her time to check this post for correctness. Feel free to follow me on <a
          href="https://instagram.com/aunyks">IG</a> or <a href="https://twitter.com/aunyks">Twitter</a>.
      </>
    )}>
    <Head>
      <script src="https://unpkg.com/tone@latest/build/Tone.js"></script>
      <script src="/js/keyboard.js"></script>
    </Head>
    <p>
      This is the first part in <a href="/2019/11/learning-music-theory">my series about music theory</a>. In this
          part, we'll cover the octave.
        </p>
    <p className="disclaimer">
      Remember: You can hit the notes to play their sounds. If you're on iPhone, turn your ringer on to enable
      sound.
        </p>
    <h3 id="western-notes">Notes in Western Music</h3>
    <p>
      In western music, there are typically 12 unique musical notes that correspond with a sound. On a piano, this
      consists of 7 white keys: C,
      D, E, F, G, A, and B in addition to 5 black keys.
        </p>
    <div className="keyboard octave">
      <div className="note white c4">C</div>
      <div className="note white d4">D</div>
      <div className="note white e4">E</div>
      <div className="note white f4">F</div>
      <div className="note white g4">G</div>
      <div className="note white a4">A</div>
      <div className="note white b4">B</div>
    </div>
    <p>
      Each black key is placed between two white keys and
      therefore has two names. One of a black key's name is the name of the previous white key, paired with a #
      (called a sharp). The other name is the name of the next white key, paired with a b (called a
      flat). So, the black key between the C and D keys can be called C# (C Sharp) or Db (D flat). Sharp / flat
          notes are sometimes referred to as <a
        href="https://www.liveabout.com/accidental-definition-2701035">accidentals</a>, which is a concept that
          might not make much sense 'til later in the series.
        </p>
    <div className="keyboard">
      <div className="note white c4">C</div>
      <div className="note black c-sh4">C# / Db</div>
      <div className="note white d4">D</div>
      <div className="note black d-sh4">D# / Eb</div>
      <div className="note white e4">E</div>
      <div className="note white f4">F</div>
      <div className="note black f-sh4">F# / Gb</div>
      <div className="note white g4">G</div>
      <div className="note black g-sh4">G# / Ab</div>
      <div className="note white a4">A</div>
      <div className="note black a-sh4">A# / Bb</div>
      <div className="note white b4">B</div>
    </div>
    <p>
      For the sake of simplicity, I'll refer to black keys by one of their names at a time instead of both.
        </p>
    <h3>The Octave</h3>
    <p>
      Any sequence of 7 consecutive (touching) white keys are called an octave (pronounced "octiv"). This is because
      the 8th note in the
      sequence is the same note as the 1st note in the sequence. So, the next note after the B is another C!
        </p>
    <p>
      The two highlighted notes are both C's. They're an octave apart, so the C on the right has a higher
      pitch, but
      they're fundamentally the same note. As a matter of fact, if you're on a mobile device, try to press both keys
      simultaneously. You should be able to hear both notes, but they'll have a kind of cohesion that makes them
      sound the same.
        </p>
    <div className="keyboard octave">
      <div className="note white c4 emphasized">C</div>
      <div className="note c-sh4 black">C# / Db</div>
      <div className="note d4 white">D</div>
      <div className="note d-sh4 black">D# / Eb</div>
      <div className="note e4 white">E</div>
      <div className="note f4 white">F</div>
      <div className="note f-sh4 black">F# / Gb</div>
      <div className="note g4 white">G</div>
      <div className="note g-sh4 black">G# / Ab</div>
      <div className="note a4 white">A</div>
      <div className="note a-sh4 black">A# / Bb</div>
      <div className="note b4 white">B</div>
      <div className="note c5 white emphasized">C</div>
    </div>
    <p>
      These highlighted notes are all in the same octave.
        </p>
    <div className="keyboard octave">
      <div className="note white c4 emphasized">C</div>
      <div className="note black c-sh4 emphasized">C# / Db</div>
      <div className="note white d4 emphasized">D</div>
      <div className="note black d-sh4 emphasized">D# / Eb</div>
      <div className="note white e4 emphasized">E</div>
      <div className="note white f4 emphasized">F</div>
      <div className="note black f-sh4 emphasized">F# / Gb</div>
      <div className="note white g4 emphasized">G</div>
      <div className="note black g-sh4 emphasized">G# / Ab</div>
      <div className="note white a4 emphasized">A</div>
      <div className="note black a-sh4 emphasized">A# / Bb</div>
      <div className="note white b4 emphasized">B</div>
      <div className="note white c5">C</div>
    </div>
    <h3>FAQs</h3>
    <h4>Why does an octave start with C? Why not A?</h4>
    <p>
      The first note in an octave doesn't actually have to be a C. You can start your octave on any note, and all notes between the start and the next time the start note appears are in the same octave.
      For example, if I start my octave on an F, every note between this F and the next F is in the same octave.
    </p>
    <h4>How many octaves are there?</h4>
    <p>
      Technically, an infinite amount. Every musical note has a corresponding frequency of sound, and the frequency of some note is a multiple of the frequency of the same note in any other
      octave. So, technically the frequency can increase toward infinity (infinite octaves) or decrease toward 0.
          The limit for us is the <a href="http://www.cochlea.org/en/hear/human-auditory-range">range of frequencies
            that we can hear</a>.
    </p>
    <h4>Should I call a black key a sharp or flat?</h4>
    <p>
      They're identical, but what you call it depends on the key you're in. We'll talk about those in a later
      lesson. For now, they're interchangeable.
        </p>
    <h3>What's Next?</h3>
    <p>
      In the <a href="/2019/11/musical-scales">next post</a>, we'll cover musical scales.
        </p>
  </Post>
)