import { createContext, useEffect, useContext } from 'react'

const WARN_NO_PROVIDER = () =>
  console.warn('No SimulationContext provided to this component')

class FrameListenerSet extends Set {
  constructor(iterable) {
    super(iterable)
  }
}

const SimulationContext = createContext({
  // Frame listeners
  _frameListeners: null,
  // Pause states
  isPaused: false,
  setPaused: WARN_NO_PROVIDER,
  // Settings
  settings: null,
  updateSettings: WARN_NO_PROVIDER,
  // The simulation itself
  simulation: null
})

function usePauseSim() {
  const { isPaused, setPaused } = useContext(SimulationContext)
  return [isPaused, setPaused]
}

function useSimSettings() {
  const { settings, updateSettings } = useContext(SimulationContext)
  return [settings, updateSettings]
}

function useSimulation() {
  const { simulation } = useContext(SimulationContext)
  return simulation
}

function useFrame(onFrame) {
  const { _frameListeners } = useContext(SimulationContext)

  useEffect(() => {
    if (_frameListeners !== null) {
      _frameListeners.add(onFrame)
    } else {
      console.warn(
        "useFrame argument won't be called. No SimulationContext is providing a FrameListenerSet"
      )
    }

    return () => {
      if (_frameListeners !== null) {
        _frameListeners.delete(onFrame)
      }
    }
  }, [_frameListeners, onFrame])
}

export {
  FrameListenerSet,
  usePauseSim,
  useSimSettings,
  useSimulation,
  useFrame
}

export default SimulationContext
