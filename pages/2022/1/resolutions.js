import Post from 'components/Post'
import Hint from 'components/Hint'

export default function Resolutions() {
  return (
    <Post
      title="2022 Resolutions"
      description="Review my resolutions for the year."
      date="2022-01-05">
      <p>
        I've been{' '}
        <a
          href="https://twitter.com/aunyks/status/1080146397805117440?s=20"
          target="_blank">
          tracking my yearly resolutions since 2018 now
        </a>
        , and 2022 is no different. It's time for another list of goals I want
        to reach for the year. Some resolutions may{' '}
        <Hint msg="The message string is UTF-8-encoded including carriage returns and line feeds (CRLF) and hashed with SHA-256.">
          be hashed
        </Hint>{' '}
        for now, but I'll publish them if I reach the goal. You'll be able to
        verify that the string matches the hash once I publish it so that you're
        sure I'm telling the truth.
      </p>
      <ol>
        <li id="1">Make at least 2 video games</li>
        <li id="2">
          Learn at least one <em>whole</em> song on the piano or guitar
        </li>
        <li id="3">
          Take and edit at least 24 RAW photos. I got an inexpensive little
          camera that shoots RAW so I can practice editing
        </li>
        <li id="4">Write at least one article each month</li>
        <li id="5">
          Be able to watch and understand an entire news segment in French and
          Mandarin without subtitles
        </li>
        <li id="6">Average at least 9 hours of sleep throughout the year</li>
        <li id="7">
          e4a8c807feffc0a59a6ae3b35035954747bb190e8641cae471a34776e7918dfe
        </li>
        <li id="8">Make and publish at least 12 3D renders</li>
        <li id="9">
          Design a plasmid and have its genes expressed in a living organism
        </li>
        <li id="10">Get some professional photos taken</li>
      </ol>
    </Post>
  )
}
