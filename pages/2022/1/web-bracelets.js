import Post from 'components/Post'
import Hint from 'components/Hint'

export default function Resolutions() {
  return (
    <Post
      title="Web Bracelets"
      description="Imagine the getting around the web without needing Google. Web bracelets let that happen."
      date="2022-01-05">
      <p>
        Imagine the web if we didn't need to use Google to get around and find
        things. What if the web stayed as large as it is but <em>felt</em>{' '}
        smaller, more local, more <em>personal</em>?
      </p>
      <p>
        Well, in the early days of the web that's just what it was like. People
        used{' '}
        <a href="https://en.wikipedia.org/wiki/Webring" target="_blank">
          webrings
        </a>{' '}
        to traverse websites and find what they wanted. Webrings let people
        bounce across websites in a particular group or category without the
        need for a search engine to collect them all.
      </p>
      <p>
        Webrings would spin up and function as simple search engines. Some would
        spin up to connect a group of friends. Others would spin up to connect
        people with a common interest or characteristic. For example,{' '}
        <a href="https://indieweb.org/webring" target="_blank">
          the Indie Webring
        </a>{' '}
        connects together websites that are run by individuals, in the spirit of
        the indieweb movement.
      </p>
      <p>
        You may now see the similarity between a webring and a Facebook group, a
        Twitter list, or a Discord group. That's because these webrings were
        some of the earliest forms of social connection on the web beyond an
        occasional link to another website. These webrings were oftentimes very
        decentralized and local: they expressed community as we know it. People
        would regularly split off and join or make another webring if there were
        disputes or simple changes in interests.
      </p>
      <p>
        And maybe that's just what we need nowadays. Amidst the growing fatigue
        and distrust for{' '}
        <Hint msg="Google, Facebook, Twitter, and more.">
          large tech companies
        </Hint>{' '}
        and their products, perhaps we should webrings back, or at least some
        spiritual successor with a new "brand".
      </p>
      <h2>Bracelets: A Successor to the Webring</h2>
      <p>
        A bracelet is the same thing as a webring. What's the difference? Not
        much, only the name really. With a bracelet, each website is a{' '}
        <em>charm</em>, and the more charms there are in a bracelet, the more
        personality it has and interesting it can be. Maybe charms can be in
        multiple bracelets and form some kind of chain.
      </p>
      <p>
        Regardless, we should bring webrings back, and we can call them
        bracelets once they return. It'd be so refreshing to see people have
        real fun online again.
      </p>
    </Post>
  )
}
