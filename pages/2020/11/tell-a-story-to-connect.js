import Post from 'components/Post'
import Hint from 'components/Hint'

export default function TellAStoryToConnect() {
  return (
    <Post
      title="Tell a Story To Connect"
      subtitle="On the Importance of Storytelling"
      description="Covering the relevance of storytelling and common frameworks for telling stories."
      date="2020-11-11">
      <p>
        Storytelling is one of the best skills someone can have. To tell a
        moving story is to connect with an audience on a human level. It lets us
        convey thoughts, feelings, and emotion in a way that normal artistic and
        linguistic expression alone cannot. While it's one of the most effective
        ways to communicate, knowing how to tell a story is a skill that not
        everyone learns growing up.
      </p>
      <p>
        In principle, a good story establishes normalcy or status quo, disrupts
        the status quo, and then resolves to a newfound status quo. In doing
        this, we establish a scene in the beginning of the story by telling our
        audience what things are normally like. When we disrupt this normalcy,
        we create a sense of panic and suspense in the audience, as they're
        always asking "if normal is no more, what's happening next?". Then, we
        relieve the audience by establishing a new version of normal, which
        gives our story progress and prepares us to wrap it up.
      </p>
      <figure>
        <h4 className="mb-1">Basics Storytelling Steps</h4>
        <ol>
          <li>Establish normalcy, sets our scene</li>
          <li>Disrupt normalcy, causes suspense</li>
          <li>Resolve to a new normal, provides resolution</li>
        </ol>
      </figure>
      <p></p>
    </Post>
  )
}
