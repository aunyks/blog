import Post from 'components/Post'

export default function CodeSnippetPost({
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
      hasCodeSnippet={true}
    >
      <p>
        <i>
          You may be able to try some of this code out in your browser at <a href="https://repl.it/languages">Repl.it</a>.
        </i>
      </p>
      {children}
    </Post>
  )
}