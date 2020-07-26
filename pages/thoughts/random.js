import Post from 'components/Post'
import Thought from 'components/Thought'

const Separator = () => <hr className="w-full my-2" />

export default () => (
  <Post
    title="Random Thoughts"
    description="Miscellaneous thoughts with no category."
    noFooter
  >
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
  </Post>
)