import Post from 'components/Post'

export default function NotesPost(props) {
  return (
    <Post {...props}>
      <p>
        <i>
          This is a notes post and may not be as easy to follow as a de facto
          blog post.
        </i>
      </p>
      {props.children}
    </Post>
  )
}
