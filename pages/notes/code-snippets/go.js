import Post from 'components/CodeSnippetPost'
import CodeBlock from 'components/CodeBlock'
import CodeSnippet from 'components/CodeSnippet'

export default function GoCodeSnippets() {
  return (
    <Post
      title="Go Code Snippets"
      description="Useful bites of Go code that I often write and rewrite."
      hasCodeSnippet
    >
      <CodeSnippet title="Simple Unit Test">
        <p>
          This is what a basic unit test looks like in Go. It must exist in a file named with the form <code>*_test.go</code>,
        and the name of each test must follow the form <code>TestXxx</code> where the first letter after "Test" is capitalized.
        Execute <code>go test</code> in the terminal to run unit tests. A <code>t.Error(str)</code> is equivalent to a <code>t.Log(str)</code> followed
        by a <code>t.Fail()</code>.
      </p>
        <CodeBlock lang="go">{`
package mypackage

import "testing"

func TestSomething(t *testing.T) {
  t.Log("Testing something")
  if 1 != 2 {
    // or t.Errorf if you want C-style string format
    t.Error("We've got a problem here")
  }
}
`}</CodeBlock>
      </CodeSnippet>
    </Post>
  )
}