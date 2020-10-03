import Post from 'components/NotesPost'
import CodeBlock from 'components/CodeBlock'
import CodeSnippet from 'components/CodeSnippet'

export default () => (
  <Post
    title="JavaScript Code Snippets"
    description="Useful bites of JS code that I find often write and rewrite."
    hasCodeSnippet
  >
    <CodeSnippet title="Slugify a String">
      <p>
        Like Python's `range` function, this returns an array of numbers, starting from the given initial value, and increments by `step`, and stops before the given final value. If the optional boolean parameter
        `inclusiveOfB` is set to true, this function will include the given final value at the end of the returned array.
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