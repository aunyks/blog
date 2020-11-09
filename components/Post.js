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
  hasCodeSnippet,
  hasMath,
  noFooter,
  children
}) {
  return (
    <div style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
      <PostHead
        title={title}
        subtitle={subtitle}
        description={description}
        cardImage={cardImage}
        hasCodeSnippet={hasCodeSnippet}
        hasMath={hasMath} />
      <Navbar />
      <PostBody>
        <PostHeader title={title} subtitle={subtitle} date={date} />
        {children}
        {!noFooter && (
          <PostFooter remark={remark} date={date} />
        )}
        <GAnalytics />
      </PostBody>
    </div>
  )
}