import Head from 'next/head'
import Navbar from 'components/Navbar'

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About - Hi-Voltage</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="On the journey to increase potential." />
        <meta name="author" content="Gerald Nash" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@aunyks" />
        <meta name="twitter:creator" content="@aunyks" />
        <meta name="twitter:title" content="About - Hi-Voltage" />
        <meta name="twitter:description" content="On the journey to increase potential." />
        <meta name="twitter:image" content="https://blog.aunyks.com/img/default-card-image.png" />
      </Head>
      <Navbar />
      <article className="px-3 lg:px-24 w-full lg:w-3/4 pt-16 lg:pt-16">
        <h1>Increasing potential</h1>
        <p>
          Hi-Voltage is <a href="https://aunyks.com/about" target="_blank">my</a> blog. It's my place to
        write, record, discuss, and document whatever I feel like. Feel free to look around. If
        you wanna talk about something, <a href="https://aunyks.com/contact" target="_blank">hit me up</a>.
      </p>
        <p>
          "Increasing potential" is a double entendre. It's a reference to the electromotive force in physics.
          It's also a reference human growth. A key to life is to always be growing and changing.
          And, to gain knowledge, skill, wisdom, and experience along the way is to increase your potential as a person.
      </p>
      </article>
    </>
  )
}