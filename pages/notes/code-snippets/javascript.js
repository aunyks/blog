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
      <CodeSnippet title="Leading Debounce a Function">
        <p>
          Like the below function, except this executes on the first invocation and debounces subsequent invocations
          until the timeout is satisfied.
        </p>
        <CodeBlock lang="js">{`
function leadingDebounce(func, timeout = 300){
  let timer = null
  return (...args) => {
    if (!timer) {
      func.apply(this, args)
    }
    clearTimeout(timer)
    timer = setTimeout(() => {
      timer = undefined
    }, timeout)
  }
}
      `}</CodeBlock>
      </CodeSnippet>
      <CodeSnippet title="Debounce a Function">
        <p>
          Adapted from <a href="https://ondrabus.com" target="_blank">Ondrej Polesny's</a> <a href="https://www.freecodecamp.org/news/javascript-debounce-example" target="_blank">article on the topic</a>, this
          function lets you debounce the execution of the function that's passed as an argument. For example,
          writing <code>const mashButton = debounce(() => console.log('thanks for waiting'), 500)</code> lets you
          repeatedly call <code>mashButton</code>. It will debounce the log function until 500 milliseconds have passed without the
          function being called again. After 500 milliseconds, the log function will be invoked.
        </p>
        <CodeBlock lang="js">{`
function debounce(func, timeout = 300) {
  let timer = null
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}
      `}</CodeBlock>
      </CodeSnippet>
      <CodeSnippet title="A N-ary Tree Node">
        <p>
          An ES6 class that defines a node for use in discrete trees. It makes very few assumptions other
          than that it's designed for tree structures, so you can extend it for more specific tree applications.
          A good practice is to add functions that operate on these nodes and their descendants as static functions of the node class.
          For example, <code>serializeTree</code> below should be called as <code>TreeNode.serializeTree(someNode)</code>. This
          way, it's apparent to developers how nodes are treated, and you can still take advantage of polymorphism.
        </p>
        <CodeBlock lang="js">{`
class TreeNode {
  constructor(data) {
    this._data = data || null
    this._children = []
  }

  getData() {
    return this._data
  }

  // I don't want this here, but 
  // using it helps performance in some cases
  setData(data) {
    this._data = data
  }

  toString() {
    return JSON.stringify(this._data)
  }

  getChildren() {
    return this._children
  }

  addChild(treeNode) {
    if (treeNode instanceof TreeNode) {
      this._children.push(treeNode)
    } else {
      throw new Error("TreeNode child must be a TreeNode")
    }
  }

  equalTo(treeNode) {
    if (treeNode instanceof TreeNode) {
      return this._data === treeNode._data
    } else {
      throw new Error("TreeNode must be compared to another TreeNode")
    }
  }

  setChild(childIndex, treeNodeOrNull) {
    if (treeNodeOrNull instanceof TreeNode || treeNodeOrNull === null) {
      if (childIndex < this._children.length && childIndex >= 0) {
        this._children[childIndex] = treeNodeOrNull
      } else {
        throw new Error("Invalid child index requested. Length: " + this._children.length + ", requested index: " + childIndex)
      }
    } else {
      throw new Error("TreeNode must be compared to another TreeNode")
    }
  }

  static serializeTree(treeNode) {
    console.log('Just an example')
  }
}
      `}</CodeBlock>
      </CodeSnippet>
      <CodeSnippet title="Clamp a Number">
        <p>
          A function that clamps a number between two values.
        </p>
        <CodeBlock lang="js">{`
const clamp = (num, min, max) => Math.min(Math.max(num, min), max)
      `}</CodeBlock>
      </CodeSnippet>
      <CodeSnippet title="Custom Event Emitter">
        <p>
          A simple event emitter for use in <a href="https://en.wikipedia.org/wiki/Observer_pattern" target="_blank">Observer patterns</a>. Adapted from <a href="https://stackoverflow.com/a/36027952" target="_blank">Eric Muyser's Stack Overflow answer</a>.
        </p>
        <CodeBlock lang="js">{`
class EventEmitter {

  /* optional
  constructor() {

  }
  */

  on(type, cb) {
    this['_on' + type] = this['_on' + type] || []
    this['_on' + type].push(cb)
  }

  off(type, cb) {
    if(cb in this['_on' + type]) {
      for(let i = 0; i < this['_on' + type].length; i++){
        if(this['_on' + type][i] === cb) {
            this['_on' + type].splice(i, 1)
        }
      } 
    }
  }

  emit(type, args) {
      this['_on' + type] && this['_on' + type].forEach((cb) => { cb(args) })
  }
}
      `}</CodeBlock>
      </CodeSnippet>
      <CodeSnippet title="Simple PWA Service Worker">
        <p>
          A very small service worker ready for use in a <a target="_blank" href="https://en.wikipedia.org/wiki/Progressive_web_application">Progressive Web App</a>.
        </p>
        <CodeBlock lang="js">{`
// Name of our cache for reference in-browser
const cacheName = 'my-cache'
// Assets to download to cache on install
const staticAssets = [
  '/',
]

self.addEventListener('install', async e => {
  const cache = await caches.open(cacheName)
  await cache.addAll(staticAssets)
  return self.skipWaiting()
})

self.addEventListener('activate', e => {
  self.clients.claim()
})

self.addEventListener('fetch', async e => {
  const req = e.request
  const url = new URL(req.url)
  e.respondWith(networkAndCache(req))
})

// Use this to respond to requests from the cache
// first and fall back to actually fetching
async function cacheFirst(req) {
  const cache = await caches.open(cacheName)
  const cached = await cache.match(req)
  return cached || fetch(req)
}

// Use this to respond to requests from the network 
// first and fall back to cache if not available
async function networkAndCache(req) {
  const cache = await caches.open(cacheName)
  try {
    const fresh = await fetch(req)
    // If we're fetching something useful (not a Chrome extension), 
    // let's cache it
    const urlProtocol = new URL(req.url).protocol
    if (req.method === 'GET' && urlProtocol.startsWith('http')) {
      await cache.put(req, fresh.clone())
    }
    return fresh
  } catch (e) {
    const cached = await cache.match(req)
    return cached
  }
}
      `}</CodeBlock>
      </CodeSnippet>
      <CodeSnippet title="Map a Number from One Range to Another">
        <p>
          The function is called <code>scale</code>, because <code>map</code> is often associated with the array function in the context of JavaScript. Borrowed from <a href="https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers">August Miller</a>.
        </p>
        <CodeBlock lang="js">{`
function scale(num, in_min, in_max, out_min, out_max) {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
}
      `}</CodeBlock>
      </CodeSnippet>
      <CodeSnippet title="Keyboard Manager (Game Dev)">
        <p>
          A class that provides an easy-to-use interface for using a hardware keyboard as
          input in a game. Specifically, it's meant to be instantiated outside of the game loop so that its
          functions can be called in the game loop. This way, the game can update based on the keyboard state on each
          tick.
        </p>
        <CodeBlock lang="js">{`
class KeyboardInput {
  
  constructor(elementToWatch) {
    this.pressedButtonsList = []
    this.elementToWatch = (elementToWatch || document)
    this.elementToWatch.addEventListener('keydown', (e) => this.onKeyDown(e), false)
    this.elementToWatch.addEventListener('keyup', (e) => this.onKeyUp(e), false)
  }

  onKeyDown(event) {
    const key = event.key
    if (!this.pressedButtonsList.includes(key)) {
      this.pressedButtonsList.push(key)
    }
  }

  onKeyUp(event) {
    const key = event.key
    if (this.pressedButtonsList.includes(key)) {
      for (let i = 0; i < this.pressedButtonsList.length; i++) {
        if (this.pressedButtonsList[i] === key) {
          this.pressedButtonsList.splice(i, 1)
        }
      }
    }
  }

  ready() {
    return !window.matchMedia('(max-width: 375px)').matches
  }

  buttonPressed(key) {
    return this.pressedButtonsList.includes(key)
  }

  spacebarPressed() {
    return this.buttonPressed(' ')
  }

  wPressed() {
    return this.buttonPressed('w') || this.buttonPressed('W')
  }

  aPressed() {
    return this.buttonPressed('a') || this.buttonPressed('A')
  }

  sPressed() {
    return this.buttonPressed('s') || this.buttonPressed('S')
  }

  dPressed() {
    return this.buttonPressed('d') || this.buttonPressed('D')
  }

  qPressed() {
    return this.buttonPressed('q') || this.buttonPressed('Q')
  }

  ePressed() {
    return this.buttonPressed('e') || this.buttonPressed('E')
  }

  upPressed() {
    return this.buttonPressed('ArrowUp') || this.buttonPressed('Up')
  }

  leftPressed() {
    return this.buttonPressed('ArrowLeft') || this.buttonPressed('Left')
  }

  downPressed() {
    return this.buttonPressed('ArrowDown') || this.buttonPressed('Down')
  }

  rightPressed() {
    return this.buttonPressed('ArrowRight') || this.buttonPressed('Right')
  }
}
      `}</CodeBlock>
      </CodeSnippet>
      <CodeSnippet title="Gamepad Manager (Browser)">
        <p>
          A class that provides an <Hint msg="The browser Gamepad API is pretty verbose and difficult to use.">easier-to-use</Hint> interface for interacting with
          gamepads like PlayStation and XBox controllers. This class assumes the controller has
          a <Hint msg="Standard control layout involves a left and right joystick, directional pad, four-button pad, select and start buttons, left and right bumpers, and left and right triggers. PlayStation and XBox controllers have standard mappings.">standard</Hint> control mapping.
          Construct it outside of the game loop, and call its member functions on each tick in the loop. Only call its functions
          when the instance's <code>ready()</code> function returns true.
          See <a target="_blank" title="Google web.dev gamepad walkthrough" href="https://web.dev/gamepad">this</a>, <a target="_blank" title="MDN Gamepad tutorial" href="https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API">this</a>, and <a title="Gamepad tester and debugger" target="_blank" href="https://gamepad-tester.com">this</a>.
        </p>
        <CodeBlock lang="js">{`
class GamepadInput {
  constructor(index) {
    // Assume the index to be the first unless 
    // specified otherwise
    if (index !== null && index !== undefined) {
      this.gamepadIndex = index
    } else {
      this.gamepadIndex = 0
    }
  }

  ready() {
    for (let i = 0; i < navigator.getGamepads().length; i++) {
      const gamepad = navigator.getGamepads()[i]
      const discoveredGamepadIndex = i
      if (discoveredGamepadIndex === this.gamepadIndex && gamepad !== null)
        return true
    }
    return false
  }

  // [WARNING]
  // All of the following functions could throw if  
  // the controller is disconnected after checking 
  // its readiness. Check for readiness here and throw 
  // an error to prevent that

  getPad() {
    return navigator.getGamepads()[this.gamepadIndex]
  }

  canRumble() {
    return 'vibrationActuator' in this.getPad()
  }

  // delay and duration in ms
  // strong, weak magnitude between 0 and 1
  rumble(delay = 0, duration = 500, weakMag = 1, strongMag = 1) {
    this.getPad().vibrationActuator.playEffect('dual-rumble', {
      startDelay: delay,
      duration: duration,
      weakMagnitude: weakMag,
      strongMagnitude: strongMag,
    })
  }

  getLeftStickPos() {
    // x and y are both in the range [-1, 1]
    // x: negative is left. y: negative is up
    return {
      x: this.getPad().axes[0],
      y: this.getPad().axes[1]
    }
  }

  getRightStickPos() {
    // x and y are both in the range [-1, 1]
    // x: negative is left. y: negative is up
    return {
      x: this.getPad().axes[2],
      y: this.getPad().axes[3]
    }
  }

  buttonPressed(buttonIndex) {
    return this.getPad().buttons[buttonIndex].pressed
  }

  // The right button pad on PS and XBox controllers
  bPadSouthPressed() {
    return this.buttonPressed(0)
  }

  bPadEastPressed() {
    return this.buttonPressed(1)
  }

  bPadWestPressed() {
    return this.buttonPressed(2)
  }

  bPadNorthPressed() {
    return this.buttonPressed(3)
  }

  // Bumpers
  leftBumperPressed() {
    return this.buttonPressed(4)
  }

  rightBumperPressed() {
    return this.buttonPressed(5)
  }

  // Triggers
  leftTriggerPressed() {
    return !!this.buttonPressed(6)
  }

  rightTriggerPressed() {
    return !!this.buttonPressed(7)
  }

  // Select and start buttons
  selectBtnPressed() {
    return this.buttonPressed(8)
  }

  startBtnPressed() {
    return this.buttonPressed(9)
  }

  leftStickPressed() {
    return this.buttonPressed(10)
  }

  rightStickPressed() {
    return this.buttonPressed(11)
  }

  // The d-pad (left button pad) on PS and XBox controllers
  dPadNorthPressed() {
    return this.buttonPressed(12)
  }

  dPadSouthPressed() {
    return this.buttonPressed(13)
  }

  dPadWestPressed() {
    return this.buttonPressed(14)
  }

  dPadEastPressed() {
    return this.buttonPressed(15)
  }
}
      `}</CodeBlock>
      </CodeSnippet>
      <CodeSnippet title="Check Whether the Current Browser has an Ethereum Wallet">
        <p>
          This function returns a boolean value determining whether the current browser has a Web3 wallet
          available. It returns <code>true</code> if the wallet is available and <code>false</code> if it isn't.
        </p>
        <CodeBlock lang="js">{`
function hasWeb3Wallet() {
  return !!window.ethereum || !!window.web3
}
      `}</CodeBlock>
      </CodeSnippet>
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
        window.web3.eth.sendTransaction({
          from: window.web3.eth.accounts[0],
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
      <CodeSnippet title="Request Access to an Ethereum Wallet">
        <p>
          A quick-and-dirty way to request access to a user's <Hint label="What's an Ethereum wallet?" msg="Browser-based Ethereum wallets like MetaMask and Coinbase Wallet allow developers to interface their web apps with the Ethereum blockchain and gain the ability to use money without the need for a bank.">Ethereum wallet</Hint> within
          the browser. It returns <code>'allowed'</code> if the user gives access, <code>'denied'</code> if
          the user denies access, and <code>'no-wallet'</code> if the user doesn't have a Web3 wallet.
        </p>
        <CodeBlock lang="js">{`
async function requestWeb3Wallet() {
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