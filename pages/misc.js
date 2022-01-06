import LinksPage from 'components/LinksPage'
import Link from 'components/Link'

export default function Misc() {
  return (
    <LinksPage pageTitle="Misc" title="Misc" subtitle="Posts of no category">
      <Link href="/2022/1/resolutions">2022 resolutions</Link>
      <Link href="/2021/12/resolutions-in-review">
        2021 resolutions in review
      </Link>
      <Link href="/2021/2/on-balance">on balance</Link>
      <Link href="/2020/12/writing-for-expression-not-argument">
        writing for the sake of expression, not argument
      </Link>
      <Link href="/2020/11/roam-the-web-human-hive-mind">
        roam, the web, and the human hive mind
      </Link>
      <Link href="/2020/9/hidden-in-plain-sight">hidden in plain sight</Link>
      <Link href="/2020/8/the-cycle-of-human-progress">
        the cycle of human progress
      </Link>
      {/*<Link href="/2020/8/to-be-american-is-to-rebel">to be american is to rebel</Link>*/}
      <Link href="/2020/8/to-be-a-jack-of-all-trades">
        to be a jack of all trades
      </Link>
    </LinksPage>
  )
}
