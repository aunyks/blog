import LinksPage from 'components/LinksPage'
import Link from 'components/Link'

export default function CategoriesPage() {
  return (
    <LinksPage pageTitle="Post Categories" title="Categories">
      <Link href="/music">music</Link>
      <Link href="/tech">tech</Link>
      <Link href="/art-n-design">art & design</Link>
      <Link href="/misc">misc</Link>
      <Link href="/tech-culture">culture&#8596;tech</Link>
      <Link href="/thoughts">thoughts</Link>
      <Link href="/notes">notes</Link>
      <Link href="https://medium.com/@aunyks">old posts</Link>
    </LinksPage>
  )
}
