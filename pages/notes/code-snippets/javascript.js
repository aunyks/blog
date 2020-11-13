import Post from 'components/CodeSnippetPost'
import CodeBlock from 'components/CodeBlock'
import CodeSnippet from 'components/CodeSnippet'
import Hint from 'components/Hint'

export default function JsCodeSnippets() {
  return (
    <Post
      title="JavaScript Code Snippets"
      description="Useful bites of JS code that I often write and rewrite."
      hasCodeSnippet
    >
      <CodeSnippet title="Node.js Unit Testing (Jest)">
        <p>
          The structure of a test suite in Node.js. First, <a href="https://jestjs.io" target="_blank">Jest</a> must be <Hint msg="Execute `npm i -D jest` while in the directory of your project to install it.">installed</Hint>.
          This code should be in a file titled <code>mytest.test.js</code>, and it can be ran by executing the <code>jest</code> command in the terminal.
        </p>
        <CodeBlock lang="js">{`
const sumFunction = require('./someModule')

describe('My Test Suite', () => {
  test('Test #1', () => {
    expect(sumFunction(2, 2)).toBe(4)
  })
})
      `}</CodeBlock>
      </CodeSnippet>
      <CodeSnippet title="Linear Interpolation (lerp)">
        <p>
          A simple lerp implementation. <code>progress</code> ranges from 0 (start) to 1 (end).
        </p>
        <CodeBlock lang="js">{`
function lerp(start, end, progress) {
  return start * (1 - progress) + end * progress
}
      `}</CodeBlock>
      </CodeSnippet>
      <CodeSnippet title="Generate list of numbers in range">
        <p>
          Like Python's <code>range</code> function, this returns an array of numbers, starting from the given initial value, and increments by <code>step</code>, and stops before the given final value. If the optional boolean parameter <code>inclusiveOfB</code> is
          set to true, this function will include the given final value at the end of the returned array.
    </p>
        <CodeBlock lang="js">{`
const range = (a, b, step, inclusiveOfB = false) => {
  if(a > b) {
    throw new Error('[range()] Initial value greater than final value. Must be less than final value.')
  }
  if(a === b) {
    throw new Error('[range()] Initial value equal to final value. Must be less than final value')
  }
  let values = []
  for(let currentValue = a; inclusiveOfB ? currentValue <= b  : currentValue < b; currentValue += step) {
    values.push(currentValue)
  }
  return values
}`}</CodeBlock>
      </CodeSnippet>
      <CodeSnippet title="Slugify a String">
        <p>
          Turn a string into a slug. Borrowed from <a href="https://lucidar.me/en/web-dev/how-to-slugify-a-string-in-javascript/">Lulu</a>.
    </p>
        <CodeBlock lang="js">{`
const slugify = str => {
  str = str.replace(/^\s+|\s+$/g, '')

  // Make the string lowercase
  str = str.toLowerCase()

  // Remove accents, swap ñ for n, etc
  var from = 'ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;'
  var to = 'AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------'
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
  }

  // Remove invalid chars
  str = str.replace(/[^a-z0-9 -]/g, '')
    // Collapse whitespace and replace by -
    .replace(/\s+/g, '-')
    // Collapse dashes
    .replace(/-+/g, '-')
  return str
}
`}</CodeBlock>
      </CodeSnippet>
    </Post>
  )
}