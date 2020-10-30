import Post from 'components/Post'
import Hint from 'components/Hint'

export default () => (
  <Post
    title="Music is a Language"
    description="Music is a language that all of us understand and most of us speak."
    date="2020-10-30">
    <p>
      Music makes us feel. It makes us think, Music is a tool we use to communicate across
      time and space, and it is thus a language. We speak it by playing <Hint msg="Your voice is an instrument, in addition to other non-vocal instruments.">an instrument</Hint>,
      and we write it through sheet music.
    </p>
    <p>
      It has its own dialects in the form of genre, but we all understand its core structure. Its alphabet consists of notes, and
      its linguistic studies are music theory, music history, and music trends.
    </p>
    <p>
      Music is one of the few universal languages we have, and it's one of the longest living and most beautiful to exist.
    </p>
  </Post>
)