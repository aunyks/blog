import CodeSnippetPost from 'components/CodeSnippetPost'
import CodeBlock from 'components/CodeBlock'
import CodeSnippet from 'components/CodeSnippet'
import Hint from 'components/Hint'

export default function JsCodeSnippets() {
  return (
    <CodeSnippetPost
      title="JavaScript Code Snippets"
      description="Useful bites of JS code that I often write and rewrite."
    >
      <CodeSnippet title="Send Ether to an Address">
        <p>
          A quick-and-dirty way to send Ether to an Ethereum address. It's compatible with all of
          the <a target="_blank" href="https://eips.ethereum.org/EIPS/eip-1102">EIP-1102 implementations</a> and older Web3 browser implementations. This function
          accepts the recipient address as a string and the hex-encoded amount in Wei to send as a string. It returns a promise
          that resolves to the transaction receipt or hash, depending on the Web3 version used.
        </p>
        <CodeBlock lang="js">{`
async function sendEthTransaction(toAddr, weiAmount){
  let newMethodSupported = false
  try {
    // Try the latest method
    let account = (await ethereum.request({ method: 'eth_requestAccounts' }))[0]
    newMethodSupported = true
    // See https://docs.metamask.io/guide/sending-transactions.html#transaction-parameters
    const txHash = await ethereum.request({
      method: 'eth_sendTransaction',
      params: [{
        from: account,
        to: toAddr,
        value: weiAmount,
      }],
    })
    return txHash
  } catch(txDenied1) {
    // If the new method is supported but we're in 
    // this catch block, the new method txion was denied
    // If it isn't supported, we can try the old method
    if(!newMethodSupported) {
      return new Promise((resolve, reject) => {
        // See https://web3js.readthedocs.io/en/v1.2.11/web3-eth.html#sendtransaction
        web3.eth.sendTransaction({
          from: web3.eth.accounts[0],
          to: toAddr,
          value: parseInt(weiAmount)
        }, (receipt, error) => {
          if(error) {
            reject(error)
            return
          }
          resolve(receipt)
        })
      })
    } else {
      throw new Error('Transaction request denied')
    }
  }
}
      `}</CodeBlock>
      </CodeSnippet>
      <CodeSnippet title="Request Access to Ethereum Wallet">
        <p>
          A quick-and-dirty way to request access to a user's <Hint label="What's an Ethereum wallet?" msg="Browser-based Ethereum wallets like MetaMask and Coinbase Wallet allow developers to interface their web apps with the Ethereum blockchain and gain the ability to use money without the need for a bank.">Ethereum wallet</Hint> within
           the browser. It returns <code>'allowed'</code> if the user gives access, <code>'denied'</code> if
          the user denies access, and <code>'no-wallet'</code> if the user doesn't have a Web3 wallet.
        </p>
        <p>
          Usage:<br />
          <code>const walletAccessStatus = await getWalletStatus()</code>
        </p>
        <CodeBlock lang="js">{`
async function getWalletStatus() {
  const NO_WALLET = 'no-wallet'
  const WALLET_DENIED = 'denied'
  const WALLET_ALLOWED = 'allowed'
  if (window.ethereum) {
    window.web3 = new window.Web3(window.ethereum)
    try {
      let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      return WALLET_ALLOWED
    } catch(accessDeniedError1) {
      try {
        await window.ethereum.enable()
        return WALLET_ALLOWED
      } catch (accessDeniedError2) {
        window.web3 = null
        return WALLET_DENIED
      }
    }
  } else if (window.web3) {
    window.web3 = new window.Web3(window.web3.currentProvider)
    return WALLET_ALLOWED
  } else {
    return NO_WALLET
  }
}
      `}</CodeBlock>
      </CodeSnippet>
      <CodeSnippet title="Promisify a Function Accepting a Callback">
        <p>
          Turn a function that accepts a callback function as a argument into another
          that <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise">returns a Promise</a>.
          Here, <code>someFunction</code> accepts a callback as the second argument. <code>somePromisifiedFunction</code> is the promisified version
          of <code>someFunction</code>.
        </p>
        <CodeBlock lang="js">{`
const somePromisifiedFunction = (someArg) => {
  return new Promise((resolve, reject) => {
    someFunction(someArg, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}
      `}</CodeBlock>
      </CodeSnippet>
      <CodeSnippet title="Detect Dark Mode in the Browser">
        <p>
          Detect dark mode and changes to dark mode in the browser in JS, when <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme">CSS isn't enough</a>.
        </p>
        <CodeBlock lang="js">{`
try {
  // For Chrome / FireFox
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches }) => {
    // true or false
    console.log('Dark:', matches)
  })
} catch (e) {
  // For Safari
  window.matchMedia('(prefers-color-scheme: dark)').addListener(({ matches }) => {
    // true or false
    console.log('Dark:', matches)
  })
}`}</CodeBlock>
      </CodeSnippet>
      <CodeSnippet title="Send a Single SMS Message (Twilio)">
        <p>
          To run this Node.js script, the Twilio JavaScript library must first <Hint msg="Execute `npm i -S twilio` while in the directory of your project to install it.">be installed</Hint>. Here, <code>sendingNumber</code> and <code>receivingNumber</code> include the <Hint msg="The USA's is +1.">country code</Hint>.
          Note that the Account SID and Auth Token are provided to the script as <a href="https://medium.com/chingu/an-introduction-to-environment-variables-and-how-to-use-them-f602f66d15fa">environment variables</a>. You can find these values in your Twilio dashboard.
        </p>
        <CodeBlock lang="js">{`
const accountSid = process.env.TWILIO_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = require('twilio')(accountSid, authToken)

let sendingNumber = '+15555555555'
let receivingNumber = '+14444444444'

async function sendText() {
  await client.messages.create({
    body: "The recipient will see this in the text body",
    from: sendingNumber,
    to: receivingNumber
  })
}

sendText()`}</CodeBlock>
      </CodeSnippet>
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
    </CodeSnippetPost>
  )
}