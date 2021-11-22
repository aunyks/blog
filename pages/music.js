import LinksPage from 'components/LinksPage'
import Link from 'components/Link'

export default function Music() {
  return (
    <LinksPage
      pageTitle="Music"
      title="Music"
      subtitle="Meditations on sonic art">
      <Link href="/2021/11/you-wouldnt-download-a-guitar-right">
        you wouldn't download a guitar, right?
      </Link>
      <Link href="/2020/12/a-brief-lesson-on-gogo">a brief lesson on gogo</Link>
      <Link href="/2020/10/music-is-a-language">music is a language</Link>
      <Link href="/2020/9/instruments-on-the-web">instruments on the web</Link>
      <Link href="/2020/8/intro-to-aleatoric-music">
        intro to aleatoric music
      </Link>
      <Link href="/2019/12/key" series>
        key
      </Link>
      <Link href="/2019/11/musical-scales" series>
        musical scales
      </Link>
      <Link href="/2019/11/the-octave" series>
        the octave
      </Link>
      <Link href="/2019/11/learning-music-theory" series>
        learning music theory
      </Link>
    </LinksPage>
  )
}
