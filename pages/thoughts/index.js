import LinksPage from 'components/LinksPage'
import Link from 'components/Link'

export default () => (
  <LinksPage
    title="Thoughts"
    subtitle="Some more conclusive than others">
    <Link href="/thoughts/random">random</Link>
    <Link href="/thoughts/on-art">on art</Link>
    {/*<Link href="/thoughts/on-socialism">on socialism</Link>*/}
  </LinksPage>
)
