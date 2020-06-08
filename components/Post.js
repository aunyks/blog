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
  children
}) {
  return (
    <>
      <PostHead
        title={title}
        subtitle={subtitle}
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