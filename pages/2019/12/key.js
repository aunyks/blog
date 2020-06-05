import Head from 'next/head'
import Post from '../../../components/Post'

export default () => (
  <Post
    title="Key"
    date="2019-12-14"
    description="A brief, interactive lesson on key in music theory."
    cardImage="https://blog.aunyks.com/img/music/key-card.png"
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
      This is the third part in <a href="/2019/11/learning-music-theory">my series about music theory</a>. In the
          <a href="/2019/11/musical-scales">previous post</a>, we covered musical scales, namely the Major and
          Natural Minor scales. In this
          part, we'll cover key.
        </p>
    <p class="disclaimer">
      Remember: You can hit the notes to play their sounds. If you're on iPhone, turn your ringer on to enable
      sound.
        </p>
    <h3>Scales Share Notes</h3>
    <p>
      Recall that a scale is no more than a group of notes within the same octave. The notes, or degrees, in a scale
      are typically found by starting at the root note (often called the tonic) and moving along a sequence of whole
      and half steps.
        </p>
    <p>
      An interesting phenomenon related to scales is that the notes in their degrees aren't unique to the scale. For
      example, here's the C Major scale.
        </p>
    <div class="keyboard octave">
      <div class="note white c4 emphasized">C</div>
      <div class="note c-sh4 black">C#</div>
      <div class="note d4 white emphasized">D</div>
      <div class="note d-sh4 black">D#</div>
      <div class="note e4 white emphasized">E</div>
      <div class="note f4 white emphasized">F</div>
      <div class="note f-sh4 black">F#</div>
      <div class="note g4 white emphasized">G</div>
      <div class="note g-sh4 black">G#</div>
      <div class="note a4 white emphasized">A</div>
      <div class="note a-sh4 black">A#</div>
      <div class="note b4 white emphasized">B</div>
      <div class="note c5 white emphasized">C</div>
    </div>
    <p>
      And here's the A (Natural) Minor Scale.
        </p>
    <div class="keyboard octave">
      <div class="note a3 white emphasized">A</div>
      <div class="note a-sh3 black">A#</div>
      <div class="note b3 white emphasized">B</div>
      <div class="note white c4 emphasized">C</div>
      <div class="note c-sh4 black">C#</div>
      <div class="note d4 white emphasized">D</div>
      <div class="note d-sh4 black">D#</div>
      <div class="note e4 white emphasized">E</div>
      <div class="note f4 white emphasized">F</div>
      <div class="note f-sh4 black">F#</div>
      <div class="note g4 white emphasized">G</div>
      <div class="note g-sh4 black">G#</div>
      <div class="note a4 white emphasized">A</div>
    </div>
    <p>
      And if we shift the above keyboard to the left a few keys we get...
        </p>
    <div class="keyboard octave">
      <div class="note white c4 emphasized">C</div>
      <div class="note c-sh4 black">C#</div>
      <div class="note d4 white emphasized">D</div>
      <div class="note d-sh4 black">D#</div>
      <div class="note e4 white emphasized">E</div>
      <div class="note f4 white emphasized">F</div>
      <div class="note f-sh4 black">F#</div>
      <div class="note g4 white emphasized">G</div>
      <div class="note g-sh4 black">G#</div>
      <div class="note a4 white emphasized">A</div>
      <div class="note a-sh4 black">A#</div>
      <div class="note b4 white emphasized">B</div>
      <div class="note c5 white emphasized">C</div>
    </div>
    <p>
      Woah! The C Major and A Minor scales both have all notes of the white keys in their scale. Does this mean that
      they're identical?
        </p>
    <p>
      Not necessarily. The notes of their degrees still differ. For example, the second degree of the A Minor scale
      is B, while the second degree of the C Major scale is D.
        </p>
    <h3>Key</h3>
    <p>
      In most Western music, a sequence of notes like that of a melody or entire song typically starts from and
      returns to the tonic of a scale. If this is the case, the sequence is known to be in the key of the scale of
      which that note is the tonic. For example, the song "Mary Had a Little Lamb" is often played in the key of C
      Major.
        </p>
    <p>
      This is because the melody of the song uses notes from the C Major Scale and feels resolved or closed when the
      C note is played.
        </p>
    <img width="300"
      src="https://www.true-piano-lessons.com/images/xMaryCtab.jpg.jpg.pagespeed.ic.lSyAFBbdIC.jpg" />
    <p>
      Here, you can see that "his fleece was white as snow" ends on a C and sounds like this.
        </p>
    <button class="centered melody" onClick={() => {
      const notes = ['E4', 'D4', 'D4', 'E4', 'D4', 'C4']
      window.playMelody(notes)
    }} id="resolutionPlayBtn">Resolved Melody</button>
    <p>
      The melody felt finished, or resolved, on that C note. To be sure of this, let's remove that last C and see
      how the melody sounds.
        </p>
    <button class="centered melody" onClick={() => {
      const notes = ['E4', 'D4', 'D4', 'E4', 'D4']
      window.playMelody(notes)
    }} id="unresolutionPlayBtn">Unresolved Melody</button>
    <p>
      It's a bit unsettling, right? You know that there's a note that would provide a satisfying finish to the above
      melody, but it's just not there.
        </p>
    <p>
      That note is the tonic, or C in this case.
        </p>
    <h3 id="finding-key">Finding the Key of a Song</h3>
    <p>
      Put simply, <strong>key is a scale plus a tonic</strong>. So, we can find the key that a song is in by first
          finding the scale. We need to ask ourselves what notes are being played throughout the song, then what scales
          encapsulate those notes.
        </p>
    <p>
      In the case of "Mary Had a Little Lamb", the notes in the song are on some of the white keys of a piano.
      This means that two possible scales for this song are A Natural Minor and C Major, since those two have all
      white keys in their scale.
        </p>
    <p>
      Then, we need to listen to the song and determine when resolutions occur and on which note those resolutions
      take place. Once you've found that note, find out which one of the scales from earlier has that note as its
      tonic.
      The key of the song is named after that scale.
        </p>
    <p>
      As we can recall from earlier, "Mary Had a Little Lamb" resolves on a C. A C is the tonic of C Major and
          <em>not</em> A Natural Minor, so this song is in the key of C Major!
        </p>
    <h3>FAQs</h3>
    <h4>Why don't I always hear people say that the key of a song is in X Major?</h4>
    <p>
      When a key is in a major scale, people will typically leave out the "major" part when referring to it. So,
      when people say that a song is in the key of A, for example, they're saying that the key is in A Major.
        </p>
    <h4>Do major and minor keys have the same tonic?</h4>
    <p>
      Yes, just like how the E Major and E Minor scales, for example, have an E note as their first degree, keys in
      E Major and E Minor both have E as their tonic.
        </p>
    <h3>What's next?</h3>
    <p>
      In the next post, we'll cover chords.
        </p>
    <h3>Additional Resources</h3>
    <p>
      <a href="https://www.youtube.com/watch?v=2woyzpFKTK0">What is a key? - Dave Conservatoire</a> (YouTube)
          <br />
    </p>
    <script dangerouslySetInnerHTML={{
      __html: `document.getElementById('resolutionPlayBtn').addEventListener('click', () => {
        const notes = ['E4', 'D4', 'D4', 'E4', 'D4', 'C4']
        playMelody(notes)
      })
      document.getElementById('unresolutionPlayBtn').addEventListener('click', () => {
        const notes = ['E4', 'D4', 'D4', 'E4', 'D4']
        playMelody(notes)
      })`}}></script>
  </Post>
)