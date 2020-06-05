import PostHead from './PostHead'
import Navbar from './Navbar'
import PostHeader from './PostHeader'
import PostBody from './PostBody'
import PostFooter from './PostFooter'
import GAnalytics from './GAnalytics'

export default function Post({
  title,
  subtitle,
  date,
  description,
  remark,
  cardImage,
  children
}) {
  return (
    <>
      <PostHead
        title={title}
        description={description}
        cardImage={cardImage} />
      <Navbar />
      <PostBody>
        <PostHeader title={title} subtitle={subtitle} date={date} />
        {children}
        <PostFooter remark={remark} date={date} />
        <GAnalytics />
      </PostBody>
    </>
  )
}