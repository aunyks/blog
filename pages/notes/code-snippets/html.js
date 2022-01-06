import CodeSnippetPost from 'components/CodeSnippetPost'
import CodeBlock from 'components/CodeBlock'
import CodeSnippet from 'components/CodeSnippet'

export default function GoCodeSnippets() {
  return (
    <CodeSnippetPost
      title="HTML Code Snippets"
      description="Useful microsites I find myself remaking a lot.">
      <CodeSnippet title="Basic Game Loop">
        <p>
          A basic JavaScript-focused game loop. Invoke{' '}
          <code>startGameplay</code> to start the game or resume it after
          pausing. Invoke <code>stopGameplay</code> to stop the game or pause
          it. Use <code>updateGameState</code> to read the state of the input
          controls and game objects then update the game objects accordingly.
          Use <code>renderGame</code> to render the game to the player based on
          everything's state. Increasing <code>timeDilationFactor</code> speeds
          up the rate the game updates, and decreasing it slows it down.
        </p>
        <CodeBlock lang="html">{`
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Document</title>
  </head>
  <body>
    <p id="screen"></p>
    <script>
      window.GAME_STATE = {
        gameLoopContext: null,
        timeDilationFactor: 1,
        counter: 0
      }

      function updateGameState(dt) {
        window.GAME_STATE.counter++
      }

      function renderGame(dt) {
        document.getElementById('screen').innerText = 'Count: ' + window.GAME_STATE.counter
      }

      // The basic game loop that's repeatedly invoked
      let lastTimestamp = null
      let deltaT = 0
      function onGameLoopTick(tFrame) {
        deltaT = tFrame - lastTimestamp
        updateGameState(deltaT * window.GAME_STATE.timeDilationFactor)
        renderGame(deltaT)
        // Update our tick timestamp for the next deltaT calculation
        lastTimestamp = tFrame
        window.GAME_STATE.gameLoopContext = window.requestAnimationFrame(onGameLoopTick)
      }

      function startGameplay() {
        // Kick loop off with high res timestamp (https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp)
        // The below lines, plus the argument in onGameLoopTick , are borrowed from https://developer.mozilla.org/en-US/docs/Games/Anatomy#building_a_more_optimized_main_loop_in_javascript
        lastTimestamp = window.performance.now()
        onGameLoopTick(window.performance.now())
      }

      function stopGameplay() {
        window.cancelAnimationFrame(window.GAME_STATE.gameLoopContext)
      }

      function loadGame() {
        // load assets, levels, initialize player, etc
      }

      // Load the game
      loadGame()
      // Start the game!
      startGameplay()
    </script>
  </body>
</html>
`}</CodeBlock>
      </CodeSnippet>
    </CodeSnippetPost>
  )
}
