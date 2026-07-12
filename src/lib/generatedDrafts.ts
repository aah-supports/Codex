import type { GeneratedContentKind, GeneratedDraft } from '../types/content'
import { nowIso } from './date'

const STORAGE_KEY = 'poo-learning-generated-drafts'

export function readGeneratedDrafts(): GeneratedDraft[] {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)

    if (!raw) {
      return []
    }

    const parsed = JSON.parse(raw) as GeneratedDraft[]

    return parsed.filter((item) => item && typeof item.id === 'string')
  } catch {
    return []
  }
}

export function saveGeneratedDraft(draft: GeneratedDraft) {
  const drafts = readGeneratedDrafts()
  const index = drafts.findIndex((item) => item.id === draft.id)
  const next = index >= 0 ? drafts.map((item) => (item.id === draft.id ? draft : item)) : [draft, ...drafts]
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
}

export function deleteGeneratedDraft(id: string) {
  const next = readGeneratedDrafts().filter((draft) => draft.id !== id)
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
}

export function replaceGeneratedDrafts(drafts: GeneratedDraft[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts))
}

export function createGeneratedDraft(input: {
  kind: GeneratedContentKind
  title: string
  tags: string[]
  prompt: string
  markdown: string
  model: string
  sourceModuleId?: string
  sourceCorpusId?: string
}) {
  const timestamp = nowIso()

  return {
    id: globalThis.crypto.randomUUID(),
    kind: input.kind,
    title: input.title,
    tags: input.tags,
    sourceModuleId: input.sourceModuleId,
    sourceCorpusId: input.sourceCorpusId,
    prompt: input.prompt,
    markdown: input.markdown,
    model: input.model,
    createdAt: timestamp,
    updatedAt: timestamp,
  } satisfies GeneratedDraft
}
