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
  cardImage,
  hasMath,
  hasDiagram,
  hasCodeSnippet,
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
      <PostBody>
        <div style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
          <PostHeader title={title} subtitle={subtitle} date={date} />
          {children}
          {!noFooter && (
            <PostFooter remark={remark} date={date} />
          )}
        </div>
        <GAnalytics />
      </PostBody>
    </>
  )
}