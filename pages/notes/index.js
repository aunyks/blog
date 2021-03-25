import LinksPage from 'components/LinksPage'
import Link from 'components/Link'

export default function NotesPage() {
  return (
    <LinksPage
      title="Notes">
      <Link href="/notes/code-snippets">code snippets</Link>
      <Link href="/notes/frequency-reference">radio frequency reference</Link>
      <Link href="/notes/applied-dsp">applied digital signal processing</Link>
      <Link href="/notes/web-game-dev">web game dev</Link>
      <Link href="/notes/ffmpeg">FFmpeg</Link>
      <Link href="/notes/electronics">electronics</Link>
    </LinksPage>
  )
}