import LinksPage from 'components/LinksPage'
import Link from 'components/Link'

export default () => (
  <LinksPage
    pageTitle="Vulnerability Writeups"
    title="Vuln Writeups"
    subtitle="Some security vulnerabilities I've found">
    <Link href="/2020/3/substack-open-redirect">substack open url redirection / reflected xss</Link>
    <Link href="/2020/3/replit-open-redirect">repl.it open url redirection</Link>
  </LinksPage>
)