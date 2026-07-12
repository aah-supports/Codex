import { getCorpusIndex, getMarkdown } from '../content/api'
import type { CorpusSummary, ModuleSummary } from '../types/content'

export type KnowledgeSection = 'lesson' | 'examples' | 'exercises' | 'solutions' | 'lab' | 'readings'

export type KnowledgeSource = {
  corpusId: string
  corpusTitle: string
  moduleId: string
  moduleTitle: string
  section: KnowledgeSection
  sectionLabel: string
  path: string
  title: string
  tags: string[]
  body: string
  excerpt: string
  score: number
}

const sectionLabels: Record<KnowledgeSection, string> = {
  lesson: 'Leçon',
  examples: 'Exemples',
  exercises: 'Exercices',
  solutions: 'Corrections',
  lab: 'Atelier',
  readings: 'Lectures',
}

export async function loadKnowledgeSources(corpusId?: string) {
  const index = await getCorpusIndex()
  const corpora = corpusId ? index.corpora.filter((corpus) => corpus.id === corpusId) : index.corpora

  const jobs = corpora.flatMap((corpus) => corpus.modules.flatMap((module) => buildModuleSources(corpus, module)))
  return Promise.all(jobs)
}

export function rankKnowledgeSources(query: string, sources: KnowledgeSource[], limit = 4) {
  const normalizedQuery = normalize(query)
  const terms = tokenize(normalizedQuery)

  return sources
    .map((source) => ({
      ...source,
      score: scoreSource(source, terms, normalizedQuery),
      excerpt: makeExcerpt(source.body, query),
    }))
    .filter((source) => source.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, limit)
}

export function formatSourceLabel(source: KnowledgeSource) {
  return `${source.moduleTitle} · ${source.sectionLabel}`
}

function buildModuleSources(corpus: CorpusSummary, module: ModuleSummary) {
  const entries: Array<[KnowledgeSection, string | undefined, string]> = [
    ['lesson', module.paths.lesson, module.title],
    ['examples', module.paths.examples, `${module.title} - Exemples`],
    ['exercises', module.paths.exercises, `${module.title} - Exercices`],
    ['solutions', module.paths.solutions, `${module.title} - Corrections`],
    ['lab', module.paths.lab, `${module.title} - Atelier`],
    ['readings', module.paths.readings, `${module.title} - Lectures`],
  ]

  return entries.flatMap(([section, path, title]) => {
    if (!path) {
      return []
    }

    return loadSection(corpus, module, section, path, title)
  })
}

async function loadSection(
  corpus: CorpusSummary,
  module: ModuleSummary,
  section: KnowledgeSection,
  path: string,
  title: string,
): Promise<KnowledgeSource> {
  const markdown = await getMarkdown(path)

  return {
    corpusId: corpus.id,
    corpusTitle: corpus.title,
    moduleId: module.id,
    moduleTitle: module.title,
    section,
    sectionLabel: sectionLabels[section],
    path,
    title,
    tags: uniqueTags([
      ...toStringArray(markdown.frontmatter.tags),
      ...module.tags,
      section,
      corpus.id,
      module.slug,
    ]),
    body: markdown.body,
    excerpt: makeExcerpt(markdown.body, module.title),
    score: 0,
  }
}

function scoreSource(source: KnowledgeSource, terms: string[], normalizedQuery: string) {
  if (!terms.length) {
    return 0
  }

  const haystack = normalize(
    [
      source.corpusTitle,
      source.moduleTitle,
      source.sectionLabel,
      source.title,
      source.tags.join(' '),
      source.body,
    ].join(' '),
  )

  let score = 0

  for (const term of terms) {
    const occurrences = countOccurrences(haystack, term)
    score += occurrences
  }

  if (normalizedQuery && haystack.includes(normalizedQuery)) {
    score += 8
  }

  if (normalize(source.moduleTitle).includes(normalizedQuery)) {
    score += 4
  }

  if (normalize(source.sectionLabel).includes(normalizedQuery)) {
    score += 3
  }

  if (source.tags.some((tag) => normalize(tag).includes(normalizedQuery))) {
    score += 4
  }

  return score
}

function makeExcerpt(body: string, query: string) {
  const normalizedQuery = normalize(query)
  const paragraphs = body
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean)

  if (!paragraphs.length) {
    return ''
  }

  const ranked = paragraphs
    .map((paragraph) => ({
      paragraph,
      score: countOccurrences(normalize(paragraph), normalizedQuery),
    }))
    .sort((left, right) => right.score - left.score)

  const selected = ranked[0]?.paragraph ?? paragraphs[0]
  return truncate(selected.replace(/\s+/g, ' '), 220)
}

function toStringArray(value: string | string[] | number | boolean | undefined) {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string')
  }

  return typeof value === 'string' ? [value] : []
}

function uniqueTags(values: string[]) {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)))
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

function tokenize(value: string) {
  return normalize(value)
    .split(/[^a-z0-9]+/g)
    .map((item) => item.trim())
    .filter((item) => item.length > 2)
}

function countOccurrences(source: string, needle: string) {
  if (!needle) {
    return 0
  }

  let count = 0
  let index = 0

  while ((index = source.indexOf(needle, index)) !== -1) {
    count += 1
    index += needle.length
  }

  return count
}

function truncate(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value
  }

  return `${value.slice(0, maxLength - 1).trimEnd()}…`
}
