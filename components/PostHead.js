import Head from 'next/head'

export default function PostHead({
  title,
  subtitle,
  description,
  cardImage,
  hasCodeSnippet,
  hasMath
}) {
  const effectiveTitle = !!subtitle ? `${title}: ${subtitle}` : title
  return (
    <Head>
      <title>{effectiveTitle}</title>
      <meta key="charset" charSet="UTF-8" />
      <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta key="description" content={description} />
      <meta key="author" name="author" content="Gerald Nash" />
      <meta key="theme-color" name="theme-color" content="#ffffff" />
      <link rel="icon" type="image/png" href="https://aunyks.com/favicon.png" />
      {!!cardImage ? (
        <meta name="twitter:card" content="summary_large_image" />
      ) : (
          <meta name="twitter:card" content="summary" />
        )}
      <meta name="twitter:site" content="@aunyks" />
      <meta name="twitter:creator" content="@aunyks" />
      <meta name="twitter:title" content={effectiveTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={cardImage || 'https://blog.aunyks.com/img/default-card-image.png'} />
      <meta property="og:title" content={effectiveTitle} />
      <meta property="og:site_name" content="Hi-Voltage"></meta>
      <meta property="og:description" content={description} />
      <meta property="og:image" content={cardImage || 'https://blog.aunyks.com/img/default-card-image.png'} />
      {hasMath && (
        <>
          <link href="/css/katex.css" rel="stylesheet" />
        </>
      )}
      {hasCodeSnippet && (
        <>
          {/* Find supported languages here: https://prismjs.com/#supported-languages */}
          {/* Find their CDN links here: https://prismjs.com/#basic-usage-cdn */}
          <link href="/css/prism.css" rel="stylesheet" />
          <script>{`
          window.Prism = window.Prism || {};
          window.Prism.manual = true;     
          `}</script>
          <script src="/js/prism-core.min.js"></script>
          <script src="/js/prism-clike.min.js"></script>
          <script src="/js/prism-javascript.min.js"></script>
          <script src="/js/prism-python.min.js"></script>
          <script src="/js/prism-rust.min.js"></script>
          <script src="/js/prism-markup.min.js"></script>
          <script src="/js/prism-go.min.js"></script>
          <script src="/js/prism-jsx.min.js"></script>
        </>
      )}
    </Head>
  )
}