import NotesPost from 'components/NotesPost'
import CodeBlock from 'components/CodeBlock'
import CodeSnippet from 'components/CodeSnippet'
import Hint from 'components/Hint'

export default function AppliedDSP() {
  return (
    <NotesPost
      title="Game Development on the Web"
      description="How to make games for the browser."
      hasCodeSnippet
    >
      <style jsx>{`
        li {
          list-style-type: disc;
          margin-left: 1rem;
        }
      `}</style>
      <h2>Overview</h2>
      <h3>Intro</h3>
      <p>
        Games on the web have the same structure as any other game: a constant loop of
        reading input, updating game state, and rendering the game to the player.
      </p>
      <p>
        The best way
        to use a game loop on the web is using <code>requestAnimationFrame</code>. A template can
        be found <a title="My HTML game loop code snippet" href="/notes/code-snippets/html#basic-game-loop">here</a>.
      </p>
      <h3>Controling the Game</h3>
      <p>
        Browsers make <em>lots</em> of peripherals and hardware available to web developers. You can already use the keyboard, mouse, or touch
        as inputs, but you can also use a PS or XBox controller through the <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API">Gamepad API</a> or even a MIDI device using the <a target="_blank" href="https://dev.to/unjavascripter/connecting-the-musical-world-to-the-web-using-the-web-midi-api-572p">WebMIDI API</a>. Just keep in mind
        browser compatibility.
      </p>
      <p>
        To use a keyboard, touch, or mouse, use a manager that can be exposed in the game loop.
      </p>
      <p>
        To use the Gamepad API, use <a href="/notes/code-snippets/javascript#gamepad-manager-browser">my Gamepad Manager</a>.
        Try something along the lines of this.
      </p>
      <CodeBlock lang="js" noButton showCodeByDefault>{`
// Instantiate the manager somewhere outside of the game loop
const myGamepad = new GamepadInput(0)
// Can connect to another if you want
const friendsGamepad = new GamepadInput(1)

// This gets called on each tick of the loop
function updateGameState(dt) {
  if (myGamepad.ready()) {
    circlePosition = {
      x: myGamepad.getLeftStickPos().x,
      y: myGamepad.getLeftStickPos().y
    }
  }
}
`}</CodeBlock>
      <h2>Extra Notes</h2>
      <ul className="mb-4">
        <li>You can use <a target="_blank" href="https://www.pixijs.com">pixi.js</a> (2D), <a target="_blank" href="https://threejs.org">three.js</a> (3D), or the <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API">Canvas API</a> (2D) for rendering your game</li>
        <li><a target="_blank" href="https://gamedev.stackexchange.com/questions/32631/easy-way-to-do-gravity-in-a-simple-game">Add gravity to your game (engine)</a></li>
        <li><a target="_blank" href="https://gamedev.stackexchange.com/questions/60008/smooth-jumping-in-2d-platformers">Add jump physics to your game (engine)</a></li>
      </ul>
      <h2>Useful Code Snippets</h2>
      <ul className="mb-4">
        <li><a href="/notes/code-snippets/html#basic-game-loop">Basic Game Loop Web Page</a></li>
        <li><a href="/notes/code-snippets/javascript#gamepad-manager-browser">Gamepad Input Manager</a></li>
        <li><a href="/notes/code-snippets/javascript#keyboard-manager-game-dev">Keyboard Input Manager</a></li>
      </ul>
    </NotesPost>
  )
}