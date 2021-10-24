import Head from 'next/head'
import Post from 'components/Post'

export default function Key() {
  return (
    <Post
      title="Key"
      date="2019-12-14"
      description="A brief, interactive lesson on key in music theory."
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
          &nbsp;<a href="/2019/11/musical-scales">previous post</a>, we covered musical scales, namely the Major and
          Natural Minor scales. In this
          part, we'll cover key.
    </p>
      <p className="disclaimer">
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
        And here's the A (Natural) Minor Scale.
        </p>
      <div className="keyboard octave">
        <div className="note a3 white emphasized">A</div>
        <div className="note a-sh3 black">A#</div>
        <div className="note b3 white emphasized">B</div>
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
      </div>
      <p>
        And if we shift the above keyboard to the left a few keys we get...
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
        Woah! The C Major and A Minor scales both have all notes of the white keys in their scale. Does this mean that
        they're identical?
    </p>
      <p>
        Not necessarily. The notes of their degrees still differ. For example, the second degree of the A Minor scale
        is B, while the second degree of the C Major scale is D. Also, their tonics, or root notes, are different, which is important for this post.
    </p>
      <h3>Key</h3>
      <p>
        In most Western music, a sequence of notes like that of a melody often move between the notes in a scale. This is very useful information, as
        understanding the scale with which a piece is composed helps us better understand the piece. But, as we saw above, some scales share notes.
        So, how do we know which scale the piece is composed in if the melody's notes fit more than one scale?
    </p>
      <p>
        The answer is in the resolution. Take "Mary Had a Little Lamb", for example. The song's melody is as follows.
    </p>
      <img width="300"
        src="https://www.true-piano-lessons.com/images/xMaryCtab.jpg.jpg.pagespeed.ic.lSyAFBbdIC.jpg" />
      <p>
        Here, you can see that the song's melody consists of a group of white notes on a piano. We saw earlier that both C Major and
        A Natural Minor consist of white notes. To determine which between these two is the scale of the song, we need to find out which
        note the melody resolves, or finishes, on.
    </p>
      <p>
        Which sounds better? A resolution on A or C?
    </p>
      <div className="grid grid-cols-2 gap-2 mx-auto">
        <button className="melody" onClick={() => {
          const notes = ['E4', 'D4', 'D4', 'E4', 'D4', 'A3']
          window.playMelody(notes)
        }} id="resolutionPlayBtn">A</button>
        <button className="melody" onClick={() => {
          const notes = ['E4', 'D4', 'D4', 'E4', 'D4', 'C4']
          window.playMelody(notes)
        }} id="resolutionPlayBtn">C</button>
      </div>
      <p>
        You probably said C, since that's what the melody actually finishes on. Because resolving on C feels much more natural than resolving on A,
        we can say that C is the tonic of this scale.
    </p>
      <p>
        Starting over, we were able to determine that the song used either the C Major or A Natural Minor scale based on the group of notes used in the song.
        We noticed that the melody resolved on a C and not an A, though, so it must be using the C Major Scale.
    </p>
      <p>
        With this being said, we can also say that the song is in the key of C Major. Put simply, <i>Key = Scale + Tonic</i>,
      so we can find the key by first determining which scales have the song's notes. If only one scale has them, then the
      key of the song is the same as that scale. If there is more than one scale, we can find the key by determining which
      scale's tonic note the song resolves on.
    </p>
      <h3 id="finding-key">Finding the Key of a Song</h3>
      <p>
        Again, <strong>key is a scale plus a tonic</strong>. So, we can find the key that a song is in by first
          finding the scale. We need to ask ourselves what notes are being played throughout the song, then what scales
         consist of those notes.
    </p>
      <p>
        In the case of "Mary Had a Little Lamb", the notes in the song are on some of the white keys of a piano.
        This means that two possible scales for this song are A Natural Minor and C Major, since those two have notes from all
        of the white keys in their scale.
    </p>
      <p>
        Then, we need to listen to the song and determine when resolutions occur and on which note those resolutions
        take place. Once you've found that note, find out which one of the scales from earlier has that note as its
        tonic.
        The key of the song is named after that scale.
    </p>
      <p>
        As we can recall from earlier, "Mary Had a Little Lamb" resolves on a C. A C is the tonic of C Major and
          &nbsp;<em>not</em> A Natural Minor, so this song is in the key of C Major!
        </p>
      <h3>FAQs</h3>
      <h4>Why don't I always hear people say that the key of a song is in X Major?</h4>
      <p>
        When a key is in a major scale, people will typically leave out the "major" part when referring to it. So,
        when people say that a song is in the key of F, for example, they're saying that the key is in F Major.
        </p>
      <h4>Do major and minor keys have the same tonic?</h4>
      <p>
        Yes, just like how the E Major and E Minor scales, for example, have an E note as their first degree, keys in
        E Major and E Minor both have E as their tonic. Note that the other degrees in these two scales differ, though.
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
      })`}}></script>
    </Post>
  )
}