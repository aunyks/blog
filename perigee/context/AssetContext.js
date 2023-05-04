import { createContext, useMemo, useContext } from 'react'

class AssetStore extends Map {
  constructor(iterable) {
    super(iterable)
  }
}

const AssetContext = createContext({
  assets: null
})

function useAsset(assetId) {
  const { assets } = useContext(AssetContext)
  return useMemo(() => assets.get(assetId), [assets])
}

export { AssetStore, useAsset }

export default AssetContext
