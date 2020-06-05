import LinksPage from '../components/LinksPage'
import Link from '../components/Link'

export default () => (
  <LinksPage
    pageTitle="Blog"
    title="web log">
    <Link href="/music">music</Link>
    <Link href="/tech">tech</Link>
    <Link href="https://trustless.science">culture{`<>`}tech</Link>
  </LinksPage>
)
