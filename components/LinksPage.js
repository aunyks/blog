import Head from 'next/head'
import GAnalytics from 'components/GAnalytics'

export default function LinksPage({
  pageTitle,
  title,
  children
}) {
  return (
    <>
      <Head>
        <title>{`${pageTitle} - High Voltage`}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Gerald Nash's web log." />
        <meta name="author" content="Gerald Nash" />
        <meta name="theme-color" content="#ffffff" />
        <link href="https://fonts.googleapis.com/css?family=Fira+Mono&display=swap" rel="stylesheet" media="all" />
        <link rel="icon" type="image/png" href="https://aunyks.com/favicon.png" />
      </Head>
      <div className="h-screen flex flex-col justify-center">
        <div className="px-6 lg:px-24">
          <span className="text-6xl">⚡️</span>
          <h1 id="title">{title}</h1>
          <div id="links">
            {children}
          </div>
          <GAnalytics />
        </div>
      </div>
    </>
  )
}