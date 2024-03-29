import { useEffect } from 'react'
import Head from 'next/head'
import Navbar from 'components/Navbar'
import Hint from 'components/Hint'
import { CardBox } from 'components/Link'

export default function AboutPage() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js', { scope: '/' })
    }
  }, [])
  return (
    <>
      <Head>
        <title>About - Hi-Voltage</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="On the journey to increase potential."
        />
        <meta name="author" content="Gerald Nash" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@aunyks" />
        <meta name="twitter:creator" content="@aunyks" />
        <meta name="twitter:title" content="About - Hi-Voltage" />
        <meta
          name="twitter:description"
          content="On the journey to increase potential."
        />
        <meta
          name="twitter:image"
          content="https://blog.aunyks.com/img/default-card-image.png"
        />
        <link rel="apple-touch-icon" href="/pwa/icon-192x192.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Navbar />
      <main className="px-3 lg:px-24 w-full lg:w-3/4 pt-16 lg:pt-16">
        <h1>Increasing potential</h1>
        <p>
          Hi-Voltage is{' '}
          <a href="https://aunyks.com/about" target="_blank">
            my
          </a>{' '}
          blog, my digital garden, if you will. It's my place to write, record,
          discuss, and document whatever I feel like. Feel free to look around.
          If you wanna talk about something,{' '}
          <a href="https://aunyks.com/contact" target="_blank">
            hit me up
          </a>
          .
        </p>
        <p>
          "Increasing potential" is a reference to both the electromotive force
          in physics (hence the lightning bolt) and also to human growth. To
          gain knowledge, skill, wisdom, and experience is to increase your
          potential as a person.
        </p>
        <p>
          When looking for posts, you'll probably see a white box in the corner
          of a post. If the box has a{' '}
          <Hint title="As in..." msg="If it just looks like a plain white box">
            white outline
          </Hint>
          , it's a normal text post. If it has a yellow outline, it's part of a
          series. If it has an indigo outline, it's a video post.
        </p>
        <style jsx>{`
          li {
            list-style: none;
          }
        `}</style>
        <ul className="my-4 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 list-none">
          <li>
            <CardBox postExample /> Text
          </li>
          <li>
            <CardBox series /> Series
          </li>
          <li>
            <CardBox video /> Video
          </li>
        </ul>
      </main>
    </>
  )
}
