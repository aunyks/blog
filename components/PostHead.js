import Head from 'next/head'

export default function PostHead({
  title,
  subtitle,
  description,
  cardImage
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
      <link href="https://fonts.googleapis.com/css?family=Fira+Mono&amp;display=swap" rel="stylesheet" media="all" async />
      <link rel="icon" type="image/png" href="https://aunyks.com/favicon.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@aunyks" />
      <meta name="twitter:creator" content="@aunyks" />
      <meta name="twitter:title" content={effectiveTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={cardImage} />
    </Head>
  )
}