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
      </Head>
      <Navbar />
      <style>{`
        #__next {
          height: 100vh;
        }
      `}</style>
      <main className="w-full h-full">
        <section className="flex flex-col justify-center w-full h-full" style={{ background: 'red' }}>
          <div id="greeting" className="px-3 lg:px-24 mt-20">
            <h1 className="text-4xl">
              Hi-Voltage
          </h1>
            <h2 className="text-xl">
              Increasing potential
          </h2>
          </div>
        </section>
      </main>
    </>
  )
}
