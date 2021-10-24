import Post from 'components/Post'

export default function AnatomyOfGogo() {
  return (
    <Post
      title="A Brief Lesson on Go-go"
      description="Briefly discussing Go-go music and what makes it what it is."
      date="2020-12-08">
      <p>
        I've enjoyed go-go music ever since I arrived to DC for university. Since my freshman year, it's been
        something that struck me as interestingly new yet so familiar. Here, I'll briefly discuss what makes go-go
        what it is. My music theory knowledge is limited, so bear with me.
      </p>
      <h3>What's Go-go?</h3>
      <p>
        Go-go is a subgenre of music based in the <a target="_blank" href="https://en.wikipedia.org/wiki/Washington_metropolitan_area">DMV</a> that has a unique kind of funk to it.
        Just talking about it doesn't do it justice, though. Give it a listen.
        </p>
      <h3>Some Examples</h3>
      <figure className="my-3">
        <div dangerouslySetInnerHTML={{ __html: '<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/p86ncGX3FoM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' }}></div>
        <figcaption className="mt-2">You may have heard E.U.'s <em>Da Butt</em>.</figcaption>
      </figure>
      <figure className="my-3">
        <div dangerouslySetInnerHTML={{ __html: '<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/X6gtcy9qN5s" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' }}></div>
        <figcaption className="mt-2"><em>Pieces of Me</em> by Rare Essence</figcaption>
      </figure>
      <h3>Instruments</h3>
      <p>
        The vast majority of go-go has a distinct drum line fit with sounds from a drum kit and conga and bongo drums. Other aspects of
        a song like the harmony and melody are often played using vocals, piano, strings, or synthesizers. The genre can have a wide
        range of sounds, but the core of the genre is the familiar beat, as you can see in the above examples.
      </p>
      <h3>Rhythm</h3>
      <p>
        The go-go rhythm is characterized by its beat. The way the swing and syncopation come together makes it funky.
      </p>
      <h3>Melody and Harmony</h3>
      <p>
        Go-go music often has aspects of funk that tie back to its jazz roots. This means that lots of jazz-style arrangements can be found throughout
        the genre, and because of its origin in African American culture you could say that go-go tracks have a musical similarity to other genres created by
        African Americans, like hip-hop, gospel, and r&b.
      </p>
      <h3>Additional Resources</h3>
      <ul>
        <li><a href="https://www.youtube.com/watch?v=abs1RUeZ3Yw">GoGo Music Masterclass by Owen Adams Music</a></li>
      </ul>
    </Post>
  )
}