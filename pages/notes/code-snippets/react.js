import Post from 'components/NotesPost'
import CodeBlock from 'components/CodeBlock'
import CodeSnippet from 'components/CodeSnippet'

export default () => (
  <Post
    title="React.js Code Snippets"
    description="Useful bites of React code that I find often write and rewrite."
    hasCodeSnippet
  >
    <CodeSnippet title="Simple Line Chart">
      <p>
        Make a line chart from with domain 0 to 1 and range from y<sub>min</sub> to y<sub>max</sub>. With red line.
    </p>
      <CodeBlock lang="jsx">{`
import { VictoryChart, VictoryLine } from 'victory'

<VictoryChart>
  <VictoryLine
  style={{ data: { stroke: "red" } }}
    y={({x}) => Math.sin(5 * Math.PI * x)}
  />
</VictoryChart>
    `}</CodeBlock>
    </CodeSnippet>
    <CodeSnippet title="Line Chart with Custom Domain">
      <p>
        In case you want to see more than just x at the interval [0, 1].
    </p>
      <CodeBlock lang="jsx">{`
import { VictoryChart, VictoryLine } from 'victory'

<VictoryChart>
  <VictoryAxis
    dependentAxis
    domain={[-2, 2]}
    label="Frequency (Hz)"
  />
  <VictoryAxis
    label="Time (ms)"
  />
  <VictoryLine
    data={range(0, 2 * Math.PI, 0.01).map((x) => ({ x }))}
    y={({ x }) => Math.sin(2 * x)}
  />
</VictoryChart>
`}</CodeBlock>
    </CodeSnippet>
    <CodeSnippet title="Line Chart for Parametric Functions">
      <p>
        For when x and y values are dependent on a third value.
    </p>
      <CodeBlock lang="jsx">{`
import { VictoryChart, VictoryLine } from 'victory'

<VictoryChart>
  <VictoryLine
    data={range(0, 2 * Math.PI, 0.01).map((t) => ({ t }))}
    sortKey="t"
    x={({ t }) => Math.sin(3 * t + (2 * Math.PI))}
    y={({ t }) => Math.sin(2 * t)}
  />
</VictoryChart>
`}</CodeBlock>
    </CodeSnippet>
  </Post>
)