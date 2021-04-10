import NotesPost from 'components/NotesPost'
import CodeBlock from 'components/CodeBlock'
import CodeSnippet from 'components/CodeSnippet'
import Hint from 'components/Hint'

export default function FFmpegNotes() {
  return (
    <NotesPost
      title="FFmpeg"
      description=""
      hasCodeSnippet
    >
      <style jsx>{`
        li {
          list-style-type: disc;
          margin-left: 1rem;
        }

        .snippet {
          margin-bottom: 1.5em;
        }
      `}</style>
      <p>
        FFmpeg commands I find on the web look insanely confusing even for seemingly
        simple operations. Here's some stuff I find myself using every now and then.
      </p>
      <h2>Commands</h2>
      <div className="snippet">
        <h3>Convert video file format</h3>
        <p>
          This converts a MOV file to MP4, but it should be able to be modified
          to do any kind of video conversion as long as you know the video codecs for them.
      </p>
        <CodeBlock lang="shell-session" noButton showCodeByDefault>{`
ffmpeg \\ 
\t-i my-video.mov \\ # The input file
\t-vcodec h264 \\ # Output video codec. I think this is part of the mp4 stuff so just keep it unless it's broken
\t-acodec aac \\  # Output audio codec. If the output has no audio, try mp3, mp2 or 'copy'
\t-pix_fmt yuv420p \\ # Honestly I just toss this in cuz it helps sometimes. Feel free to remove
\tmy-video.mp4 # Output file
`}</CodeBlock>
      </div>
      <div className="snippet">
        <h3>Change Frame Rate</h3>
        <p>
          This changes the frame rate of the input video. If the target rate is lower than source rate, it removes some frames.
        If greater, it <em>probably</em> duplicates some frames: I haven't tried it for that case before.
      </p>
        <CodeBlock lang="shell-session" noButton showCodeByDefault>{`
ffmpeg \\ 
\t-i my-video.mp4 \\ # The input file
\t-filter:v fps=30 \\ # The output frame rate
\tmy-new-file.mp4 # The output file
`}</CodeBlock>
      </div>
      <div className="snippet">
        <h3>Apply a LUT Cube / 3D LUT to a Video</h3>
        <p>
          This applies a <a href="https://en.wikipedia.org/wiki/3D_lookup_table" target="_blank">3D Color Lookup Table</a> to a video.
      </p>
        <CodeBlock lang="shell-session" noButton showCodeByDefault>{`
ffmpeg \\ 
\t-i my-video.mp4 \\ # The input file
\t-vf lut3d="my-lut.cube" \\ # The LUT Cube file path
\t-pix_fmt yuv420p \\ # This just helps oftentimes
\t-c:a copy output \\ # This is probably just copying over random details from the source for the target
\tmy-new-file.mp4 # The output file
`}</CodeBlock>
      </div>
      <div className="snippet">
        <h3>Convert M4A Audio to WAV</h3>
        <CodeBlock lang="shell-session" noButton showCodeByDefault>{`
ffmpeg \\ 
\t-i input-file.m4a \\ 
\toutput-file.wav
`}</CodeBlock>
      </div>
      <div className="snippet">
        <h3>Convert Image Sequence to Video</h3>
        <CodeBlock lang="shell-session" noButton showCodeByDefault>{`
ffmpeg \\ 
\t-r 24 \\ # Output frame rate (fps)
\t-s 1920x1080 \\ # Output screen size (width x height) in pixels
\t-i my_sequence.%04d.jpg \\ # The input sequence title. Use %0n where n is the number of digits in each image title
\t-vcodec libx264 \\ # Video codec. Keep this or use h264 for mp4 output
\t-crf 25 \\ # Output video quality. Try to keep between 15 and 25 but feel free to experiment
\t-pix_fmt yuv420p \\ # The pixel format. Keep this as is unless it's breaking something
\tmy_video.mp4
`}</CodeBlock>
      </div>
    </NotesPost>
  )
}