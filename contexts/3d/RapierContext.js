import { createContext } from 'react'

const RapierContext = createContext({
  worker: null,
  workerReady: null,
  workerInited: null,
  events: null,
  subscriptions: null,
})

export default RapierContext
