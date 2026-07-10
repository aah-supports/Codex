import type { ParsedMarkdown, QuizQuestion } from '../types/content'

export function parseMarkdown(input: string): ParsedMarkdown {
  if (!input.startsWith('---')) {
    return { frontmatter: {}, body: input.trim() }
  }

  const end = input.indexOf('\n---', 3)

  if (end === -1) {
    return { frontmatter: {}, body: input.trim() }
  }

  const rawFrontmatter = input.slice(3, end).trim()
  const body = input.slice(end + 4).trim()

  return {
    frontmatter: parseSimpleYaml(rawFrontmatter),
    body,
  }
}

function parseSimpleYaml(input: string): ParsedMarkdown['frontmatter'] {
  const result: ParsedMarkdown['frontmatter'] = {}
  const lines = input.split('\n')
  let currentKey: string | null = null

  for (const rawLine of lines) {
    const line = rawLine.trim()

    if (!line) {
      continue
    }

    if (line.startsWith('- ') && currentKey) {
      const current = result[currentKey]
      const values = Array.isArray(current) ? current : []
      result[currentKey] = [...values, line.slice(2).trim()]
      continue
    }

    const separator = line.indexOf(':')

    if (separator === -1) {
      continue
    }

    const key = line.slice(0, separator).trim()
    const value = line.slice(separator + 1).trim()
    currentKey = key

    if (!value) {
      result[key] = []
      continue
    }

    result[key] = coerceYamlValue(value)
  }

  return result
}

function coerceYamlValue(value: string) {
  if (value === 'true') return true
  if (value === 'false') return false

  const numeric = Number(value)
  if (!Number.isNaN(numeric) && value.trim() !== '') {
    return numeric
  }

  return value.replace(/^["']|["']$/g, '')
}

export function parseQuizMarkdown(input: string): QuizQuestion[] {
  const { body } = parseMarkdown(input)
  const blocks = body.split(/\n---\n/g)

  return blocks.flatMap((block, index) => {
    const lines = block
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)

    const question = lines.find((line) => line.startsWith('Question:'))?.replace('Question:', '').trim()
    const answer = lines.find((line) => line.startsWith('Answer:'))?.replace('Answer:', '').trim()
    const explanation = lines
      .find((line) => line.startsWith('Explanation:'))
      ?.replace('Explanation:', '')
      .trim()
    const choices = lines
      .filter((line) => /^[A-D]\./.test(line))
      .map((line) => line.replace(/^[A-D]\.\s*/, '').trim())

    if (!question || !answer || !explanation || choices.length === 0) {
      return []
    }

    return {
      id: `q-${index + 1}`,
      question,
      choices,
      answerIndex: Math.max(0, choices.findIndex((choice) => choice === answer)),
      explanation,
    }
  })
}
