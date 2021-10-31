import NotesPost from 'components/NotesPost'
import CodeBlock from 'components/CodeBlock'
import CodeSnippet from 'components/CodeSnippet'

export default function FFmpegNotes() {
  return (
    <NotesPost
      title="Regular Expressions"
      description="Some regexs that I find useful and / or interesting."
      hasCodeSnippet>
      <p>
        These are some regular expressions that I find useful and / or
        interesting. Test them out using{' '}
        <a href="https://regex101.com" target="_blank">
          regex101.com
        </a>
        's debugger, and learn more about regexs at{' '}
        <a href="https://www.regular-expressions.info" target="_blank">
          regular-expressions.info
        </a>
        .
      </p>
      <h2>Expressions</h2>
      <CodeSnippet title="Accept HTML-Style Tags">
        <p>
          This accepts any HTML-style markup tags. The first capture group is
          the tag name, and the second is the text inside of the tag. At the
          moment, tag names can't have numbers, and tags can't have attributes.
        </p>
        <CodeBlock lang="javascript" noButton showCodeByDefault>{`
/<([a-zA-Z]+)>\\s*(.*?)\\s*<\\/\\1>/
`}</CodeBlock>
      </CodeSnippet>
    </NotesPost>
  )
}
