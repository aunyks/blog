import Head from 'next/head'
import GAnalytics from 'components/GAnalytics'

export default function LinksPage({
  pageTitle,
  title,
  subtitle,
  children
}) {
  const effectiveTitle = pageTitle ? `${pageTitle} - Hi-Voltage` : `${title} - Hi-Voltage`
  return (
    <>
      <Head>
        <title>{effectiveTitle}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={subtitle} />
        <meta name="author" content="Gerald Nash" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@aunyks" />
        <meta name="twitter:creator" content="@aunyks" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={subtitle} />
        <meta name="twitter:image" content="https://blog.aunyks.com/img/default-card-image.png" />
      </Head>
      <main className="h-screen lg:w-3/4 flex flex-col pt-24 lg:pt-16">
        <article className="px-6 lg:px-24">
          <header>
            <h1 className="text-3xl lg:text-5xl">{title}</h1>
            {subtitle && <h2 className="font-bold text-xl lg:text-3xl mb-2 lg:mb-0">{subtitle}</h2>}
          </header>
          <ul id="links" className="list-none">
            {children}
          </ul>
          <GAnalytics />
        </article>
      </main>
    </>
  )
}