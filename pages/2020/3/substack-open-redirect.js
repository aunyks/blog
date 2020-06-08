import Head from 'next/head'
import Post from 'components/Post'

export default () => (
  <Post
    date="2020-03-31"
    title="Substack Open URL Redirection / Reflected XSS Vulnerability Writeup"
    description="Covering the hack"
    cardImage="https://blog.aunyks.com/img/tech/vuln-writeup-substack.png">
    <p><u>NOTE: The content in this post is solely for educational purposes.</u></p>
    <p>
      The <a href="https://substack.com">Substack</a> team was kind enough to allow me to disclose this
          vulnerability. As
          stated by the title, I found an <a
        href="https://owasp.org/www-project-cheat-sheets/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet">Open
            URL Redirection</a> vulnerability and a Reflected <a
        href="https://owasp.org/www-community/attacks/xss">Cross-Site Scripting (XSS)</a> vulnerability in the
          company's web application.
          If you want to learn more about the
          nature of these
          types of vulnerabilities and how they can relate in this case, <a href="/2020/2/howd-i-get-here.html">here's
            an article</a> that explains it.
        </p>
    <h3>Discovery</h3>
    <p>
      While setting up a newsletter for <a href="https://lettermatch.co">LetterMatch</a>, I noticed that a visitor
          to a Substack newsletter's subscribe page will sometimes see a <code>next</code> URL query parameter that
          describes where they'll be redirected after subscribing. The URL would follow the form
          <code>{`lettermatch.substack.com/subscribe?next={target_endpoint}`}</code>, where <code>{`{target_endpoint}`}</code>&nbsp;
          is
          the location to which the visitor will be directed after subscribing. <em>Note that this applies to <u>any</u>&nbsp;
            Substack newsletter, not just LetterMatch's.</em>
    </p>
    <h3>Exploitation</h3>
    <p>
      Because redirection schemes that look like this are, at times, susceptible to Open URL
          Redirection, I tried visiting the URL <code>lettermatch.substack.com/subscribe?next=https://example.com</code>&nbsp;
          and
          subscribing. After doing so, I was redirected to example.com. Now that this case was validated, I tried
          finding methods of
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
          victim's device, like when hackers <a
        href="https://www.bleepingcomputer.com/news/security/hhsgov-open-redirect-used-by-coronavirus-phishing-to-spread-malware/">exploited
        an Open Redirection vulnerability in a U.S. Department of Health & Human Services web page to install
            malware on visitors' machines</a>. A bit more detail <a
        href="/2020/2/howd-i-get-here.html#craft-the-attack">here</a>.
        </p>
    <h3>Increasing the Impact</h3>
    <p>
      Some Open Redirect vulns can also lead to <a href="https://owasp.org/www-community/attacks/xss/">Cross Site
            Scripting (XSS) attacks</a>, most often Reflected XSS attacks, if the payload or, in this case, the
          destination URL is valid
          JavaScript.
        </p>
    <p>
      Interestingly, injecting script tags as the parameter value
      didn't have an effect, but injecting
          JavaScript "URLs" of the form <code>{`javascript:{some-code-here}`}</code> as the parameter
          value results in the injected code being executed. An example of this can be found in the demo below, where I
          inject a window alert.
        </p>
    <h3>Demo</h3>
    <p>
      Here's a video demo of the this vulnerability being exploited before the patch. I don't consider it a proof of
      concept, as I demonstrate the exploitation with a benign redirection location and injected code.
        </p>
    <video controls className="w-full">
      <source src="/img/tech/substack-open-redir-poc.mp4" type="video/mp4" />
        Looks like your browser doesn't support embedded videos.
        </video>
    <h3>In Conclusion</h3>
    <p>
      I raised this issue with medium severity because of the Reflected XSS that's involved. The
      Substack team was very considerate in finding time to fix this vulnerability so quickly. They're a relatively
      small team
      with a lot of responsibilities, so their diligence was appreciated, especially as we all adapt to the
      circumstances of current events.
        </p>
    <h3>Timeline</h3>
    <p>
      <strong>Jan 28, 2020</strong> - Initial email disclosing vulnerability details<br />
      <strong>Jan 31, 2020</strong> - Response from Substack and patch of XSS<br />
      <strong>Mar 26, 2020</strong> - Notification of full patch (Open Redirect and XSS)<br />
      <strong>Mar 26, 2020</strong> - Request to fully disclose findings<br />
      <strong>Mar 30, 2020</strong> - Permission to fully disclose findings granted
      </p>
  </Post>
)