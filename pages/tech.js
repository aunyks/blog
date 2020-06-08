import LinksPage from 'components/LinksPage'
import Link from 'components/Link'

export default () => (
  <LinksPage
    pageTitle="Tech Blog"
    title="tech blog">
    <Link href="/2019/11/how-hacking-works">how hacking works</Link>
    <Link href="/2020/2/howd-i-get-here">how'd i get here?</Link>
    <Link href="/2020/3/replit-open-redirect">vuln writeup: repl.it</Link>
    <Link href="/2020/3/substack-open-redirect">vuln writeup: substack</Link>
    <Link href="/2020/6/little-internets">little internets</Link>
  </LinksPage>
)