import Head from 'next/head'
import Post from 'components/Post'

export default function ChordsP1() {
  return (
    <Post
      title="Chords"
      subtitle="Part 1"
      date="2020-07-02"
      description="A brief, interactive introduction to chords in music theory."
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
        <script
          src="https://unpkg.com/tone@latest/build/Tone.js"
          async></script>
        <script src="/js/keyboard.js" async></script>
      </Head>
      <p>
        This is the fourth part in{' '}
        <a href="/2019/11/learning-music-theory">
          my series about music theory
        </a>
        . In the <a href="/2019/12/key">previous post</a>, we covered key. In
        this part, we'll start covering chords.
      </p>
      <p>
        Remember: You can hit the notes to play their sounds. If you're on
        iPhone, turn your ringer on to enable sound.
      </p>
      <h2>A Refresher</h2>
      <p>
        Any two musical notes have perceivable distances between them. These
        distances are called intervals and are measured in steps or tones. A
        sequence of notes with a pattern of distances between them is a scale.
        For example, major scales start on a root note, and susbsequent notes
        follow the pattern W-W-H-W-W-W-H. More on that{' '}
        <a href="/2019/11/musical-scales">here</a>.
      </p>
      <h2>What's a Chord?</h2>
      <p>
        A musical chord is a set of notes plaid simultaneously. Chords consist
        of a root note followed by at least one more note. Notes that comprise a
        chord are sometimes referred to as <i>members</i> of the chord. Some of
        the most common chords you hear contain three notes
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
      <h2>Additional Reading</h2>
      <p>
        <a href="https://en.wikipedia.org/wiki/Chord_letters">Chord Letters</a>
      </p>
    </Post>
  )
}
