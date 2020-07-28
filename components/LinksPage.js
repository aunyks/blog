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
        {pageTitle ? (
          <title>{`${pageTitle} - Hi-Voltage`}</title>
        ) : (
            <title>{`${title} - Hi-Voltage`}</title>
          )}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={subtitle} />
        <meta name="author" content="Gerald Nash" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" type="image/png" href="https://aunyks.com/favicon.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@aunyks" />
        <meta name="twitter:creator" content="@aunyks" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={subtitle} />
        <meta name="twitter:image" content="https://blog.aunyks.com/img/default-card-image.png" />
      </Head>
      <div className="h-screen lg:w-3/4 flex flex-col pt-24 lg:pt-16">
        <div className="px-6 lg:px-24">
          <h1 className="text-3xl lg:text-5xl">{title}</h1>
          {subtitle && <h2 className="font-bold text-xl lg:text-3xl mb-5 lg:mb-3">{subtitle}</h2>}
          <div id="links">
            {children}
          </div>
          <GAnalytics />
        </div>
      </div>
    </>
  )
}