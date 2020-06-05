import Head from 'next/head'
import Post from '../../../components/Post'

export default () => (
  <Post
    date="2020-03-05"
    title="Repl.it Open URL Redirection Vulnerability Writeup"
    subtitle="Exploiting Redirection"
    description="Covering the hack"
    cardImage="https://blog.aunyks.com/img/tech/vuln-writeup-repl-it.png">
    <p><u>NOTE: The content in this post is solely for educational purposes. Do NOT attack entities that did not
    provide
            consent beforehand.</u></p>
    <p>
      The <a href="https://repl.it">Repl.it</a> team was kind enough to allow me to disclose this vulnerability. As
          stated by the title, I found an <a
        href="https://owasp.org/www-project-cheat-sheets/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet">Open
            URL Redirection vulnerability</a> in the company's web application. If you want to learn more about the
          nature of this
          type of vulnerability, <a href="/2020/2/howd-i-get-here.html">here's an article</a> that explains it.
        </p>
    <h3>Discovery</h3>
    <p>
      In the Computer Science department at my university, we regularly use Repl.it for rapid testing of ideas for
      our programming assignments, and in some classes we use it for official assignment submission. While logging
          in to the platform one time, I took note of a <code>goto</code> parameter in the login URL. The URL followed
          the form
          <code>{`repl.it/login?goto={target_endpoint}`}</code>, where <code>{`{target_endpoint}`}</code> is the location to
          which
          the user is redirected after logging in.
        </p>
    <h3>Exploitation</h3>
    <p>
      Because post-authentication redirection schemes that look like this are, at times, susceptible to Open URL
          Redirection, I tried visiting the URL <code>repl.it/login?goto=https://example.com</code> and logging in. To
          my surprise, I was redirected to example.com! Now that this case was validated, I tried finding methods of
          obscuring the destination URL. This is because a victim may notice the second, potentially malicious URL and
          choose not to visit the link. With that said, I tested <a
        href="https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Open%20Redirect/Intruder/openredirects.txt">several
            different ways to encode an URL</a> and saw that most of the variations worked in place of the plain
          &nbsp;<code>https://example.com</code>.
        </p>
    <h3>Impact</h3>
    <p>
      Vulnerabilities of this type are typically used in a chain with others to exploit victims, but conceptually
      this can be used to redirect users to phishing sites or sites that exploit browsers to install malware on a
          victim's device. A bit more detail <a href="/2020/2/howd-i-get-here.html#craft-the-attack">here</a>.
        </p>
    <h3>(Not) Increasing the Impact</h3>
    <p>
      Some Open Redirect Vulns can also lead to <a href="https://owasp.org/www-community/attacks/xss/">Cross Site
            Scripting (XSS) attacks</a> if the payload or, in this case, the destination URL is valid
          JavaScript. Fortunately, injecting script tags or <code>{`javascript:{some-code-here}`}</code> as the parameter
          value didn't appear to
          have an effect.
        </p>
    <h3>Demo</h3>
    <p>
      Here's a video demo of the this vulnerability being exploited before the patch. I don't consider it a proof of
      concept, as I demonstrate the exploitation with a benign redirection location.
        </p>
    <video controls className="w-full">
      <source src="/img/tech/repl-open-redir-poc.mov" type="video/mp4" />
        Looks like your browser doesn't support embedded videos.
        </video>
    <h3>In Conclusion</h3>
    <p>
      I raised this issue with medium severity, as opposed to the typical low severity, given the nature of
      Repl.it's
      REPL
      sharing feature and the ease of a user mistaking a malicious login link for shared REPL or other asset. The
      Repl.it team was very considerate in finding time to fix this vulnerability. They're a relatively small team
      with a lot of responsibilities, so their diligence was appreciated.
        </p>
    <h3>Timeline</h3>
    <p>
      <strong>Oct 24, 2019</strong> - Initial email asking for preferred means of disclosure<br />
      <strong>Dec 31, 2019</strong> - Response from Repl and disclosure of vulnerability details<br />
      <strong>Unknown</strong> - Full patch<br />
      <strong>Mar 03, 2020</strong> - Discovery of patch and request to fully disclose findings<br />
      <strong>Mar 04, 2020</strong> - Permission to fully disclose findings granted
        </p>
  </Post>
)