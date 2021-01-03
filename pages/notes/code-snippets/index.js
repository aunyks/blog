import LinksPage from 'components/LinksPage'
import Link from 'components/Link'

export default function CodeSnippetsPage() {
  return (
    <LinksPage
      title="Code Snippets"
      subtitle="Small bites of code">
      <Link href="/notes/code-snippets/rust">rust</Link>
      <Link href="/notes/code-snippets/go">go</Link>
      <Link href="/notes/code-snippets/javascript">javascript</Link>
      <Link href="/notes/code-snippets/react">react.js</Link>
      <Link href="/notes/code-snippets/python">python</Link>
      <Link href="/notes/code-snippets/sql">sql</Link>
    </LinksPage>
  )
}