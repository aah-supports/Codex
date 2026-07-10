import { openDB, type DBSchema } from 'idb'
import type { ModuleProgress } from '../types/content'

type MetaRecord = {
  key: string
  value: unknown
}

interface LearningDb extends DBSchema {
  progress: {
    key: string
    value: ModuleProgress
  }
  notes: {
    key: string
    value: unknown
  }
  meta: {
    key: string
    value: MetaRecord
  }
}

const dbPromise = openDB<LearningDb>('poo-learning', 2, {
  upgrade(db, oldVersion) {
    if (!db.objectStoreNames.contains('progress')) {
      db.createObjectStore('progress', { keyPath: 'moduleId' })
    }

    if (!db.objectStoreNames.contains('meta')) {
      db.createObjectStore('meta', { keyPath: 'key' })
    }

    if (oldVersion < 2 && db.objectStoreNames.contains('notes')) {
      db.deleteObjectStore('notes')
    }
  },
})

export async function readAllProgress() {
  return (await dbPromise).getAll('progress')
}

export async function saveProgress(progress: ModuleProgress) {
  await (await dbPromise).put('progress', progress)
}

export async function replaceUserData(progress: ModuleProgress[]) {
  const db = await dbPromise
  const tx = db.transaction('progress', 'readwrite')
  await tx.objectStore('progress').clear()

  await Promise.all([
    ...progress.map((entry) => tx.objectStore('progress').put(entry)),
    tx.done,
  ])
}
