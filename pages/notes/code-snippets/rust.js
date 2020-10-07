import Post from 'components/CodeSnippetPost'
import CodeBlock from 'components/CodeBlock'
import CodeSnippet from 'components/CodeSnippet'

export default () => (
  <Post
    title="Rust Code Snippets"
    description="Useful bites of Rust code that I often write and rewrite."
    hasCodeSnippet
  >
    <CodeSnippet title="Simple Unit Test">
      <p>
        These are basic unit tests in Rust. They often populate the same file as
        the functions and modules they're built to test. You can run them by executing <code>cargo test</code> in
        the terminal.
      </p>
      <CodeBlock lang="rust">{`
fn add_one(num: u16) -> u16 {
  num + 1
}

fn sub_one(num: u16) -> u16 {
  num - 1
}

#[cfg(test)]
mod test_operations {
  #[test]
  fn test_add_one() {
    assert_eq!(super::add_one(2), 3);
  }

  #[test]
  fn test_sub_one() {
    assert_eq!(super::sub_one(2), 1);
  }
}
`}</CodeBlock>
    </CodeSnippet>
  </Post>
)