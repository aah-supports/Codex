import { openDB, type DBSchema } from 'idb'
import type { ModuleProgress, UserNote } from '../types/content'

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
    value: UserNote
    indexes: {
      'by-updated': string
    }
  }
  meta: {
    key: string
    value: MetaRecord
  }
}

const dbPromise = openDB<LearningDb>('poo-learning', 1, {
  upgrade(db) {
    db.createObjectStore('progress', { keyPath: 'moduleId' })

    const notes = db.createObjectStore('notes', { keyPath: 'id' })
    notes.createIndex('by-updated', 'updatedAt')

    db.createObjectStore('meta', { keyPath: 'key' })
  },
})

export async function readAllProgress() {
  return (await dbPromise).getAll('progress')
}

export async function saveProgress(progress: ModuleProgress) {
  await (await dbPromise).put('progress', progress)
}

export async function readAllNotes() {
  return (await dbPromise).getAll('notes')
}

export async function saveNote(note: UserNote) {
  await (await dbPromise).put('notes', note)
}

export async function deleteNote(id: string) {
  await (await dbPromise).delete('notes', id)
}

export async function replaceUserData(progress: ModuleProgress[], notes: UserNote[]) {
  const db = await dbPromise
  const tx = db.transaction(['progress', 'notes'], 'readwrite')
  await tx.objectStore('progress').clear()
  await tx.objectStore('notes').clear()

  await Promise.all([
    ...progress.map((entry) => tx.objectStore('progress').put(entry)),
    ...notes.map((note) => tx.objectStore('notes').put(note)),
    tx.done,
  ])
}
