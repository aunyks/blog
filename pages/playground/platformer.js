import { useState, useEffect, useCallback, useRef } from 'react'
import dynamic from 'next/dynamic'
import AssetContext, { AssetStore } from 'perigee/context/AssetContext'
import SimulationContext, {
  FrameListenerSet,
  useFrame,
  useSimulation
} from 'perigee/context/SimulationContext'
import GameInput from 'perigee/input/game-input'
import mixRefs from 'utils/mix-refs'
import { Level1Sim } from 'perigee/levels/Level1Sim'
import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  DirectionalLight,
  PCFSoftShadowMap,
  sRGBEncoding
} from 'three'
import { parseGltf } from 'perigee/utils/loaders'
import Modal from 'components/Modal'

const ASSET_LOAD_STATE = Object.freeze({
  IN_PROGRESS: 'loading',
  COMPLETE: 'complete',
  FAILED: 'couldnt-load'
})

const SIM_SETUP_STATE = Object.freeze({
  INITIALIZING: 'initializing',
  COMPLETE: 'complete'
})

const MAX_FRAMES_TO_DROP = 3

const CANVAS_WIDTH_PROPERTY = 'innerWidth'
const CANVAS_HEIGHT_PROPERTY = 'innerHeight'

function LoadingAssets() {
  return <p>Loading</p>
}

function AssetLoadFailed() {
  return <p>Couldnt load assets...</p>
}

function InitializingGame() {
  return <p>Initializing simulation</p>
}

function Consumer() {
  const sim = useSimulation()
  useFrame((_dt) => {
    // Log player y position
    console.log(sim.playerBodyIsometry()[1][1])
  })
  return <p>Consumer component</p>
}

