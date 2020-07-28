import Post from 'components/Post'

export default function ThoughtsPost({
  title,
  subtitle,
  date,
  description,
  noFooter,
  children
}) {
  return (
    <Post
      title={title}
      subtitle={subtitle}
      date={date}
      description={description}
      noFooter={noFooter}
    >
      {children}
    </Post>
  )
}