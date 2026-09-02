import { strandPacks, type StrandPack } from '@/data/strands'

const DB_NAME = 'elimu-offline'
const DB_VERSION = 1
const STORE_NAME = 'strand-packs'

/** IndexedDB cannot structured-clone the icon component, so it is dropped here. */
export type CachedStrandPack = Omit<StrandPack, 'icon'>

function toCachedPack({ icon: _icon, ...rest }: StrandPack): CachedStrandPack {
  return rest
}

function openDatabase() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = () => {
      const db = request.result

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' })
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

/** Writes every strand pack to IndexedDB so the whole curriculum survives a reload offline. */
export async function seedOfflineContent() {
  if (!('indexedDB' in window)) {
    return null
  }

  const db = await openDatabase()
  const packs = strandPacks.map(toCachedPack)

  return new Promise<CachedStrandPack[]>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite')
    const store = transaction.objectStore(STORE_NAME)

    for (const pack of packs) {
      store.put(pack)
    }

    transaction.oncomplete = () => resolve(packs)
    transaction.onerror = () => reject(transaction.error)
  })
}
