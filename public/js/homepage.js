import HomepageGame from '/js/HomepageGame.m.js'
import Stats from '/js/arachnid/debug/stats.module.js'

const homepageGame = new HomepageGame()
homepageGame.load()

window.APP_STATE = {
  gameLoopContext: null,
  debug: false
}

const stats = new Stats()
if (window.APP_STATE.debug) {
  stats.showPanel(0)// 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild(stats.dom)
}

// The basic game loop that's repeatedly invoked
let lastTimestamp = null
let deltaT = 0
function onGameLoopTick(tFrame) {
  deltaT = (tFrame - lastTimestamp) / 1000
  if (window.APP_STATE.debug) {
    stats.begin()
    homepageGame.step(deltaT)
    stats.end()
  } else {
    homepageGame.step(deltaT)
  }
  lastTimestamp = tFrame
  window.APP_STATE.gameLoopContext = window.requestAnimationFrame(onGameLoopTick)
}

function startGameplay() {
  if (!homepageGame.hasStarted()) {
    homepageGame.start()
  }
  let lastTimestamp = window.performance.now()
  onGameLoopTick(window.performance.now())
}

function stopGameplay() {
  window.cancelAnimationFrame(window.APP_STATE.gameLoopContext)
}

function startGameOnLoad() {
  /*
  // Make home screen invisible to reveal load screen
  const homeScreen = document.getElementById('home-screen')
  if (!homeScreen.classList.contains('invisible')) {
    homeScreen.classList.add('invisible')
  }
  */
  const loadingScreen = document.getElementById('loading-screen')
  if (loadingScreen.classList.contains('invisible')) {
    loadingScreen.classList.remove('invisible')
  }

  // Keep checking for game readiness while it loads.
  // On load, make loading screen invisible and start game
  setTimeout(function startGameIfLoaded() {
    if (homepageGame.ready()) {
      if (!loadingScreen.classList.contains('invisible')) {
        loadingScreen.classList.add('invisible')
      }
      const gameCanvasContainer = document.getElementById('game-canvas').parentElement
      if (gameCanvasContainer.classList.contains('invisible')) {
        gameCanvasContainer.classList.remove('invisible')
      }
      startGameplay()
      setTimeout(function spinBolt() {
        window.postMessage({ type: 'SPIN_BOLT' }, window.location.origin)
        setTimeout(spinBolt, 10 * 1000)
      }, 0)
    } else {
      setTimeout(startGameIfLoaded, 300)
    }
  }, 0)
}

startGameOnLoad()