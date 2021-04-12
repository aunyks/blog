import PostHead from 'components/PostHead'
import Navbar from 'components/Navbar'
import PostBody from 'components/PostBody'
import Video from 'components/Video'
import PostFooter from 'components/PostFooter'
import GAnalytics from 'components/GAnalytics'

function VideoPostHeader({
  title,
  subtitle,
  date
}) {
  let month = null
  let year = null
  let day = null
  if (date) {
    const d = new Date(date)
    year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
    month = new Intl.DateTimeFormat('en', { month: 'long' }).format(d)
    day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
    day = parseInt(day) + 1
  }

  return (
    <header className="mt-2">
      <h1 className="mt-2 lg:mt-0 leading-tight text-xl lg:text-4xl">{title}</h1>
      {subtitle && (
        <h2 className="leading-none text-sm lg:text-xl">{subtitle}</h2>
      )}
      {date && <time className="text-sm lg:text-xl" dateTime={date}>{`${month} ${day}, ${year}`}</time>}
    </header>
  )
}

export default function VideoPost({
  title,
  subtitle,
  date,
  description,
  remark,
  cardImage,
  poster,
  hasMath,
  hasDiagram,
  hasCodeSnippet,
  wide,
  src,
  fallback,
  links,
  noFooter,
  children
}) {
  return (
    <>
      <PostHead
        title={title}
        subtitle={subtitle}
        description={description}
        cardImage={poster && (`https://blog.aunyks.com${poster}`) || cardImage}
        hasMath={hasMath}
        hasDiagram={hasDiagram}
        hasCodeSnippet={hasCodeSnippet} />
      <Navbar />
      <PostBody wide={true}>
        <div style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
          <Video
            src={src}
            poster={poster}
          >
            {fallback}
          </Video>
          <VideoPostHeader title={title} subtitle={subtitle} date={date} />
          {!!links && (
            < details>
              <summary className="text-sm lg:text-md">Links</summary>
              <ul>
                {Object.keys(links).map(linkName => (
                  <li className="list-none"><a className="text-sm lg:text-md" target="_blank" href={links[linkName]}>{linkName}</a></li>
                ))}
              </ul>
            </details>
          )}
          <hr className="mt-2" style={{ marginBottom: '0.75em' }} />
          {children}
          {!noFooter && (
            <PostFooter remark={remark || (
              <>
                Thanks for watching. Feel free to follow me on <a href="https://twitter.com/intent/follow?screen_name=aunyks">Twitter</a> if you have any
              questions about this post or just wanna chat.
              </>
            )} date={date} />
          )}
        </div>
        <GAnalytics />
      </PostBody>
    </>
  )
}