function PlatformerGame() {
  const [isPaused, setPaused] = useState(false)
  const [wasCrankStarted, setCrankStarted] = useState(false)

  const assetStoreRef = useRef()
  const [assetsLoadState, setAssetsLoadState] = useState(
    ASSET_LOAD_STATE.IN_PROGRESS
  )

  const simRef = useRef(new Level1Sim())
  const [simSetupState, setSimSetupState] = useState(
    SIM_SETUP_STATE.INITIALIZING
  )

  const fetchAssets = useCallback(async () => {
    await simRef.current.loadWasm('/wasm/perigee-levels/1.wasm')

    return new AssetStore([
      ['scene-gltf', await parseGltf(simRef.current.getSceneGltfBytes())]
    ])
  }, [])

  // Load assets on initial page load and store in AssetStore. Also load WASM into sim
  useEffect(() => {
    fetchAssets()
      .then((assetStore) => {
        assetStoreRef.current = assetStore
        setAssetsLoadState(ASSET_LOAD_STATE.COMPLETE)
      })
      .catch((err) => {
        console.error(err)
        setAssetsLoadState(ASSET_LOAD_STATE.FAILED)
      })
  }, [])

  // Once assets are loaded, initialize sim and scene
  const cameraRef = useRef(null)
  const sceneRef = useRef(null)
  useEffect(() => {
    if (assetsLoadState === ASSET_LOAD_STATE.COMPLETE) {
      simRef.current.initialize()
      sceneRef.current = new Scene()
      sceneRef.current.add(assetStoreRef.current.get('scene-gltf').scene)
      sceneRef.current.add(new DirectionalLight(0xffffff, 10))

      assetStoreRef.current.get('scene-gltf').scene.traverse((obj) => {
        if (!!obj.isMesh && !obj.userData.simSettings.graphics.enabled) {
          obj.geometry.dispose()
          obj.material.dispose()
          obj.visible = false
        }
      })

      setSimSetupState(SIM_SETUP_STATE.COMPLETE)
    }
  }, [assetsLoadState])

  const finishedLoadingDeps =
    assetsLoadState === ASSET_LOAD_STATE.COMPLETE &&
    simSetupState === SIM_SETUP_STATE.COMPLETE

  // Use refs to both bind to elements that'll be used to handle
  // inputs *and* to store the game input manager so that it doesn't
  // get overwritten across rerenders
  const gameInputRef = useRef(null)
  const rendererRef = useRef(null)
  const pointerTargetRef = useRef()
  const touchTargetRef = useRef()
  const renderCanvasRef = useRef()
  useEffect(() => {
    if (finishedLoadingDeps) {
      if (!wasCrankStarted) {
        function resetCameraProjection() {
          const aspect =
            window[CANVAS_WIDTH_PROPERTY] / window[CANVAS_HEIGHT_PROPERTY]
          cameraRef.current.aspect = aspect
          cameraRef.current.updateProjectionMatrix()
          rendererRef.current.setSize(
            window[CANVAS_WIDTH_PROPERTY],
            window[CANVAS_HEIGHT_PROPERTY]
          )
        }
        window.addEventListener('resize', resetCameraProjection, false)

        gameInputRef.current = new GameInput({
          pointerLockTarget: pointerTargetRef.current,
          touchTarget: touchTargetRef.current
        })

        cameraRef.current = new PerspectiveCamera(
          45,
          window[CANVAS_WIDTH_PROPERTY] / window[CANVAS_HEIGHT_PROPERTY],
          0.01,
          1000
        )

        rendererRef.current = new WebGLRenderer({
          canvas: renderCanvasRef.current,
          antialias: window.devicePixelRatio > 1 ? false : true
        })
        rendererRef.current.setPixelRatio(window.devicePixelRatio)
        rendererRef.current.physicallyCorrectLights = true
        rendererRef.current.shadowMap.enabled = true
        rendererRef.current.shadowMap.type = PCFSoftShadowMap
        rendererRef.current.outputEncoding = sRGBEncoding

        rendererRef.current.render(sceneRef.current, cameraRef.current)

        resetCameraProjection()
      } else {
      }
    }
  }, [finishedLoadingDeps, wasCrankStarted])

  const gameplayDependencies = [finishedLoadingDeps, wasCrankStarted, isPaused]

  const rafRef = useRef(-1)
  const frameListenersRef = useRef(new FrameListenerSet())
  const lastTimestampRef = useRef(window.performance.now())
  const accumulatedTimestampRef = useRef(0)
  const desiredTimestep = useRef(1 / 30)
  // Wrap game loop in useCallback to reduce the amount of
  // overwriting on rerenders
  const onGameLoopTick = useCallback((tFrame) => {
    const deltaT = Math.abs(tFrame - lastTimestampRef.current)
    const deltaSeconds = deltaT / 1000
    accumulatedTimestampRef.current += deltaSeconds
    if (
      accumulatedTimestampRef.current >=
      desiredTimestep.current * MAX_FRAMES_TO_DROP
    ) {
      accumulatedTimestampRef.current =
        desiredTimestep.current * MAX_FRAMES_TO_DROP
    }
    while (accumulatedTimestampRef.current >= desiredTimestep.current) {
      accumulatedTimestampRef.current -= desiredTimestep.current

      gameInputRef.current.update()
      if (gameInputRef.current.pause()) {
        setPaused(true)
      }

      gameInputRef.current.copyToSim(simRef.current)
      simRef.current.step(desiredTimestep.current)

      rendererRef.current.render(sceneRef.current, cameraRef.current)
    }

    frameListenersRef.current.forEach((listener) => {
      listener(desiredTimestep.current)
    })

    const [camGlobalRotation, camGlobalTranslation] =
      simRef.current.cameraGlobalIsometry()
    cameraRef.current.position.fromArray(camGlobalTranslation)
    cameraRef.current.quaternion.fromArray(camGlobalRotation)

    assetStoreRef.current.get('scene-gltf').scene.traverse((obj) => {
      if (obj.isMesh && !obj.userData.simSettings.physics.isAnonymous) {
        const propName = obj.userData.name
        const [propRot, propTrans] = simRef.current.propIsometry(propName)
        obj.position.fromArray(propTrans)
        obj.quaternion.fromArray(propRot)
      }
    })

    lastTimestampRef.current = tFrame
    rafRef.current = window.requestAnimationFrame(onGameLoopTick)
  }, gameplayDependencies)

  useEffect(() => {
    if (finishedLoadingDeps && wasCrankStarted && !isPaused) {
      lastTimestampRef.current = window.performance.now()
      onGameLoopTick(lastTimestampRef.current)
    }

    return () => {
      window.cancelAnimationFrame(rafRef.current)
    }
  }, gameplayDependencies)

  if (assetsLoadState === ASSET_LOAD_STATE.IN_PROGRESS) {
    return <LoadingAssets />
  }

  if (assetsLoadState === ASSET_LOAD_STATE.FAILED) {
    return <AssetLoadFailed />
  }

  if (simSetupState === SIM_SETUP_STATE.INITIALIZING) {
    return <InitializingGame />
  }

  return (
    <SimulationContext.Provider
      value={{
        _frameListeners: frameListenersRef.current,
        isPaused,
        setPaused,
        settings: null,
        updateSettings: () => {
          console.log('updateSettings() called')
        },
        simulation: simRef.current
      }}>
      <AssetContext.Provider value={{ assets: assetStoreRef.current }}>
        <Modal id="intro-modal" active={!wasCrankStarted}>
          <>
            <p>This game</p>
            <button
              onClick={() => {
                setCrankStarted(true)
              }}>
              Start pls
            </button>
          </>
        </Modal>
        <Modal id="pause-modal" active={isPaused}>
          <>
            <p>Game paused</p>
            <button
              onClick={() => {
                setPaused(false)
              }}>
              Start pls
            </button>
          </>
        </Modal>
        <canvas
          ref={mixRefs([
            renderCanvasRef,
            pointerTargetRef,
            touchTargetRef
          ])}></canvas>
      </AssetContext.Provider>
    </SimulationContext.Provider>
  )
}

// This ensures that the page only loads on the client
export default dynamic(() => Promise.resolve(PlatformerGame), { ssr: false })
