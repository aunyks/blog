import CodeSnippetPost from 'components/CodeSnippetPost'
import CodeBlock from 'components/CodeBlock'
import CodeSnippet from 'components/CodeSnippet'

export default function RustCodeSnippets() {
  return (
    <CodeSnippetPost
      title="Rust Code Snippets"
      description="Useful bites of Rust code that I often write and rewrite."
      hasCodeSnippet>
      <CodeSnippet title="Generic 1D Complementary Filter">
        <p>
          A simple complementary filter that can be used to smoothen noisy
          signals / inputs.
        </p>
        <CodeBlock lang="rust">{`
// Use as such:
// let initial_value = 1.0;
// let alpha = 0.8;
// let x_k = 2.0;

// let mut comp_filter: ComplementaryFilter<f32> =
//     ComplementaryFilter::new(initial_value, alpha);

// let next_value = comp_filter.predict_next(x_k);
#[derive(Copy, Clone)]
pub struct ComplementaryFilter<T>
where
    T: Add<T, Output = T> + Mul<T, Output = T> + Mul<f32, Output = T> + Copy,
{
    /// y_(k - 1)
    current_value: T,
    alpha: f32,
}

impl<T> ComplementaryFilter<T>
where
    T: Add<T, Output = T> + Mul<T, Output = T> + Mul<f32, Output = T> + Copy,
{
    pub fn new(initial_value: T, alpha: f32) -> Self {
        ComplementaryFilter {
            current_value: initial_value,
            alpha: alpha,
        }
    }
    
    pub fn set_alpha(&mut self, new_alpha: f32) {
        self.alpha = new_alpha;
    }
    
    pub fn predict_next(&mut self, value: T) -> T {
        let y_k = (value * self.alpha) + (self.current_value * (1.0 - self.alpha));
        self.current_value = y_k;
        y_k
    }
}
`}</CodeBlock>
      </CodeSnippet>
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
