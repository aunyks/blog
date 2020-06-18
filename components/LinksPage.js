import Head from 'next/head'
import GAnalytics from 'components/GAnalytics'

export default function LinksPage({
  pageTitle,
  title,
  subtitle,
  children
}) {
  return (
    <>
      <Head>
        <title>{`${pageTitle} - Hi-Voltage`}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={subtitle} />
        <meta name="author" content="Gerald Nash" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" type="image/png" href="https://aunyks.com/favicon.png" />
      </Head>
      <div className="h-screen lg:w-1/2 flex flex-col pt-32">
        <div className="px-6 lg:px-24">
          <h1 className="text-5xl">{title}</h1>
          {subtitle && <h2 className="font-bold text-xl lg:text-2xl">{subtitle}</h2>}
          <div id="links">
            {children}
          </div>
          <GAnalytics />
        </div>
      </div>
    </>
  )
}