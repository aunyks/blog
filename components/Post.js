import PostHead from 'components/PostHead'
import Navbar from 'components/Navbar'
import PostHeader from 'components/PostHeader'
import PostBody from 'components/PostBody'
import PostFooter from 'components/PostFooter'
import GAnalytics from 'components/GAnalytics'

export default function Post({
  title,
  subtitle,
  date,
  description,
  remark,
  lang,
  textDirection,
  cardImage,
  hasMath,
  hasDiagram,
  hasCodeSnippet,
  wide,
  noFooter,
  children
}) {
  return (
    <>
      <PostHead
        title={title}
        subtitle={subtitle}
        description={description}
        cardImage={cardImage}
        hasMath={hasMath}
        hasDiagram={hasDiagram}
        hasCodeSnippet={hasCodeSnippet} />
      <Navbar />
      <PostBody wide={wide} lang={lang} textDirection={textDirection}>
        <div style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
          <PostHeader lang={lang} textDirection={textDirection} title={title} subtitle={subtitle} date={date} />
          {children}
          {!noFooter && (
            <PostFooter lang={lang} textDirection={textDirection} remark={remark} date={date} />
          )}
        </div>
        <GAnalytics />
      </PostBody>
    </>
  )
}