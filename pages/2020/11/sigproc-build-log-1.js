import Post from 'components/Post'
import Hint from 'components/Hint'

export default function SigProcBuildLog1() {
  return (
    <Post
      title="SigProc Build Log: 1"
      description="On the new digital signal processing I'm building"
      date="2020-11-18">
      <p>
        The first in <a href="">my build log</a> for my new DSP system. Here
        I've designed two blocks: <code>RawIQToNumber</code> and{' '}
        <code>ValueToString</code>. <code>RawIQToNumber</code> is meant to be
        early in the processing pipeline. Sitting right behind an I/Q source
        like a file or stream, this block accepts I/Q data encoded as raw bytes
        as input and outputs an array of arrays containing individual I/Q
        components. <code>ValueToString</code> converts whatever is given as
        input to a string for output. I intend to use this for debugging, but
        others may have creative uses for it in the future.
      </p>
      <p>
        Next, I want to build a demodulation block so I can build a pipeline
        with <a href="">GQRX</a> as the source and get some audio out. It looks
        like <a href="">node-speaker</a> should help streamline this task as
        well.
      </p>
    </Post>
  )
}
