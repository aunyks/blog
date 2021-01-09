import PostHead from 'components/PostHead'
import Navbar from 'components/Navbar'
import PostHeader from 'components/PostHeader'
import PostBody from 'components/PostBody'
import PostFooter from 'components/PostFooter'
import Web3TipBox from 'components/Web3TipBox'
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
    <div style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
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
        <PostHeader title={title} subtitle={subtitle} date={date} />
        {children}
        <Web3TipBox />
        {!noFooter && (
          <PostFooter remark={remark} date={date} />
        )}
        <GAnalytics />
      </PostBody>
    </div>
  )
}