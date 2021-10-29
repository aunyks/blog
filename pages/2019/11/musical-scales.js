import Head from 'next/head'
import Post from 'components/Post'
import Hint from 'components/Hint'

export default function MusicalScales() {
  return (
    <Post
      date="2019-11-22"
      title="Musical Scales"
      description="A brief, interactive lesson on scales in music theory."
      remark={
        <>
          Thanks for reading. Huge thanks to{' '}
          <a href="https://twitter.com/mikayla_orange">Mikayla Orange</a> for
          lending some of her time to check this post for correctness. Feel free
          to follow me on <a href="https://instagram.com/aunyks">IG</a> or{' '}
          <a href="https://twitter.com/aunyks">Twitter</a>.
        </>
      }>
      <Head>
        <script src="https://unpkg.com/tone@latest/build/Tone.js"></script>
        <script src="/js/keyboard.js"></script>
      </Head>
      <p>
        This is the second part in{' '}
        <a href="/2019/11/learning-music-theory">
          my series about music theory
        </a>
        . In the <a href="/2019/11/the-octave">previous post</a>, we covered
        musical notes and how consecutive notes are grouped in an octave. In
        this part, we'll cover scales.
      </p>
      <p>
        You'll find that there's an incredible amount of ways to group notes in
        music theory, but aside from an octave a scale is one of the most
        fundamental methods of grouping. Notes within a scale have beautiful
        musical relationships, and scales are the basis of concepts like chords
        and melodies.
      </p>
      <p className="disclaimer">
        Remember: You can hit the notes to play their sounds. If you're on
        iPhone, turn your ringer on to enable sound.
      </p>
      <h3>Note Distance</h3>
      <p>
        Note distance or, more commonly, "distance" is the distance in steps, or
        tones, between any two notes on a piano. Last time we covered the notes
        that comprise an octave. As a refresher, we have the 7 white keys and 5
        black keys that each play a unique note.
      </p>
      <div className="keyboard">
        <div className="note white c4">C</div>
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
      </div>
      <p>
        Each of these notes has a distance of one half-step, or one semitone,
        from the two notes beside it. So, C# is one half-step, or semitone, away
        from the C and D right next to it.
      </p>
      <div className="keyboard">
        <div className="note white c4 emphasized">C</div>
        <div className="note c-sh4 black emphasized">C#</div>
        <div className="note d4 white emphasized">D</div>
        <div className="note d-sh4 black">D#</div>
        <div className="note e4 white">E</div>
        <div className="note f4 white">F</div>
        <div className="note f-sh4 black">F#</div>
        <div className="note g4 white">G</div>
        <div className="note g-sh4 black">G#</div>
        <div className="note a4 white">A</div>
        <div className="note a-sh4 black">A#</div>
        <div className="note b4 white">B</div>
      </div>
      <p>E is one half-step away from the D# and F next to it.</p>
      <div className="keyboard">
        <div className="note white c4">C</div>
        <div className="note c-sh4 black">C#</div>
        <div className="note d4 white">D</div>
        <div className="note d-sh4 black emphasized">D#</div>
        <div className="note e4 white emphasized">E</div>
        <div className="note f4 white emphasized">F</div>
        <div className="note f-sh4 black">F#</div>
        <div className="note g4 white">G</div>
        <div className="note g-sh4 black">G#</div>
        <div className="note a4 white">A</div>
        <div className="note a-sh4 black">A#</div>
        <div className="note b4 white">B</div>
      </div>
      <p>A# is one half-step away from the A and B next to it.</p>
      <div className="keyboard">
        <div className="note white c4">C</div>
        <div className="note c-sh4 black">C#</div>
        <div className="note d4 white">D</div>
        <div className="note d-sh4 black">D#</div>
        <div className="note e4 white">E</div>
        <div className="note f4 white">F</div>
        <div className="note f-sh4 black">F#</div>
        <div className="note g4 white">G</div>
        <div className="note g-sh4 black">G#</div>
        <div className="note a4 white emphasized">A</div>
        <div className="note a-sh4 black emphasized">A#</div>
        <div className="note b4 white emphasized">B</div>
      </div>
      <p>Et cetera.</p>
      <p>
        And, one whole step is two half steps. One whole step is the same as one
        tone, therefore a tone is two semitones. With this being said, D# is a
        whole step away from C# and F.
      </p>
      <div className="keyboard">
        <div className="note white c4">C</div>
        <div className="note c-sh4 black emphasized">C#</div>
        <div className="note d4 white">D</div>
        <div className="note d-sh4 black emphasized">D#</div>
        <div className="note e4 white">E</div>
        <div className="note f4 white emphasized">F</div>
        <div className="note f-sh4 black">F#</div>
        <div className="note g4 white">G</div>
        <div className="note g-sh4 black">G#</div>
        <div className="note a4 white">A</div>
        <div className="note a-sh4 black">A#</div>
        <div className="note b4 white">B</div>
      </div>
      <p>G# is a whole step away from F# and A#.</p>
      <div className="keyboard">
        <div className="note white c4">C</div>
        <div className="note c-sh4 black">C#</div>
        <div className="note d4 white">D</div>
        <div className="note d-sh4 black">D#</div>
        <div className="note e4 white">E</div>
        <div className="note f4 white">F</div>
        <div className="note f-sh4 black emphasized">F#</div>
        <div className="note g4 white">G</div>
        <div className="note g-sh4 black emphasized">G#</div>
        <div className="note a4 white">A</div>
        <div className="note a-sh4 black emphasized">A#</div>
        <div className="note b4 white">B</div>
      </div>
      <p>D is a whole step away from C and E.</p>
      <div className="keyboard">
        <div className="note white c4 emphasized">C</div>
        <div className="note c-sh4 black">C#</div>
        <div className="note d4 white emphasized">D</div>
        <div className="note d-sh4 black">D#</div>
        <div className="note e4 white emphasized">E</div>
        <div className="note f4 white">F</div>
        <div className="note f-sh4 black">F#</div>
        <div className="note g4 white">G</div>
        <div className="note g-sh4 black">G#</div>
        <div className="note a4 white">A</div>
        <div className="note a-sh4 black">A#</div>
        <div className="note b4 white">B</div>
      </div>
      <p>
        Et cetera. Sometimes, you'll see people say things like D Sharp Sharp
        (meaning E), B Flat Flat (meaning A), or even C Flat (meaning B) or E
        Sharp (meaning F). This is because the sharps and flats{' '}
        <em>actually</em>
        &nbsp;indicate moving a half-step in one direction. So, two sharps
        indicate a whole step forwards, and two flats indicate a whole step
        backwards. Since "step" and "tone" can be used interchangeably, I'll be
        using "step" from now on. Note distances are more commonly referred to
        as intervals.
      </p>
      <h3>The Scale</h3>
      <p>
        A scale is a set of notes, called degrees in the scale, ordered by their
        pitch. Typically, notes in a scale have a type of musical cohesion where
        they just sound good together. Scales are typically identified by their
        root note, or tonic, and the sequence of steps from the tonic that leads
        to the other notes in the scale.
      </p>
      <p>
        Some of the most common scales in modern western music consist of 8
        notes. 7 of the 8 notes are unique, as the tonic note appears at the
        bottom of the scale <em>and again</em> an octave up at the top of the
        scale. One of the most common types of these scales is the major scale,
        which we'll cover in this post.
      </p>
      <h3>The Major Scale</h3>
      <p>
        A major scale is a group of notes that consists of a root, or tonic, and
        notes that follow the root in the following sequence: W-W-H-W-W-W-H,
        where W is a whole step and H is a half step. A specific major scale is
        named after its root / tonic, so the C major scale is a major scale with
        a C as the root / tonic.
      </p>
      <h4>C Major</h4>
      <p>
        A simple way to understand the major scale is to start on the first note
        in the conventional octave, C. The C major scale looks like this.
      </p>
      <div className="keyboard octave">
        <div className="note white c4 emphasized">C</div>
        <div className="note c-sh4 black">C#</div>
        <div className="note d4 white emphasized">D</div>
        <div className="note d-sh4 black">D#</div>
        <div className="note e4 white emphasized">E</div>
        <div className="note f4 white emphasized">F</div>
        <div className="note f-sh4 black">F#</div>
        <div className="note g4 white emphasized">G</div>
        <div className="note g-sh4 black">G#</div>
        <div className="note a4 white emphasized">A</div>
        <div className="note a-sh4 black">A#</div>
        <div className="note b4 white emphasized">B</div>
        <div className="note c5 white emphasized">C</div>
      </div>
      <p>
        Here, we start on C, because it's our tonic. Then, one whole step to the
        right is D. One whole step after D is E. One half step after E is F. One
        whole step after F is G. One whole step after G is A. One whole step
        after A is B, and one half step after B is the C in the next octave!
      </p>
      <p>
        With this, we follow the major scale form of W-W-H-W-W-W-H! And, a cool
        observation is that the C major scale is all of the white keys between
        any C and a C next to it.
      </p>
      <p>
        If you play the notes sequentially from left to right, you'll find that
        the notes sound pleasant together.
      </p>
      <h4>D# Major</h4>
      <p>D# major is a major scale with D# as the tonic. It looks like this.</p>
      <div className="keyboard ten">
        <div className="note d4 white">D</div>
        <div className="note d-sh4 black emphasized">D#</div>
        <div className="note e4 white">E</div>
        <div className="note f4 white emphasized">F</div>
        <div className="note f-sh4 black">F#</div>
        <div className="note g4 white emphasized">G</div>
        <div className="note g-sh4 black emphasized">G#</div>
        <div className="note a4 white">A</div>
        <div className="note a-sh4 black emphasized">A#</div>
        <div className="note b4 white">B</div>
        <div className="note c5 white emphasized">C</div>
        <div className="note c-sh5 black">C#</div>
        <div className="note d5 white emphasized">D</div>
        <div className="note d-sh5 black emphasized">D#</div>
        <div className="note e5 white">E</div>
      </div>
      <p>
        Where we start with D# and whole step to F. One whole step after F is G.
        One half step after G is G#. One whole step after G# is A#. One whole
        step after A# is C. A whole step after C is D. And, one half step after
        D is the D# in the next octave.
      </p>
      <p>Again, we followed the form W-W-H-W-W-W-H.</p>
      <h3>Minor Scales</h3>
      <p>
        There are three different types of minor scales: natural, melodic, and
        harmonic. For the sake of simplicity, we'll cover the natural minor. You
        can read about the other minor scales in the additional reading at the
        end of the post.
      </p>
      <p>
        Like the major scale, the natural minor scale is a sequence of 8 notes
        consisting of the tonic in addition to 7 notes in a sequence of steps in
        distance from the tonic. The minor scale follows the form W-H-W-W-H-W-W.
        Minor scales are also named after their tonic, like major scales.
      </p>
      <h3>C Natural Minor</h3>
      <p>The C Natural Minor scale looks like this.</p>
      <div className="keyboard octave">
        <div className="note white c4 emphasized">C</div>
        <div className="note c-sh4 black">C#</div>
        <div className="note d4 white emphasized">D</div>
        <div className="note d-sh4 black emphasized">D#</div>
        <div className="note e4 white">E</div>
        <div className="note f4 white emphasized">F</div>
        <div className="note f-sh4 black">F#</div>
        <div className="note g4 white emphasized">G</div>
        <div className="note g-sh4 black emphasized">G#</div>
        <div className="note a4 white">A</div>
        <div className="note a-sh4 black emphasized">A#</div>
        <div className="note b4 white">B</div>
        <div className="note c5 white emphasized">C</div>
      </div>
      <p>
        Where we start with C and move a whole step to the D. One half step
        after D is D#. One whole step after D# is F. One whole step after F is
        G. One half step after G is G#. One whole step after G# is A#. One whole
        step after A# is the C in the next octave.
      </p>
      <h3>D# Natural Minor</h3>
      <p>The D# Natural Minor looks like this.</p>
      <div className="keyboard ten">
        <div className="note d4 white">D</div>
        <div className="note d-sh4 black emphasized">D#</div>
        <div className="note e4 white">E</div>
        <div className="note f4 white emphasized">F</div>
        <div className="note f-sh4 black emphasized">F#</div>
        <div className="note g4 white">G</div>
        <div className="note g-sh4 black emphasized">G#</div>
        <div className="note a4 white">A</div>
        <div className="note a-sh4 black emphasized">A#</div>
        <div className="note b4 white emphasized">B</div>
        <div className="note c5 white">C</div>
        <div className="note c-sh5 black emphasized">C#</div>
        <div className="note d5 white">D</div>
        <div className="note d-sh5 black emphasized">D#</div>
        <div className="note e5 white">E</div>
      </div>
      <p>
        Where D# is the tonic, and F is one whole step after it. F# is one half
        step after F. G# is one whole step after F#. A# is one whole step after
        G#. B is one half step after A#. C# is one whole step after B, and D# is
        one whole step after C#.
      </p>
      <h3>Other Scales</h3>
      <p>
        While the major and minor scales are the most common scales, there are
        more than{' '}
        <a href="https://www.thejazzpianosite.com/jazz-piano-lessons/jazz-scales/how-many-scales-are-there/">
          24,000 possible scales in music
        </a>
        , and some scales are more common in certain genres, like{' '}
        <a href="https://pianoscales.org/blues.html">Blues</a> and{' '}
        <a href="https://pianoscales.org/jazz.html">Jazz</a> scales.
      </p>
      <h3>FAQs</h3>
      <h4>What are scale degrees again?</h4>
      <p>
        Degrees in a scale are just the notes that comprise the scale. So, all
        the white keys from C to the next C are degrees in the C Major scale. In
        all scales, the tonic is called the first degree, the second note is
        called the second degree, the third is the third degree, and so on.
      </p>
      <p>
        {' '}
        In most{' '}
        <Hint msg="The Major and Minor scales are 8 note scales.">
          8-note scales
        </Hint>
        , the 1st through the 7th degrees in the scale are unique, and the 8th
        is the same note as the first. Sometimes, you'll even hear people refer
        to things like the 9th or 12th. To find these, just keep walking up the
        steps in the scale from the 8th (so the 9th is the same note as the 2nd
        but on the next octave, etc).
      </p>
      <h4>Do major and minor scales sound different?</h4>
      <p>
        I'm assuming you're asking this, because you can't hear the difference
        between them. <em>Yes!</em> Major scales typically have a happy,
        cheerful sound to them, while minor scales typically have a sadder
        sound.
      </p>
      <h3>What's next?</h3>
      <p>
        In the next post, we'll cover <a href="/2019/12/key">key</a>.
      </p>
      <h3>Additional Reading</h3>
      <p>
        <a href="https://music.utk.edu/theorycomp/courses/murphy/documents/Major+MinorScales.pdf">
          Major and Minor Scales - Dr. Barbara Murphy
        </a>
      </p>
    </Post>
  )
}
