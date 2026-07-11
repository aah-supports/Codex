import { parseMarkdown, parseQuizMarkdown } from '../lib/markdown'
import type { CorpusIndex, ParsedMarkdown, PersonalSheetIndex, QuizQuestion } from '../types/content'

const publicBase = import.meta.env.BASE_URL
const corpusBase = publicPath('corpus')
const sheetsBase = publicPath('fiches')

function publicPath(path: string) {
  return `${publicBase}${path}`.replace(/\/{2,}/g, '/')
}

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

export function getPersonalSheetIndex() {
  return fetchJson<PersonalSheetIndex>(`${sheetsBase}/index.json`)
}

export async function getPersonalSheet(path: string): Promise<ParsedMarkdown> {
  return parseMarkdown(await fetchText(`${sheetsBase}/${path}`))
}
