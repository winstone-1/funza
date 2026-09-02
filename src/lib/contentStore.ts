import { strandPack } from '@/data/preparation'

const DB_NAME = 'elimu-offline'
const DB_VERSION = 1
const STORE_NAME = 'strand-packs'

export type CachedStrandPack = typeof strandPack

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

export async function seedOfflineContent() {
  if (!('indexedDB' in window)) {
    return null
  }

  const db = await openDatabase()

  return new Promise<CachedStrandPack>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite')
    const store = transaction.objectStore(STORE_NAME)

    store.put(strandPack)

    transaction.oncomplete = () => resolve(strandPack)
    transaction.onerror = () => reject(transaction.error)
  })
}