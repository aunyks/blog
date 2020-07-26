import LinksPage from 'components/LinksPage'
import Link from 'components/Link'

export default () => (
  <LinksPage
    pageTitle="Home"
    title="Hi-Voltage"
    subtitle="Increasing potential">
    <Link href="/music">music</Link>
    <Link href="/tech">tech</Link>
    <Link href="/tech-culture">culture{`<>`}tech</Link>
    <Link href="/thoughts">thoughts</Link>
    <Link href="/notes">notes</Link>
  </LinksPage>
)
