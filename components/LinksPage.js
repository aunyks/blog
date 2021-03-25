import Head from 'next/head'
import GAnalytics from 'components/GAnalytics'
import Navbar from 'components/Navbar'

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
      <Navbar />
      <style>{`
        /* FOR LinksPage.js */
        #link-pg-header {
          color: black;
          background: #fab700;
        }

        @media (prefers-color-scheme: dark) {
          #link-pg-header {
            color: white;
            background: #5d44f8;
          }
        }

        /* FOR Link.js */
        .link-item {
          height: 200px;
        }

        .link-article {
          color: white;
          background: black;
          border-radius: 7px;
          transition: all 0.2s ease;
        }

        .link-article:hover, .link-article:focus {
          transform: scale(1.05);
          transform-origin: center;
          box-shadow: 0 10px 25px 0 rgb(45 49 50 / 60%);
          filter: brightness(115%);
        }

        .card-title {
          text-transform: capitalize;
        }

        .card-footer {
          bottom: 20px;
        }

        .card-footer-block {
          fill: white;
          width: 30px;
          height: 30px;
          transition: all 0.7s ease;
          /*transition-delay: 0.25s;*/
        }

        .link-article:hover .card-footer-block, .link-article:focus .card-footer-block {
          transform: rotate(360deg);
        }

        @media (prefers-color-scheme: dark) {
          .link-article {
            color: white;
            background: #333;
          }
        }
      `}</style>
      <main className="h-screen w-full flex flex-col">
        <header id="link-pg-header" className="pt-16 lg:pt-24 pb-4 lg:pb-8 px-6 lg:px-24 w-full">
          <h1 className="font-bold text-3xl lg:text-5xl">{title}</h1>
          {subtitle && <h2 className="font-normal text-lg lg:text-2xl mb-2 lg:mb-0">{subtitle}</h2>}
        </header>
        <ul id="links" className="list-none px-6 lg:px-24 py-8 grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-4">
          {children}
        </ul>
        <GAnalytics />
      </main>
    </>
  )
}