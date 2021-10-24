import Post from 'components/Post'

export default function CodeSnippetPost(props) {
  return (
    <Post
      {...props}
      hasCodeSnippet
    >
      {props.children}
    </Post>
  )
}