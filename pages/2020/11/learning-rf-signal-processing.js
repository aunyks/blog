import Post from 'components/Post'

export default function LearningRFSignalProcessing() {
  return (
    <Post
      title="Learning RF Signal Processing"
      description="A series of posts that give a foundation of knowledge in signal processing."
      date="2020-11-13">
      <p>
        For a variety of reasons, I've been interested in RF signals. And, to get more hands on
        I've taken it upon myself to self-study signal processing. Occasionally I write posts that help
        simplify topics that I found harder to understand than they need to be. Following this series should give you
        a solid foundation for getting into digital signal processing.
        </p>
      <ol>
        <li><a href="/2020/11/understanding-complex-signals">Understanding Complex Signals</a></li>
        <li><a href="/2020/11/demodulating-iq-data">Demodulating I/Q Data</a></li>
      </ol>
    </Post>
  )
}