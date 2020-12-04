import CodeSnippetPost from 'components/CodeSnippetPost'
import CodeBlock from 'components/CodeBlock'
import CodeSnippet from 'components/CodeSnippet'

export default function ReactCodeSnippets() {
  return (
    <CodeSnippetPost
      title="React.js Code Snippets"
      description="Useful bites of React code that I often write and rewrite."
    >
      <CodeSnippet title="useDarkMode Hook">
        <p>
          A React hook for tracking and detecting the browser dark mode state.
      </p>
        <CodeBlock lang="jsx">{`
import {
  useState,
  useEffect
} from 'react'

const useDarkMode = () => {
  const [isDark, setDark] = useState(false)

  useEffect(() => {
    const onDarkModeChange = ({ matches }) => {
      setDark(matches)
    }
    setDark(window.matchMedia('(prefers-color-scheme: dark)').matches)

    try {
      // For Chrome / FireFox
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', onDarkModeChange)
    } catch (e) {
      // For Safari
      window.matchMedia('(prefers-color-scheme: dark)').addListener(onDarkModeChange)
    }

    return () => {
      try {
        // For Chrome / FireFox
        window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', onDarkModeChange)
      } catch (e) {
        // For Safari
        window.matchMedia('(prefers-color-scheme: dark)').removeListener(onDarkModeChange)
      }
    }
  }, [])

  return isDark
}

export default useDarkMode
`}</CodeBlock>
      </CodeSnippet>
      <CodeSnippet title="useDeviceSize Hook">
        <p>
          A React hook for tracking and retrieving the device size.
      </p>
        <CodeBlock lang="jsx">{`
import {
  useState,
  useEffect
} from 'react'

const getDeviceSizeFromWidth = (width) => {
  if(width < 640) {
    return 'xs'
  } else if(width < 768) {
    return 'sm'
  } else if(width < 1024) {
    return 'md'
  } else if(width < 1280) {
    return 'lg'
  } else if(width < 1536) {
    return 'xl'
  } else if(width >= 1536) {
    return '2xl'
  } else {
    throw new Error('Unexpected device size detected')
  }
}

const useDeviceSize = () => {
  const [deviceSize, setDeviceSize] = useState(() => getDeviceSizeFromWidth(window.innerWidth))
  
  useEffect(() => {
    const calculateInnerWidth = () => {
      setDeviceSize(getDeviceSizeFromWidth(window.innerWidth))
    }
    window.addEventListener('resize', calculateInnerWidth)
    return () => window.removeEventListener('resize', calculateInnerWidth)
  }, [])

  return deviceSize
}

export default useDeviceSize
`}</CodeBlock>
      </CodeSnippet>
      <CodeSnippet title="Simple Scatter Plot">
        <p>
          Plot some points on a chart and color them in.
      </p>
        <CodeBlock lang="jsx">{`
import { VictoryChart, VictoryScatter } from 'victory'

<VictoryChart
  domain={{ x: [0, 5], y: [0, 10] }}>
  <VictoryScatter
    style={{ data: { fill: "#c43a31" } }}
    size={7}
    data={[
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 5 },
      { x: 4, y: 4 },
      { x: 5, y: 7 }
    ]}
  />
</VictoryChart>
`}</CodeBlock>
      </CodeSnippet>
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
          In case you want to see more than just x at the interval [0, 1]. See
        the implementation of the <a href="/notes/code-snippets/javascript#generate-list-of-numbers-in-range">range()</a> function.
    </p>
        <CodeBlock lang="jsx">{`
import { VictoryChart, VictoryAxis, VictoryLine } from 'victory'

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
          For when x and y values are dependent on a third value. See
        the implementation of the <a href="/notes/code-snippets/javascript#generate-list-of-numbers-in-range">range()</a> function.
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
    </CodeSnippetPost>
  )
}