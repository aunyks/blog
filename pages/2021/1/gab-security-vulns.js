import Post from 'components/Post'
import Hint from 'components/Hint'
import CodeBlock from 'components/CodeBlock'

export default function GabSecurityVulns() {
  return (
    <Post
      title="Gab Security Vulnerabilities"
      description="Covering my recently discovered vulns in the Gab web app."
      date="2021-01-11"
      hasCodeSnippet
      remark={<></>}>
      {/*
Timestamped on Twitter (https://twitter.com/aunyks/status/1348799236809383936)

hash_string('I (@aunyks) have found two low severity and one high severity security vulnerabilities in the gab.com web app.')
=
'c1e7853f3023e1361fc96e322f9b0d16c59a48eaa646f00d928ecd8bf698d11a'
      */}
      {/*
      <p>
        Curious, huh? I would be, too. Hopefully I'll get the ability to share the
        details of this sometime soon. No promises, though, so we'll see.
      </p>
      */}
      <style jsx>{`
        li {
          list-style-type: disc;
          margin-left: 2rem;
        }
      `}</style>
      <p>
        <u>NOTE: This is solely for educational purposes.</u>
      </p>
      <h3>Jump to</h3>
      <ul>
        <li>
          <a href="#open-url-redirect">Open URL Redirect</a>
        </li>
        <li>
          <a href="#xss">Cross-Site Scripting (XSS)</a>
        </li>
        <li>
          <a href="#increasing-attack-impact">(Not) Increasing Attack Impact</a>
        </li>
        <li>
          <a href="#poc">Proof of Concept</a>
        </li>
      </ul>
      <h3>Discovery</h3>
      <p>
        The new year has brought even more memorable events in American
        politics. This week alone saw the President being permanently banned
        from Twitter which, paired with the perceived fall of social platform
        Parler, has caused{' '}
        <Hint msg="The Gab founder reported 600,000 signups this past weekend alone.">
          a large migration to Gab
        </Hint>
        . With this in mind, I started checking the platform out and found some
        vulnerabilities along the way.
      </p>
      <h3 id="open-url-redirect">Open URL Redirect Vuln</h3>
      <p>
        When scrolling through the timeline, the platform shows trending news
        sources. When hovering over one of these links, I took note of the
        format of the destination links.
      </p>
      <figure>
        <img
          alt="A screenshot of a Gab timeline. There is a trending article on the right side that is hovered over, showing the link that it points to in the bottom left corner."
          src="/img/tech/security/gab-tl-hover-over-trend.jpg"
        />
      </figure>
      <p>
        They follow the form{' '}
        <code>{`https://trends.gab.com/visit?url={destination-url}`}</code>,
        where passing the destination URL causes Gab to redirect the user to the
        destination web page. To test whether the redirect is open, we can craft
        a URL to redirect us wherever we want and, if it takes us there, the
        redirect is open. Since{' '}
        <code>https://trends.gab.com/visit?url=https%3A%2F%2Fexample.com</code>{' '}
        directs us to <code>example.com</code>, this is a classic{' '}
        <a href="/2020/2/howd-i-get-here">Open Redirect vulnerability</a>. With
        this, we can trick victims into visiting malicious web pages, since we
        can make the link look like it's a trustworthy Gab link.
      </p>
      <figure>
        <video controls className="w-full mb-2">
          <source
            src="/img/tech/security/gab-open-redirect-demo.mp4"
            type="video/mp4"
          />
          Looks like your browser doesn't support embedded videos. A video
          demonstration of the XSS exploit is supposed to be showing.
        </video>
      </figure>
      <h3 id="xss">XSS Vuln</h3>
      <p>
        After messing with the open redirect URLs above, I was curious as to
        what the homepage of <code>trends.gab.com</code> looks like.
      </p>
      <figure>
        <img
          alt="The homepage of trends.gab.com."
          src="/img/tech/security/gab-trends-above-fold.jpg"
        />
        <img
          alt="The trends.gab.com homepage after scrolling down just below the fold, showing the latest trending articles."
          src="/img/tech/security/gab-trends-below-fold.jpg"
        />
      </figure>
      <p>
        When you visit one of these trend links, you're brought to a page like
        this, where the article's title and description are displayed.
      </p>
      <figure className="mb-4">
        <img
          alt="An example Gab trend page."
          src="/img/tech/security/gab-trend-example.jpg"
        />
        <figcaption>An example Gab trend.</figcaption>
      </figure>
      <p>
        I was curious as to how these articles get added to Gab as trends and
        learned that any authenticated user can create them. With this in mind,
        I wanted to see if I could perform a{' '}
        <a
          target="_blank"
          href="https://en.wikipedia.org/wiki/Cross-site_scripting">
          Cross-Site Scripting (XSS)
        </a>{' '}
        attack by crafting a webpage that injects JavaScript into the Gab
        preview through its title and description. Long story short, Gab injects
        whatever metadata description the target page has in its HTML head.
      </p>
      <figure>
        <figcaption>
          The code below is a minimum viable payload that exploits the
          vulnerability.
        </figcaption>
        <CodeBlock lang="html" showCodeByDefault noButton>{`
<!DOCTYPE html>
<html>
  <head>
    <title>Title tag</title>
    <meta property="og:description" content="og : <script>prompt('og:description triggered me')</script> description.">
    <meta itemprop="description" content="itemprop = <script>prompt('itemprop=description triggered me')</script> description.">
    <!-- This line is what will get injected -->
    <meta name="description" content="name = <script>prompt('name=description triggered me')</script> description.">
  </head>
  <body>
  </body>
</html>
`}</CodeBlock>
      </figure>
      <p>
        The above web page looks like this on Gab. Notice the prompt in front of
        the preview page.
      </p>
      <figure>
        <video controls className="w-full mb-2">
          <source src="/img/tech/security/gab-xss-demo.mp4" type="video/mp4" />
          Looks like your browser doesn't support embedded videos. A video
          demonstration of the XSS exploit is supposed to be showing.
        </video>
      </figure>
      <p>
        This shows that we can run arbitrary code on Gab's trends page. So can
        we wreak havoc? Eh.
      </p>
      <h3 id="increasing-attack-impact">(Not) Increasing Impact</h3>
      <p>
        With XSS at our disposal, we have the same control of the browser
        context as Gab, since we can edit{' '}
        <a
          target="_blank"
          href="https://www.w3.org/TR/WD-DOM/introduction.html">
          the DOM
        </a>
        , add cookies, redirect, etc.
      </p>
      <p>
        I'd originally tested the app to see whether I could use the XSS
        vulnerability to perform{' '}
        <a target="_blank" href="https://owasp.org/www-community/attacks/csrf">
          Cross-Site Request Forgery (CSRF)
        </a>{' '}
        make new posts on behalf of the user or even delete their account when
        they visit a malicious trend, and everything was working out until the
        modern browsers saved Gab.
      </p>
      <p>
        All of Gab's origins return wildcards in the{' '}
        <a
          target="_blank"
          href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin">
          Access Control Allow Origin (ACAO)
        </a>{' '}
        header, meaning that <em>any</em> web page can make a request to them.
        However, modern browsers block cross-origin requests when{' '}
        <code>credentials: 'include'</code> is used and the corresponding ACAO
        response value is a wildcard in order to prevent CSRF attacks. They got
        lucky.
      </p>
      <p>
        With control of the browser context but an inability to forge requests
        to the more interesting <code>gab.com</code> origin, we're left with the
        ability to phish Gab users for sensitive information. We can craft an
        attack such that we exfiltrate the victim's username, profile picture,
        IP address and more for our record.
      </p>
      <p>
        We can also load some malware if we know of any active browser
        zero-days, but I'm not aware of any at the moment. So, I won't be doing
        that.
      </p>
      <h3 id="poc">Proof of Concept</h3>
      <p>Who cares about all these words? Show me the demo, right? Gotcha.</p>
      <p>
        Here's a demo where I use a malicious trend to prompt the user for their
        email and password to be stored for later. I chose prompting for
        brevity's sake. I could also make a fake login page that steals
        credentials for a more convincing scheme.
      </p>
      <figure>
        <video controls className="w-full mb-2">
          <source
            src="/img/tech/security/gab-phishing-demo.mp4"
            type="video/mp4"
          />
          Looks like your browser doesn't support embedded videos. A video
          demonstration of the XSS exploit is supposed to be showing.
        </video>
        {/*<figcaption>https://trends.gab.com/item/5fff8526bd189868a903898e</figcaption>*/}
      </figure>
      <p>
        Notice how I redirect the victim to a legitimate trend after grabbing
        their information. In doing this, I lessen the risk of a victim actually
        visiting my malicious website, which would raise suspicion since the
        site may not have any real information.
      </p>
      <p>
        I can even artificially make my trend post show in the top trends list
        simply by automating requests to the page. That way, I can gain more
        victims who think that it's a legitimate trend. This is because HTTP
        requests alone increment a trend's view counter, and views and recency
        are used to give priority on the trend lists.
      </p>
      <h3>Conclusion</h3>
      <p>
        These are only moderately severe vulnerabilities alone, but when chained
        with functionality of Gab's platform or any other vulnerabilities, a lot
        of damage can be done.
      </p>
    </Post>
  )
}
