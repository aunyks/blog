import Post from 'components/Post'

export default function NotesPost({
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
      <p>
        <i>
          This is a notes post and may not be as easy to follow as a de facto blog post.
        </i>
      </p>
      {children}
    </Post>
  )
}