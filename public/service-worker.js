// Name of our cache for reference in-browser
const cacheName = 'hivoltage-cache'
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