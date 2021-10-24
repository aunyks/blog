import Post from 'components/Post'
import Quote from 'components/Quote'
import Hint from 'components/Hint'

export default function HumanProgress() {
  return (
    <Post
      title="The Cycle of Human Progress"
      subtitle="Human Evolution in Three Dimensions"
      description="Recounting the inspiration and process for designing my first credit card."
      date="2020-08-26"
      cardImage="https://blog.aunyks.com/img/misc/cohp.png"
      remark={
        <p>
          Thanks for reading. This post is a practical example of balance achieved through cycles. You can read about it more abstractly in
          my post <a href="/2021/2/on-balance">On Balance</a>.
        </p>
      }>
      <p>
        A couple weeks ago, I was watching an episode of <a href="https://www.netflix.com/title/80057883">Abstract</a> that covered Bio-Architecture. It followed <a href="https://twitter.com/NeriOxman">Neri Oxman</a> as she completed a project of hers, telling her life story in the process. She made lots of insightful statements, but one idea of hers that had truly stuck with me was how she described the connection between art, science, engineering,
        and design.
      </p>
      <Quote author="Neri Oxman">
        Science converts information into knowledge, engineering converts knowledge into utility, design converts utility into culture, behavior, and context, and art converts the behavior and question[s] our perception of the world.
      </Quote>
      <p>
        Here, she describes the Krebs Cycle of Creativity (KCC), into which she delves more deeply in her article titled <em><a href="https://jods.mitpress.mit.edu/pub/ageofentanglement/release/1">Age of Entanglement</a></em>. When first hearing her
      describe such a cycle so succinctly, I was met with a new model of thinking of such concepts, but I was unsure what to make of it. She'd worded a relationship that's flown over the heads of millions, maybe billions of people in the past
      so beautifully, but now that I understood the relationship I wasn't sure exactly what it meant in the grand scheme.
    </p>
      <p>
        With enough time, I came to the conclusion that this idea describes the concept of human progress itself. Since the beginning of time, human creativity created art from the observation of nature,
        artistic expression inspired scientific exploration, exploration inspired technological invention, and invention required design communication to provide true meaning to humans. It's at this point that new paradigms
        have changed human culture and behavior, so the artists renew the cycle again.
    </p>
      <Quote author="Neri Oxman">
        ...and when art meets science, it’s the Cinderella moment in the 12 o’clock.
      </Quote>
      <p>
        Everything that the human race has created falls somewhere on this cycle and moves clockwise, inspiring more progress for others to take on. This is an interesting way to think of humanity, as many of us question
        why any one of the quadrants exist. Unfortunately art gets the most criticism of this kind. People very often state that art is a waste of resources since <Hint msg="Art has many purposes, and it shouldn't be measured solely by its economic impact. Much of science also has relatively little economic impact.">its economic significance isn't always obvious</Hint>. Oxman's model
      provides one more proof that art is equally impactful on human progress as the other three aspects, highlighting that artistic expression inspires other humans by some means.
    </p>
      <p>
        A modern example of the cycle is Bitcoin. It's said that Neal Stephenson's science fiction novel <em><a href="https://en.wikipedia.org/wiki/Cryptonomicon">Cryptonomicon</a></em> inspired the digital currency called Bitcoin. Here,
      Stephenson produced the art via his novel. Several technologists like <a href="http://www.chaum.com/">David Chaum</a> and <a href="https://twitter.com/adam3us">Adam Back</a> have scientifically explored distributed digital currencies with Chaumian e-cash and Hashcash, respectively.
      Their efforts likely inspired Satoshi Nakamoto to explore another digital currency implementation, and he later invented Bitcoin for the world to use. The following years, including now, have been dedicated to design thinkers trying to make Bitcoin
      as accessible as possible to the average person. This, in turn has inspired more artistic creation, and the cycle continues!
    </p>
      <p>
        The cycle is often modeled visually with a circle reminding of us of a clock.
    </p>
      <figure className="my-2 mx-auto w-full">
        <img alt="The Krebs Cycle of Creativity" src="/img/misc/cohp.png" />
      </figure>
      <p>
        This helps you visualize the clockwise motion in which creativity and inspiration travel. The image is in two dimensions, <Hint msg={`I don't believe in the "left brain"/"right brain" stuff, but I understand that a lot of people think of it this way.`}>with the "left brain"
        activities on the right side and "right brain" activities on the left side</Hint> and the more abstract, theoretical activities on top and applied activities on the bottom. But, I like to think that we can model it even more accurately if we think about it in three dimensions, with the third dimension abstractly
        representing progress. This means that the circle becomes a helix, a spring-like coil.
      </p>
      <p>
        With this, we can better visualize this idea in a grander scheme. We can see that, although creativity and inspiration continuously cycle in the same two dimensions, the overall condition of humanity improves almost linearly.
      </p>
      <p>
        I'll be keeping this in the back of my mind for a <em>long</em> time. Hopefully you will too.
      </p>
    </Post>
  )
}