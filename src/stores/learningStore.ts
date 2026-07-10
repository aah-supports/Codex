import { create } from 'zustand'
import { createId } from '../lib/id'
import { nowIso } from '../lib/date'
import {
  readAllNotes,
  readAllProgress,
  replaceUserData,
  saveNote,
  saveProgress,
} from './userDb'
import type { ModuleProgress, UserDataExport, UserNote } from '../types/content'

type LearningState = {
  hydrated: boolean
  progress: Record<string, ModuleProgress>
  notes: UserNote[]
  hydrate: () => Promise<void>
  markLessonCompleted: (moduleId: string) => Promise<void>
  markExerciseCompleted: (moduleId: string) => Promise<void>
  recordQuizScore: (moduleId: string, score: number) => Promise<void>
  createNote: (payload: { title: string; body: string; tags: string[]; moduleId?: string }) => Promise<void>
  exportUserData: () => UserDataExport
  importUserData: (data: UserDataExport) => Promise<void>
}

function emptyProgress(moduleId: string): ModuleProgress {
  return {
    moduleId,
    lessonCompleted: false,
    exerciseCompleted: false,
    bestQuizScore: 0,
    quizAttempts: 0,
    updatedAt: nowIso(),
  }
}

export const useLearningStore = create<LearningState>((set, get) => ({
  hydrated: false,
  progress: {},
  notes: [],

  async hydrate() {
    const [progressRows, notes] = await Promise.all([readAllProgress(), readAllNotes()])
    const progress = Object.fromEntries(progressRows.map((entry) => [entry.moduleId, entry]))
    set({ hydrated: true, progress, notes })
  },

  async markLessonCompleted(moduleId) {
    const current = get().progress[moduleId] ?? emptyProgress(moduleId)
    const next = { ...current, lessonCompleted: true, updatedAt: nowIso() }
    await saveProgress(next)
    set((state) => ({ progress: { ...state.progress, [moduleId]: next } }))
  },

  async markExerciseCompleted(moduleId) {
    const current = get().progress[moduleId] ?? emptyProgress(moduleId)
    const next = { ...current, exerciseCompleted: true, updatedAt: nowIso() }
    await saveProgress(next)
    set((state) => ({ progress: { ...state.progress, [moduleId]: next } }))
  },

  async recordQuizScore(moduleId, score) {
    const current = get().progress[moduleId] ?? emptyProgress(moduleId)
    const next = {
      ...current,
      bestQuizScore: Math.max(current.bestQuizScore, score),
      quizAttempts: current.quizAttempts + 1,
      updatedAt: nowIso(),
    }
    await saveProgress(next)
    set((state) => ({ progress: { ...state.progress, [moduleId]: next } }))
  },

  async createNote(payload) {
    const timestamp = nowIso()
    const note: UserNote = {
      id: createId('note'),
      title: payload.title,
      body: payload.body,
      tags: payload.tags,
      moduleId: payload.moduleId,
      createdAt: timestamp,
      updatedAt: timestamp,
    }
    await saveNote(note)
    set((state) => ({ notes: [note, ...state.notes] }))
  },

  exportUserData() {
    const state = get()

    return {
      schemaVersion: 1,
      exportedAt: nowIso(),
      progress: state.progress,
      notes: state.notes,
      tags: Array.from(new Set(state.notes.flatMap((note) => note.tags))).sort(),
    }
  },

  async importUserData(data) {
    const progress = Object.values(data.progress)
    await replaceUserData(progress, data.notes)
    set({ progress: data.progress, notes: data.notes })
  },
}))
