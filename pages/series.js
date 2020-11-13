import LinksPage from 'components/LinksPage'
import Link from 'components/Link'

export default function SeriesPage() {
  return (
    <LinksPage
      pageTitle="Blog Series"
      title="Series"
      subtitle="Collections of a single topic">
      <Link href="/2020/11/learning-rf-signal-processing">learning rf signal processing</Link>
      <Link href="/2020/11/making-3d-art">making 3d art</Link>
      <Link href="/2019/11/learning-music-theory">learning music theory</Link>
    </LinksPage>
  )
}