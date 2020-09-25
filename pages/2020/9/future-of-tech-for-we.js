import Post from 'components/Post'
import Hint from 'components/Hint'
import Quote from 'components/Quote'

export default () => (
  <Post
    title="The Future of Tech for We"
    subtitle="The Coming of Self-Sovereign Technology"
    description="Covering the current state of content creation and monetization on the web and how it will soon favor creator-owned alternatives."
    date="2020-09-25">
    <p>
      In the age of social media, content is king. Unlike previous eras, everyone's now a creator. This has caused an explosion in content, and it exists on just a few platforms owned by large corporations.
        </p>
    <p>
      Platforms like Facebook, YouTube, Twitter, Twitch, and more serve as sources of entertainment and social connection for many of us. They serve as forums of endless amounts of information for us to consume, and the curation algorithms
      constantly serve us content from new creators. Such behavior is in many ways beneficial to creators. Being nice to or respecting the algorithms on these platforms sows the seeds for a small creator to blow up with thousands of
      followers, granting them an audience, fame, and potentially a fortune.
        </p>
    <p>
      But, the platform giveth, and the platform taketh. These same platforms have strict terms of service that bear existential consequences for those who void them, forcing all creators to tread very lightly with the content they put out.
      To some, following unclear and always-changing platform rules can feel like an uphill climb. This not only comes from social platforms but also support and patronage platforms like Patreon or OnlyFans. The decisions of the platforms
      affect creators' bottom lines, which creates a tight relationship between the two.
        </p>
    <Quote>
      The platform giveth, and the platform taketh
      </Quote>
    <p>
      This relationship can very quickly and very often get shakey, though. Platforms have no problem locking, suspending, or banning creators' accounts for violating the terms in some way, and many platforms ban creators permanently for automatically
      detected violations.
        </p>
    <p>
      Creators and talent agencies alike have noticed this gradual increase in platform risk and learned quickly that creators need to span multiple platforms at one time to lessen the risk of catastrophe. But, just diversifying the platforms on which a creator exists isn't enough.
          These platforms are all owned by large corporations that will exist with or without any one individual on their products. They don't care about banning a creator as long as there are others on-platform, and creators <em>must</em> keep that in mind. The time has come for creators to reclaim full ownership of their
          brand, content, and money.
        </p>
    <figure className="my-5">
      <img className="w-full" src="/img/tech-culture/drdisrespect.jpg"
        alt="A photo of esports athlete and influencer Dr. Disrespect." />
      <figcaption className="w-full text-xs text-center mx-auto">To the surprise of millions, celebrity esports athlete and streamer Dr. Disrespect <a href="https://www.forbes.com/sites/paultassi/2020/06/29/why-was-dr-disrespect-banned-on-twitch-everything-known-so-far/#2b2cdbbb2929">was suddenly banned from Twitch</a>. He's since been allowed back on the platform.<br />Image Source: PCGamer</figcaption>
    </figure>
    <p>
      Technology that lets content creators maintain sovereignty of their content is the future of content creation. The tech lets creators connect with their audiencies without the worry of abiding by some strict platform rules. As we move forward, creators with larger audiences will be moving into increasingly trustworthy and self-sovereign platforms. Many will even have their own platforms for total
      ownership of content and audience attention.
        </p>
    <p>
      More self-sovereign technologies for content creation and branding include personal domains, self-hosted newsletters, and self-hosted blogs. Self-sovereign tech for financial support include using cryptocurrencies or even new creator-centric models like <a href="https://decrypt.co/25980/alex-mamsej-fractional-shares-ethereum">personal tokens</a> or IPOs. While these aren't the norm just yet, we
      are certainly seeing a trend in that direction.
        </p>
    <figure className="my-5">
      <img className="w-full" src="/img/tech-culture/mrsdrlupo-cap.jpg"
        alt="A screen capture of mrsdrlupo.tv." />
      <figcaption className="w-full text-xs text-center mx-auto">Streamer <a href="https://mrsdrlupo.tv">MrsDrLupo</a> owns her own domain and website, which embeds her current Twitch stream, latest tweets, tip jar, and more!</figcaption>
    </figure>
    <p>
      Right now, it seems that we're in an intermediate stage in the transition to self-sovereign tech. Large platforms still hold the majority of consumer and creator attention, but we're starting to see smaller platforms that build ontop of traditionally self-sovereign technology gain popularity. These newer platforms get creators familiar with the tech <Hint msg="This still comes at the expense of losing some ownership of content and monetization rights.">while providing easy-to-use solutions</Hint>.
        </p>
    <p>
      For example, <a href="https://substack.com/">Substack</a> and <a href="https://www.superphone.io/">Superphone</a> let creators connect with their audiences using email and SMS, respectively, which are technologies that provide an order of magnitude more freedom than the likes of Facebook Messenger or Twitter. The next step is to self-host a newsletter. <a href="https://bandcamp.com/">Bandcamp</a> lets musicians earn more money by being paid directly for their work. The next step is for creators to take <em>full</em> ownership of their work with solutions like <a href="https://audius.co/">Audius</a>.
      Even <a href="https://stockx.com/">StockX</a> lets high profile creators sell and resell collaborated items or merch. The next step there is to move onto platforms that let creators own more of that value like <a href="https://ourzora.com/">Zora</a>.
    </p>
    <figure className="my-5">
      <div dangerouslySetInnerHTML={{ __html: `<blockquote class="twitter-tweet"><p lang="en" dir="ltr">boredddd on this drive.... text me... 310-870-3349<br><br>imma be replying to as many ppl</p>&mdash; Jake Paul (@jakepaul) <a href="https://twitter.com/jakepaul/status/1146317301446135808?ref_src=twsrc%5Etfw">July 3, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>` }} />
      <figcaption className="w-full lg:w-3/4 text-xs text-center mx-auto">Jake Paul uses a mass text messaging service similar to Superphone. These services have been growing in popularity lately.</figcaption>
    </figure>
    <p>
      The power to own the value being created by this boom in content is starting to shift from large platforms and back to the people. With this new sovereignty comes the freedom for a creator to post whatever they want, whenever they want. People will no longer be bound by the terms of large media platforms.
      </p>
    <p>
      Such a culture-shaping transition won't happen overnight, maybe not even in just a couple of years. But, it most definitely will happen in due time. The tech for <em>us</em> made us the object: the thing being used for another's majority gain. The future brings tech
      that grants us agency: it makes us the subject.
    </p>
    <p>
      <em>The future is tech for we.</em>
    </p>
  </Post>
)