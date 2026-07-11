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
  setSelfAssessment: (moduleId: string, value: number) => Promise<void>
  recordQuizScore: (moduleId: string, score: number) => Promise<void>
  exportUserData: () => UserDataExport
  importUserData: (data: UserDataExport) => Promise<void>
}

function emptyProgress(moduleId: string): ModuleProgress {
  return {
    moduleId,
    lessonCompleted: false,
    exerciseCompleted: false,
    selfAssessment: 0,
    bestQuizScore: 0,
    quizAttempts: 0,
    updatedAt: nowIso(),
  }
}

function normalizeProgress(progress: ModuleProgress): ModuleProgress {
  return {
    ...emptyProgress(progress.moduleId),
    ...progress,
    selfAssessment: clampProgress(progress.selfAssessment ?? 0),
  }
}

function clampProgress(value: number) {
  return Math.min(100, Math.max(0, Math.round(value)))
}

export const useLearningStore = create<LearningState>((set, get) => ({
  hydrated: false,
  progress: {},

  async hydrate() {
    const progressRows = await readAllProgress()
    const progress = Object.fromEntries(progressRows.map((entry) => [entry.moduleId, normalizeProgress(entry)]))
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

  async setSelfAssessment(moduleId, value) {
    const current = get().progress[moduleId] ?? emptyProgress(moduleId)
    const next = { ...current, selfAssessment: clampProgress(value), updatedAt: nowIso() }
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
    const progress = Object.values(data.progress).map(normalizeProgress)
    const nextProgress = Object.fromEntries(progress.map((entry) => [entry.moduleId, entry]))
    await replaceUserData(progress)
    set({ progress: nextProgress })
  },
}))
