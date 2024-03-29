import CodeSnippetPost from 'components/CodeSnippetPost'
import CodeBlock from 'components/CodeBlock'
import CodeSnippet from 'components/CodeSnippet'

export default function ReactCodeSnippets() {
  return (
    <CodeSnippetPost
      title="React.js Code Snippets"
      description="Useful bites of React code that I often write and rewrite.">
      <CodeSnippet title="Auth / User Provider and Hook">
        <p>
          A context provider and consuming hook that manage polling for user
          login status. This is useful for any app that has any semblance of
          authentication.
        </p>
        <CodeBlock lang="jsx">{`
import {
  createContext,
  useState,
  useEffect,
  useContext
} from 'react'

const USER_ENDPOINT = '/api/user'
const POLL_TIMEOUT_MS = 10_000
const AuthContext = createContext({
  data: null,
  error: false
})

export function AuthProvider({children}) {
  const [userData, setUserData] = useState(null)
  const [authError, setAuthError] = useState(false)
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(USER_ENDPOINT)
        if(parseInt(res.status / 100) !== 2) {
          setAuthError(true)
        } else {
          setUserData(await res.json())
          setAuthError(false)
        }
      } catch(e) {
        setAuthError(true)
      }
    }

    let pollForUser = setTimeout(function getUser() {
      fetchUser()
      pollForUser = setTimeout(getUser, POLL_TIMEOUT_MS)
    }, 0)

    return () => {
      clearTimeout(pollForUser)
    }
  }, [])

  return (
    <AuthContext.Provider value={{
      data: userData,
      error: authError
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useUser() {
  const authCtx = useContext(AuthContext)
  if(!authCtx) {
    throw new Error('useUser() must be used with AuthProvider')
  }
  return authCtx
}

`}</CodeBlock>
      </CodeSnippet>
      <CodeSnippet title="useKeysPressed Hook">
        <p>
          A React hook detecting whether at least one of a provided set of keys
          is pressed. Accepts an array of strings each representing a{' '}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key"
            target="_blank">
            KeyBoardEvent's <code>key</code> value
          </a>
          . Returns a boolean: <code>true</code> if one of them is pressed,{' '}
          <code>false</code> if not.
        </p>
        <CodeBlock lang="jsx">{`
import {
  useState,
  useEffect
} from 'react'

export default function useKeysPressed(targetKeys) {
  const [aKeyPressed, setAKeyPressed] = useState(false)

  function onKeyDown({ key }) {
    if (targetKeys.includes(key)) {
      setAKeyPressed(true)
    }
  }

  function onKeyUp({ key }) {
    if (targetKeys.includes(key)) {
      setAKeyPressed(false)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  return aKeyPressed
}
`}</CodeBlock>
      </CodeSnippet>
      <CodeSnippet title="useKeyPress Hook">
        <p>
          A React hook detecting whether a key is pressed. Accepts a string
          representing a{' '}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key"
            target="_blank">
            KeyBoardEvent's <code>key</code> value
          </a>
          . Returns a boolean: <code>true</code> if it's pressed,{' '}
          <code>false</code> if not.
        </p>
        <CodeBlock lang="jsx">{`
import {
  useState,
  useEffect
} from 'react'

const useKeyPress = targetKey => {
  const [keyPressed, setKeyPressed] = useState(false)
  
  function onKeyDown({ key }) {
    if (key === targetKey) {
      setKeyPressed(true)
    }
  }
  
  const onKeyUp = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  return keyPressed
}

export default useKeyPress
`}</CodeBlock>
      </CodeSnippet>
      <CodeSnippet title="usePageVisible Hook">
        <p>
          A React hook using the{' '}
          <a
            target="_blank"
            href="https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API">
            Page Visibility API
          </a>{' '}
          to determine whether the current tab is active / in focus.
        </p>
        <CodeBlock lang="jsx">{`
import {
  useState,
  useEffect
} from 'react'

const usePageVisible = () => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const onVisibilityChange = () => {
      setIsVisible(window.document.visibilityState !== 'hidden')
    }
    onVisibilityChange()
    window.document.addEventListener('visibilitychange', onVisibilityChange)
    return () => window.document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [])

  return isVisible
}

export default usePageVisible
`}</CodeBlock>
      </CodeSnippet>
      <CodeSnippet title="useDarkMode Hook">
        <p>
          A React hook for tracking and detecting the browser dark mode state.
          Always returns a boolean indicating whether the device is in dark mode{' '}
          <code>true</code> in dark mode, <code>false</code> when not.
        </p>
        <CodeBlock lang="jsx">{`
import {
  useState,
  useEffect
} from 'react'

const useDarkMode = () => {
  // In an extreme case, it\'s better to flash a dark 
  // screen to a light mode user than a light screen to 
  // dark mode user, so we assume dark to start
  const [isDark, setDark] = useState(true)

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
          A React hook for tracking and retrieving the device size. Always
          returns a string indicating the current device size (<code>sm</code>,{' '}
          <code>md</code>, <code>lg</code>, etc).
        </p>
        <CodeBlock lang="jsx">{`
import {
  useState,
  useEffect
} from 'react'

const getDeviceSizeFromWidth = (width) => {
  if (width <= 320) {
    return 'xs'
  } else if (width < 415) {
    return 'sm'
  } else if (width < 1025) {
    return 'md'
  } else if (width >= 1026) {
    return 'lg'
  } else {
    throw new Error('Unexpected device size detected')
  }
}

const useDeviceSize = () => {
  const [deviceSize, setDeviceSize] = useState('lg')

  useEffect(() => {
    const calculateInnerWidth = () => {
      setDeviceSize(getDeviceSizeFromWidth(window.innerWidth))
    }
    calculateInnerWidth()
    window.addEventListener('resize', calculateInnerWidth)
    return () => window.removeEventListener('resize', calculateInnerWidth)
  }, [])

  return deviceSize
}

export default useDeviceSize
`}</CodeBlock>
      </CodeSnippet>
      <CodeSnippet title="Simple Scatter Plot">
        <p>Plot some points on a chart and color them in.</p>
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
          Make a line chart from with domain 0 to 1 and range from y
          <sub>min</sub> to y<sub>max</sub>. With red line.
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
          the implementation of the{' '}
          <a href="/notes/code-snippets/javascript#generate-list-of-numbers-in-range">
            range()
          </a>{' '}
          function.
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
          For when x and y values are dependent on a third value. See the
          implementation of the{' '}
          <a href="/notes/code-snippets/javascript#generate-list-of-numbers-in-range">
            range()
          </a>{' '}
          function.
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
