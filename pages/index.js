import Head from 'next/head'
import Navbar from 'components/Navbar'

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Hi-Voltage</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Increasing potential" />
        <meta name="author" content="Gerald Nash" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@aunyks" />
        <meta name="twitter:creator" content="@aunyks" />
        <meta name="twitter:title" content="Hi-Voltage" />
        <meta name="twitter:description" content="Increasing potential" />
        <meta name="twitter:image" content="https://blog.aunyks.com/img/default-card-image.png" />
        <link rel="stylesheet" href="/css/homepage.css" />
      </Head>
      <Navbar />
      <div className="layer-container">
        <main className="layer w-full h-full">
          <section id="greeting-section" className="flex flex-col justify-end lg:justify-center w-full h-full">
            <div id="greeting" className="px-3 lg:px-24 my-20">
              <h1 className="text-3xl lg:text-5xl">
                Hi-Voltage
          </h1>
              <h2 className="text-lg lg:text-3xl">
                Increasing potential
          </h2>
            </div>
          </section>
        </main>
        <div id="loading-screen" className="layer">
          {/*<h1>Loading...</h1>*/}
        </div>
        <div className="layer invisible game-viewport">
          <canvas id="game-canvas"></canvas>
        </div>
      </div>
      <script type="module" src="/js/homepage.js"></script>
    </>
  )
}
