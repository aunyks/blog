import CodeSnippetPost from 'components/CodeSnippetPost'
import CodeBlock from 'components/CodeBlock'
import CodeSnippet from 'components/CodeSnippet'

export default function RustCodeSnippets() {
  return (
    <CodeSnippetPost
      title="Rust Code Snippets"
      description="Useful bites of Rust code that I often write and rewrite."
      hasCodeSnippet>
      <CodeSnippet title="Basic Finite State Machine">
        <p>
          A simple, finite state machine. I strongly recommend using an{' '}
          <code>enum</code> as <code>T</code>.
        </p>
        <CodeBlock lang="rust">{`
#[derive(Debug)]
pub struct StateMachine<T> {
    state: T,
}

impl<T> StateMachine<T> {
    pub fn new(initial_state: T) -> Self {
        Self {
            state: initial_state,
        }
    }

    pub fn transition_to(&mut self, new_state: T) {
        self.state = new_state;
    }

    pub fn current_state(&self) -> &T {
        &self.state
    }
}
`}</CodeBlock>
      </CodeSnippet>
      <CodeSnippet title="Basic Queue">
        <p>
          A simple, vector-based queue data structure and related behaviors. Use{' '}
          <code>enqueue()</code> to add an element to the end of the queue and{' '}
          <code>dequeue()</code>
          to remove an element from the front of the queue.
        </p>
        <CodeBlock lang="rust">{`
#[derive(Default)]
pub struct Queue<T> {
    queue: Vec<T>,
}

impl<T> Queue<T> {
    /// Create an empty queue with a capacity of 0.
    pub fn new() -> Self {
        Queue { queue: Vec::new() }
    }

    /// Create a queue with a provided initial capacity, 
    /// immediately allocating enough memory to contain a 'cap' amount 
    /// of T's.
    pub fn with_capacity(cap: usize) -> Self {
        Queue {
            queue: Vec::with_capacity(cap),
        }
    }

    /// The capacity of the queue. Enqueuing 
    /// more than the capacity results in a memory 
    /// allocation.
    pub fn capacity(&self) -> usize {
        self.queue.capacity()
    }

    /// How many elements are currently in the queue.
    pub fn size(&self) -> usize {
        self.queue.len()
    }

    pub fn enqueue(&mut self, item: T) {
        self.queue.push(item)
    }

    pub fn dequeue(&mut self) -> T {
        self.queue.remove(0)
    }

    pub fn is_empty(&self) -> bool {
        self.queue.is_empty()
    }

    pub fn peek(&self) -> Option<&T> {
        self.queue.first()
    }
}
`}</CodeBlock>
      </CodeSnippet>
      <CodeSnippet title="Simple Unit Test">
        <p>
          These are basic unit tests in Rust. They often populate the same file
          as the functions and modules they're built to test. You can run them
          by executing <code>cargo test</code> in the terminal.
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
    </CodeSnippetPost>
  )
}
