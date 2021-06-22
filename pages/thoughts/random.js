import ThoughtsPost from 'components/ThoughtsPost'
import Thought from 'components/Thought'
import Hint from 'components/Hint'

const Separator = () => <hr className="w-full my-2" />

export default function RandomThoughts() {
  return (
    <ThoughtsPost
      title="Random Thoughts"
      description="Miscellaneous thoughts with no category."
      noFooter
    >
      <Thought date="2021-06-22">
        I'm starting to dislike how discrete my CS program was. I'm learning nearby technical fields and everything is full of continuous math mixed with computing.
        Of course we've taken our fair share of math courses, but in retrospect I think we should've had courses that applied computing knowledge to those fields. Oh well 🤷‍♂️
      </Thought>
      <Thought date="2021-05-07">
        Posterity will think it's insane that we let random people take an easy test once in their entire life and be able to drive almost any car, in any condition, at any time.
        The dangers of incompetent people driving these several-ton machines careening at high speeds are so normal to us.
      </Thought>
      <Thought date="2021-05-07">
        I graduated! B.S in Computer Science, Howard University
      </Thought>
      <Thought date="2021-04-22">
        Much, and arguably most, of erosion of the American middle class can be attributed to the toxicity of corporate American culture and practices.
      </Thought>
      <Thought date="2021-04-16">
        If your AR or VR project is neither playable nor interactive, then it’s just a VFX project with extra work.
      </Thought>
      <Thought date="2021-04-01">
        SpaceX moving quickly, Bezos leaving Amazon to focus more on Blue Origin in a few months, NASA's Artemis missions, space programs coming out of the East, and so much more mean that this new era of space innovation is 100% happening now.
      </Thought>
      <Thought date="2021-03-25">
        In the wee hours of this morning, I updated this blog to the second version of the UI for <Hint msg="Home page, about page, directory pages, etc.">non-post pages</Hint>.
        It's my first significant UI update to any type of page since I've started this custom blog in late 2019. I made this change
        not only for a more refreshing UI, but also to help welcome more forms of content, like videos! Here's to v2.0.
      </Thought>
      <Thought date="2021-03-24">
        This is the best birthday I've had in a long time. Here's to 22 years.
      </Thought>
      <Thought date="2021-03-19">
        Software engineers could learn a lot from conventional engineering branches. In practice, though, because in theory we
        already have similar workflows.
      </Thought>
      <Thought date="2021-02-20">
        I might start sticking close to game dev. It’s so interdisciplinary.
      </Thought>
      <Thought date="2021-02-14">
        Used a flame graph for the first time today. It felt like hard core engineering / debugging. I used it
        to debug a game I was making that started to jitter on each frame. The entire time I thought the physics stepping
        was slowing it down but turns out it was the rendering that was taking forever each frame. Thank God for profiling. Happy Valentine's Day!
      </Thought>
      <Thought date="2021-02-13">
        All roads in digital innovation eventually lead back to gaming.
      </Thought>
      <Thought date="2021-02-13">
        The interesting thing about web games is that you can make them such that you take advantage of the
        accessibility features that browsers already have.
      </Thought>
      <Thought date="2021-01-29">
        <p>
          The move from centralized platforms to decentralized ones will never happen under normal conditions.
          It'll only happen in black swan events where people are frightened by the lack of control their current solutions gave them.
        </p>
        <p>
          With this being said, the move from fiat currency and <Hint msg="Central Bank Digital Currencies">CBDCs</Hint> will likely occur
          after a near failure of the financial system. And, the move of apps from mobile back to the web will occur when app store owners become to strict
          for companies to deal with.
        </p>
      </Thought>
      <Thought date="2021-01-16">
        Call of Duty Black Ops 2 and Infinite Warfare told the future to the masses. I'm convinced.
      </Thought>
      <Thought date="2021-01-16">
        Bay Area tech types keep talking about leaving the Bay for Austin and Miami when the reality is that they’ll be colonizing every big city below the Mason-Dixon with enough time.
        <br />
        Lots of southern cities have been positioning themselves as some kind of “Silicon Valley of the South” for more than a decade now and would be happy finally to bring those types to their city. Austin and Miami are just the beginning.
        <br />
        I’ll even go so far as to say that Austin and Miami are first. Atlanta and Raleigh are next. Birmingham, Louisville, and Nashville or Memphis will follow.
      </Thought>
      <Thought date="2021-01-10">
        Negative partisanship works so well, because it's easier to make fun of the other side than it is to justify why you're on your side.
        As a result, political polarization increases.
      </Thought>
      <Thought date="2021-01-08">
        The next tech revolution will be tiny: biotech, nanotech, and future/smart materials.
        Of course we’ll see lots of digital tech innovation along the way, but I think the next explosion will be in those fields.
      </Thought>
      <Thought date="2020-12-19">
        I need to start writing and taking pics when I’m out enjoying experiences. I reject materialism to enhance my experiences with the world, but it’s hard to enjoy the experiences if I have to remember everything by myself. Pics
        and words will help me relive them.
      </Thought>
      <Thought date="2020-12-17">
        First <a target="_blank" href="https://www.theguardian.com/technology/2020/dec/08/fireeye-hack-cybersecurity-theft">FireEye</a>, then <a target="_blank" href="https://www.cnn.com/2020/12/14/politics/us-agencies-hack-solar-wind-russia/index.html">SolarWinds</a>,
        and now <a target="_blank" href="https://www.politico.com/news/2020/12/17/nuclear-agency-hacked-officials-inform-congress-447855">the NNSA</a>? Even some city governments were hit. These attacks are hitting incredibly hard and fast.
        <br />
        <a href="https://www.nytimes.com/2020/12/16/opinion/fireeye-solarwinds-russia-hack.html" target="_blank">Related</a>
      </Thought>
      <Thought date="2020-12-11">
        I think we’re in the uncanny valley between not quantifying the value of a person’s time at all and having time being as easy to value as the dollar in your pocket. Being at one of
        the extremes feels more natural than the state we're in now.
      </Thought>
      <Thought date="2020-11-26">
        Once the US Military moves to its next gen standard issue rifle, I wonder what will happen to domestic AR-15 sales.
      </Thought>
      <Thought date="2020-12-06">
        I'm suspicious that the delayed/lasting effects of COVID-19 will make a lot of us say "I told you so" to non-believer's in the future.
      </Thought>
      <Thought date="2020-11-26">
        Learning signal processing makes me feel like an electrical engineer.
      </Thought>
      <Thought date="2020-10-28">
        Effective cryptography is the last ubiquitous weapon people have against authoritarianism today.
      </Thought>
      <Thought date="2020-10-24">
        When an innocent person has their life taken by the government, it concerns me when people justify their innocence by saying they're unarmed. I
        legally and responsibly carry my weapon, and exercising my right to do so shouldn't be a reason for me to lose my life.
      </Thought>
      <Thought date="2020-10-14">
        Balance is rarely constant. It's achieved through the continuous shift between all possible states.
      </Thought>
      <Thought date="2020-09-03">
        Thinking in pursuit of a quote yields a bad quote, ironically enough.
      </Thought>
      <Thought date="2020-08-16">
        Trying new experiences always brings some excitement.
      </Thought>
      <Thought date="2020-08-16">
        I find so much joy in challenging myself. It's addicting. Constantly pushing the frontier of knowledge and skill is so fulfilling, even if the original goal isn't achieved.
      </Thought>
      <Thought date="2020-07-29">
        The good thing about today's increased political polarization is that it's a result of increased consciousness
        of the current state of affairs. The bad thing is that the far right believes certain groups of people are
        the problem and the far left believes that the system is the problem.
      </Thought>
      <Thought date="2020-07-28">
        I wonder which countries wish they could export culture as well as Japan exports anime and manga.
      </Thought>
      <Thought date="2020-07-27">
        Is HAM radio the only alternative to the Internet for instant long distance communication?
      </Thought>
      <Thought date="2020-07-26">
        Twitter isn't good for my mental health and I don't know how long Mastodon will survive, so I decided to put some
        thoughts on here.
      </Thought>
      <Thought id="tiktok-middle-class" date="2020-07-26">
        TikTok does so well because of its huge middle class. They give a LOT of creators occasional tastes of
        virality so they keep creating content. The upper class is the verified crowd, who don't make content as high
        of quality as the middle class but reap all the benefits of TikTok's popularity. The lower class is the group
        that just consume the content but are still the backbone of TikTok's popularity (read: economy).
      </Thought>
    </ThoughtsPost>
  )
}