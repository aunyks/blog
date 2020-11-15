import LinksPage from 'components/LinksPage'
import Link from 'components/Link'

export default function Tech() {
  return (
    <LinksPage
      pageTitle="Tech"
      title="Tech"
      subtitle="Writeups, research, and realizations">
      <Link href="/2020/11/demodulating-iq-data">demodulating i/q data</Link>
      <Link href="/2020/11/understanding-complex-signals">understanding complex signals</Link>
      <Link href="/2020/10/why-i-care-about-radio">why i care about radio</Link>
      <Link href="/2020/10/last-minute-downlink">last minute downlink</Link>
      <Link href="/2020/8/my-school-map-sucks">my school map sucks</Link>
      <Link href="/2020/6/mixed-reality-in-transit">mixed reality in transit</Link>
      <Link href="/2020/6/little-internets">little internets</Link>
      <Link href="/tech/vuln-writeups">vuln writeups</Link>
      <Link href="/2020/2/howd-i-get-here">how'd i get here?</Link>
      <Link href="/2019/11/how-hacking-works">how hacking works</Link>
    </LinksPage>
  )
}