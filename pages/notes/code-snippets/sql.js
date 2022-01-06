import CodeSnippetPost from 'components/CodeSnippetPost'
import CodeBlock from 'components/CodeBlock'
import CodeSnippet from 'components/CodeSnippet'

export default function SQLCodeSnippets() {
  return (
    <CodeSnippetPost
      title="SQL Code Snippets"
      description="Useful bites of SQL code that I often write and rewrite.">
      <p>
        I strongly recommend owning / reading{' '}
        <a
          target="_blank"
          href="https://www.goodreads.com/book/show/173346.Sams_Teach_Yourself_SQL_in_10_Minutes">
          Sam's Teach Yourself SQL in 10 Minutes
        </a>
        . It's the only book on a programming language that I recommend actually
        owning a copy of.
      </p>
      <CodeSnippet title="Delete a Table">
        <p>
          Deletes <code>my_table</code> and all of its data.
        </p>
        <CodeBlock lang="sql">{`
DROP TABLE my_table;
`}</CodeBlock>
      </CodeSnippet>
      <CodeSnippet title="Delete Rows that Satisfy a Condition">
        <p>
          Deletes all rows in <code>my_table</code> that have a{' '}
          <code>column_b</code> value equal to <code>-3</code>.
        </p>
        <CodeBlock lang="sql">{`
DELETE FROM my_table
WHERE column_b = -3;
`}</CodeBlock>
      </CodeSnippet>
      <CodeSnippet title="Update Rows that Satisfy a Condition">
        <p>
          Updates all rows in <code>my_table</code> with <code>column_b</code>{' '}
          equal to <code>5</code>
          so that their <code>column_a</code> now equals{' '}
          <code>'no longer cool'</code> and <code>column_b</code> now equals{' '}
          <code>-3</code>.
        </p>
        <CodeBlock lang="sql">{`
UPDATE my_table
SET column_a = 'no longer cool'
    column_b = -3
WHERE column_b = 5;
`}</CodeBlock>
      </CodeSnippet>
      <CodeSnippet title="Get Rows that Satisfy a Condition">
        <p>
          Retrieves <code>column_a</code> and <code>column_b</code> of every row
          in <code>my_table</code> which has a <code>column_a</code> value equal
          to <code>'this is cool'</code>.
        </p>
        <CodeBlock lang="sql">{`
SELECT (column_a, column_b)
FROM my_table
WHERE column_a = 'this is cool';
`}</CodeBlock>
      </CodeSnippet>
      <CodeSnippet title="Get Certain Columns of Every Row">
        <p>
          Retrieves <code>column_a</code> and <code>column_b</code> of every row
          in <code>my_table</code>.
        </p>
        <CodeBlock lang="sql">{`
SELECT (column_a, column_b) FROM my_table;
`}</CodeBlock>
      </CodeSnippet>
      <CodeSnippet title="Get Every Column of Every Row">
        <p>
          Retrieves every column of every row in <code>my_table</code>.
        </p>
        <CodeBlock lang="sql">{`
SELECT * FROM my_table;
`}</CodeBlock>
      </CodeSnippet>
      <CodeSnippet title="Insert a Row">
        <p>
          Adds data to <code>my_table</code>. This statement would still
          function with <code>column_a</code> and <code>'this is cool'</code>{' '}
          removed, since <code>column_a</code> can be <code>NULL</code> (see
          below).
        </p>
        <CodeBlock lang="sql">{`
INSERT my_table(
  column_a,
  column_b
) VALUES (
  'this is cool',
  5
);
`}</CodeBlock>
      </CodeSnippet>
      <CodeSnippet title="Create a Table">
        <p>
          Creates a new table called <code>my_table</code>, asuming it does not
          already exist. <code>column_a</code> can contain strings up to 500
          characters in length or <code>NULL</code>. And, <code>column_b</code>{' '}
          can only contain integers.
        </p>
        <CodeBlock lang="sql">{`
CREATE TABLE IF NOT EXISTS my_table (
  column_a VARCHAR(500),
  column_b INTEGER NOT NULL
);
`}</CodeBlock>
      </CodeSnippet>
    </CodeSnippetPost>
  )
}
