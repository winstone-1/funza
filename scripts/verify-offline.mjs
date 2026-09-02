/**
 * Executes public/sw.js in a sandbox and drives it through install, an offline
 * navigation, an offline asset request and a cross-origin call.
 *
 * There is no browser in CI, so this is how the offline path stays verified.
 * Run with: npm run verify:offline
 */
import { readFileSync } from 'node:fs'
import vm from 'node:vm'

const ORIGIN = 'http://localhost:4173'
const SHELL_BODY = '<!doctype html><html><body><div id="root"></div></body></html>'
const ASSET_URL = `${ORIGIN}/assets/index-abc123.js`

let online = true
const results = []

function check(name, passed, detail = '') {
  results.push({ name, passed, detail })
  console.log(`${passed ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`)
}

class FakeCache {
  constructor() {
    this.entries = new Map()
  }

  async put(request, response) {
    this.entries.set(typeof request === 'string' ? new URL(request, ORIGIN).href : request.url, response)
  }

  async match(request) {
    const url = typeof request === 'string' ? new URL(request, ORIGIN).href : request.url
    return this.entries.get(url)
  }

  async addAll(urls) {
    for (const url of urls) {
      const response = await sandboxFetch(new URL(url, ORIGIN).href)
      if (!response.ok) throw new Error(`addAll failed for ${url}`)
      await this.put(url, response)
    }
  }
}

const cacheStorage = new Map()

const caches = {
  async open(name) {
    if (!cacheStorage.has(name)) cacheStorage.set(name, new FakeCache())
    return cacheStorage.get(name)
  },
  async keys() {
    return [...cacheStorage.keys()]
  },
  async delete(name) {
    return cacheStorage.delete(name)
  },
  async match(request) {
    for (const cache of cacheStorage.values()) {
      const hit = await cache.match(request)
      if (hit) return hit
    }
    return undefined
  },
}

async function sandboxFetch(input) {
  if (!online) {
    throw new TypeError('Failed to fetch')
  }

  const url = typeof input === 'string' ? input : input.url
  const body = url.endsWith('.js') ? 'console.log("app")' : SHELL_BODY
  const response = new Response(body, { status: 200, headers: { 'content-type': 'text/html' } })

  // undici marks synthesised responses "default"; the worker checks for "basic".
  Object.defineProperty(response, 'type', { value: 'basic' })
  return response
}

const listeners = {}
const self = {
  addEventListener: (type, handler) => {
    listeners[type] = handler
  },
  skipWaiting: async () => {},
  clients: { claim: async () => {} },
  location: { origin: ORIGIN },
}

vm.createContext(
  Object.assign(globalThis, { self, caches, fetch: sandboxFetch, Response, URL, TypeError })
)
vm.runInThisContext(readFileSync('public/sw.js', 'utf-8'), { filename: 'sw.js' })

function makeEvent(request) {
  const event = { request, waited: null, responded: null }
  event.waitUntil = (promise) => {
    event.waited = promise
  }
  event.respondWith = (promise) => {
    event.responded = promise
  }
  return event
}

function makeRequest(url, { mode = 'no-cors', method = 'GET' } = {}) {
  return { url, method, mode }
}

// 1. Install caches the app shell.
const installEvent = makeEvent(null)
await listeners.install(installEvent)
await installEvent.waited
const shellCache = [...cacheStorage.values()][0]
check(
  'install caches the app shell',
  Boolean(await shellCache.match('/index.html')) && Boolean(await shellCache.match('/')),
  `${shellCache.entries.size} entries`
)

// 2. An asset fetched while online is cached for later.
const assetOnline = makeEvent(makeRequest(ASSET_URL))
listeners.fetch(assetOnline)
await assetOnline.responded
check('online asset request is stored for offline use', Boolean(await shellCache.match(ASSET_URL)))

// 3. Go offline: a deep-link navigation still resolves to the shell.
online = false
const navEvent = makeEvent(makeRequest(`${ORIGIN}/strands/nutrition/quick-checks`, { mode: 'navigate' }))
listeners.fetch(navEvent)
const navResponse = await navEvent.responded
const navBody = await navResponse.text()
check(
  'offline deep-link navigation falls back to the cached shell',
  navResponse.ok && navBody === SHELL_BODY,
  `status ${navResponse.status}`
)

// 4. Offline asset request is served from cache.
const assetOffline = makeEvent(makeRequest(ASSET_URL))
listeners.fetch(assetOffline)
const assetResponse = await assetOffline.responded
check('offline asset request is served from cache', assetResponse.ok, `status ${assetResponse.status}`)

// 5. Cross-origin calls (Supabase) are left to the network, not intercepted.
const supabaseEvent = makeEvent(makeRequest('https://example.supabase.co/rest/v1/content'))
listeners.fetch(supabaseEvent)
check('cross-origin Supabase call is not intercepted', supabaseEvent.responded === null)

// 6. Activate drops caches from older versions.
cacheStorage.set('funza-v1-stale', new FakeCache())
const activateEvent = makeEvent(null)
await listeners.activate(activateEvent)
await activateEvent.waited
check('activate removes stale caches', !cacheStorage.has('funza-v1-stale'))

const failed = results.filter((result) => !result.passed)
console.log(`\n${results.length - failed.length}/${results.length} offline checks passed`)
process.exit(failed.length ? 1 : 0)
