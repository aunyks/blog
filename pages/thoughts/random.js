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