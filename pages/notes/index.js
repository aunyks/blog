import LinksPage from 'components/LinksPage'
import Link from 'components/Link'

export default function NotesPage() {
  return (
    <LinksPage
      title="Notes">
      <Link href="/notes/code-snippets">code snippets</Link>
      <Link href="/notes/frequency-reference">radio frequency reference</Link>
      <Link href="/notes/applied-dsp">applied digital signal processing</Link>
    </LinksPage>
  )
}