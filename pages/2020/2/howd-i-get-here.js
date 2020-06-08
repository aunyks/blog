import Head from 'next/head'
import Post from 'components/Post'

export default () => (
  <Post
    date="2020-02-02"
    title="How'd I Get Here?"
    subtitle="Exploiting Redirection"
    description="Exploiting open redirection vulnerabilities."
    cardImage="https://blog.aunyks.com/img/tech/howd-i-get-here-card.png">
    <p><u>NOTE: The content in this post is solely for educational purposes. Do NOT attack entities that did not
    provide
            consent beforehand.</u></p>
    <p>
      In this post, we'll cover what Open URL Redirection Vulnerabilties are, how to exploit them, and how to
      prevent them.
      I was motivated to write this, because I've lately been discovering these vulnerabilities in the wild, and I
      want to increase vendors', users', and researchers' awareness of them.
        </p>
    <h3>What is URL Redirection?</h3>
    <p>
      URL Redirection is a method used by web applications to manage a user's navigation throughout the app. This is
      often seen during authentication, where a user is registering for or logging into an application, and the
      application wishes to redirect the user to another page once they've been authenticated.
        </p>
    <h3>So, what's the problem?</h3>
    <p>
      What happens when we set the location to which a user will be redirected to a completely different website? If
      the
      application still redirects us to the website, its URL redirection logic could be too "open". If we can have
      it
          redirect us to any website we'd like, we <i>might</i> be able to use this to attack users of the website.
        </p>
    <h3>What does this look like?</h3>
    <p>
      Sometimes when you're at a login page for some website like <code>hackus.now.sh</code>, you might see the URL
          looks like <code>hackus.now.sh/login?next=/dashboard</code>. That URL communicates that, once you've logged
          in,
          you'll be redirected to the dashboard page, which looks like <code>hackus.now.sh/dashboard</code>.
        </p>
    <p>
      We established earlier that URLs that contain the location to which we'll be redirected are potentially
      vulnerable to Open URL Redirection. This is because the target doesn't perform adequate verification or
          sanitization of the values of the <code>next</code> parameter. With that being said, what happens if we
          instead set the destination to
          <code>example.com</code>? To see that, we can visit <code>hackus.now.sh/login?next=https://example.com</code>.
          If, after logging in, we're redirected to <code>example.com</code>, our target is definitely susceptible to
          Open URL Redirection.
        </p>
    <h3 id="craft-the-attack">How can we craft an attack?</h3>
    <p>
      As with many high-impact attacks, we can chain our exploitation of this vulnerability with other exploits to
          achieve certain effects on a target or targets. For example, we can utilize social engineering and <a
        href="https://www.cvedetails.com/cve/CVE-2019-11708">a CVE that lets us break out of the browser sandbox and
            execute code on the host computer</a> to take control of a target's device.
        </p>
    <p> In theory, this could be
    achieved by using the social engineering to have our target visit
          <code>hackus.now.sh/login?next=imdangerous.com</code> and log in. In this case, our target's visit to
          <code>imdangerous.com</code> will cause our exploitation of the aforementioned CVE to take place, allowing
          us to run code on the target's machine and likely take control of it.
        </p>
    <h3>What if there's no <code>next</code> parameter?</h3>
    <p>
      These redirect parameters vary across web applications and frameworks. In my experience, I've seen
          <code>next</code>, <code>goto</code>, <code>redirect</code>, and <code>redirect_to</code>. They could take so
          many forms that you could even use a wordlist and fuzz for valid redirection parameters to test for openness.
        </p>
    <h3>How creative can we get with this?</h3>
    <p>
      Very! If we wanna get creative with the redirection payload, we can change the form of the URL. For example,
          if the payload looks like <code>?next=/dashboard</code> and we want to redirect to <code>example.com</code>,
          we can try the URL with protocol included (<code>?next=https://example.com</code>), just the host
          (<code>?next=example.com</code> / <code>?next=/example.com</code>), URL without protocol
          (<code>?next=//example.com</code>), or even URL-encoded versions of any of the previous examples
          (<code>?next=%2F%2Fexample.com</code> et al.).
        </p>
    <p>
      Another creative approach is to try different protocols in the payload! Some browsers support FTP and IPFS
      URLs, so we could plug those kinds of URLs in the payload and observe effects. A payload that often increases
      the impact of vulnerabilities of this type is using JavaScript as the payload's protocol. Using payloads
          of the form <code>{`?next=javascript:{some-code}`}</code> can sometimes be used to perform <a
        href="https://owasp.org/www-community/attacks/DOM_Based_XSS">DOM-based XSS</a>.
        </p>
    <h3>The Attack in the Wild</h3>
    <p>
      An Open Redirect vulnerability was exploited in the United States Department of Health and Human
          Services' <a href="https://dcis.hhs.gov/">Departmental Contracts Information System</a> during the novel
          coronavirus disease (COVID-19) pandemic. In short, attackers sent crafted a URL of the form
          <code>https://dcis.hhs.gov/cas/login?service=malicioussite.com&gateway=true</code> that redirected victims to
          a website that has a victim unknowingly download and execute malware. More information on this particular
          attack can be found <a
        href="https://www.bleepingcomputer.com/news/security/hhsgov-open-redirect-used-by-coronavirus-phishing-to-spread-malware/">here</a>.
        </p>
    <p>
      I also have a <a href="https://blog.aunyks.com/2020/3/replit-open-redirect.html">writeup</a> detailing my
          discovery and disclosure of an Open Redirect vulnerability in <a href="https://repl.it">Repl.it's</a> web
          application.
        </p>
    <h3>In Conclusion</h3>
    <p>
      Open URL Redirection is a type of vulnerability where an application redirects users to any location provided
      in its URL. This type of vulnerability is typically used in a chain of exploits to achieve higher impact
      attacks. At times, these vulnerabilities could even lead to XSS! To mitigate the risk of an application's
      vulnerability to Open URL Redirection, developers and security engineers must ensure that their applications
      whitelist and/or sanitize the values of their redirection parameters.
        </p>
    <p>
      I typically report these vulnerabilities with low severity, although depending on the nature of the
      application or range of allowed payloads I might give medium or high severity to my findings.
        </p>
  </Post>
)