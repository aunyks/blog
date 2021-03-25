import LinksPage from 'components/LinksPage'
import Link from 'components/Link'

export default function TechCulture() {
  return (
    <LinksPage
      pageTitle="Tech & Culture"
      title="Tech&#8596;Culture"
      subtitle="Technology is culture">
      <Link href="/2020/9/future-of-tech-for-we">the future of tech for we</Link>
      <Link href="/2020/7/3d-modeling-meets-fashion-consumers">3D modeling meets fashion consumers</Link>
      <Link href="/2020/4/techwear-cyberpunk-in-contemporary-fashion">techwear: cyberpunk in contemporary fashion</Link>
      <Link href="/2020/4/masks-will-be-the-norm">masks will be the norm</Link>
    </LinksPage>
  )
}