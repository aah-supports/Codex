import { create } from 'zustand'
import { nowIso } from '../lib/date'
import { readAllProgress, replaceUserData, saveProgress } from './userDb'
import type { ModuleProgress, UserDataExport } from '../types/content'

type LearningState = {
  hydrated: boolean
  progress: Record<string, ModuleProgress>
  hydrate: () => Promise<void>
  markLessonCompleted: (moduleId: string) => Promise<void>
  markExerciseCompleted: (moduleId: string) => Promise<void>
  recordQuizScore: (moduleId: string, score: number) => Promise<void>
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

  async hydrate() {
    const progressRows = await readAllProgress()
    const progress = Object.fromEntries(progressRows.map((entry) => [entry.moduleId, entry]))
    set({ hydrated: true, progress })
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

  exportUserData() {
    const state = get()

    return {
      schemaVersion: 1,
      exportedAt: nowIso(),
      progress: state.progress,
    }
  },

  async importUserData(data) {
    const progress = Object.values(data.progress)
    await replaceUserData(progress)
    set({ progress: data.progress })
  },
}))
