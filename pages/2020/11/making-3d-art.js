import Post from 'components/Post'

export default function Making3DArt() {
  return (
    <Post
      title="Making 3D Art"
      description="A series of posts about 3D art where I talk about my process in making pieces."
      date="2020-11-13">
      <p>
        I've been learning Blender and making 3D art lately, and sometimes I
        write about how I made some of my pieces.
      </p>
      <ol>
        <li>
          <a href="/2020/8/designing-my-first-credit-card">
            Designing My First Credit Card
          </a>
        </li>
        <li>
          <a href="/2020/8/making-the-orb">Making the Orb</a>
        </li>
        <li>
          <a href="/2020/9/making-haze">Making Haze</a>
        </li>
        <li>
          <a href="/2020/10/making-serenitys-arrival">
            Making Serenity's Arrival
          </a>
        </li>
      </ol>
    </Post>
  )
}
