import { parseMarkdown, parseQuizMarkdown } from '../lib/markdown'
import type { CorpusIndex, ParsedMarkdown, QuizQuestion } from '../types/content'

const corpusBase = '/corpus'

async function fetchText(path: string) {
  const response = await fetch(path)

  if (!response.ok) {
    throw new Error(`Impossible de charger ${path}`)
  }

  return response.text()
}

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(path)

  if (!response.ok) {
    throw new Error(`Impossible de charger ${path}`)
  }

  return response.json() as Promise<T>
}

export function getCorpusIndex() {
  return fetchJson<CorpusIndex>(`${corpusBase}/index.json`)
}

export async function getMarkdown(path: string): Promise<ParsedMarkdown> {
  return parseMarkdown(await fetchText(`${corpusBase}/${path}`))
}

export async function getQuiz(path: string): Promise<QuizQuestion[]> {
  return parseQuizMarkdown(await fetchText(`${corpusBase}/${path}`))
}
