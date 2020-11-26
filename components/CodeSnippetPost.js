import Post from 'components/Post'

export default function CodeSnippetPost(props) {
  return (
    <Post
      {...props}
      hasCodeSnippet={true}
    >
      <p>
        <i>
          You may be able to try some of this code out in your browser at <a href="https://repl.it/languages">Repl.it</a>.
        </i>
      </p>
      {props.children}
    </Post>
  )
}