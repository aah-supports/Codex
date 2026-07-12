import type { GeneratedContentKind, GeneratedDraft, ParsedMarkdown } from '../types/content'
import type { KnowledgeSource } from './corpusKnowledge'

const DEFAULT_OLLAMA_BASE_URL = 'http://localhost:11434'
const DEFAULT_OLLAMA_MODEL = 'gemma4:e4b-mlx'
const OLLAMA_CONFIG_KEY = 'poo-learning-ollama-config'

export type OllamaConfig = {
  baseUrl: string
  model: string
}

type GenerateOptions = {
  kind: GeneratedContentKind
  title: string
  prompt: string
  corpusTitle: string
  moduleTitle?: string
  moduleDescription?: string
  lesson?: ParsedMarkdown['body']
  tags: string[]
}

export function getDefaultOllamaConfig(): OllamaConfig {
  return {
    baseUrl: DEFAULT_OLLAMA_BASE_URL,
    model: DEFAULT_OLLAMA_MODEL,
  }
}

export function readOllamaConfig(): OllamaConfig {
  if (typeof window === 'undefined') {
    return getDefaultOllamaConfig()
  }

  try {
    const raw = window.localStorage.getItem(OLLAMA_CONFIG_KEY)

    if (!raw) {
      return getDefaultOllamaConfig()
    }

    const parsed = JSON.parse(raw) as Partial<OllamaConfig>

    return {
      baseUrl: parsed.baseUrl?.trim() || DEFAULT_OLLAMA_BASE_URL,
      model: parsed.model?.trim() || DEFAULT_OLLAMA_MODEL,
    }
  } catch {
    return getDefaultOllamaConfig()
  }
}

export function saveOllamaConfig(config: OllamaConfig) {
  window.localStorage.setItem(OLLAMA_CONFIG_KEY, JSON.stringify(config))
}

export async function generateWithOllama(config: OllamaConfig, options: GenerateOptions) {
  const response = await fetch(`${config.baseUrl.replace(/\/$/, '')}/api/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: config.model,
      stream: false,
      prompt: buildPrompt(options),
    }),
  })

  if (!response.ok) {
    throw new Error(`Ollama a répondu ${response.status}`)
  }

  const payload = (await response.json()) as { response?: string }

  return (payload.response ?? '').trim()
}

export async function chatWithOllama(
  config: OllamaConfig,
  options: {
    corpusTitle: string
    corpusDescription?: string
    question: string
    history: Array<{ role: 'user' | 'assistant'; content: string }>
    sources: KnowledgeSource[]
  },
) {
  const response = await fetch(`${config.baseUrl.replace(/\/$/, '')}/api/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: config.model,
      stream: false,
      prompt: buildChatPrompt(options),
    }),
  })

  if (!response.ok) {
    throw new Error(`Ollama a répondu ${response.status}`)
  }

  const payload = (await response.json()) as { response?: string }

  return (payload.response ?? '').trim()
}

function buildPrompt(options: GenerateOptions) {
  const contextLines = [
    `Tu travailles sur le corpus "${options.corpusTitle}".`,
    `Type à produire : ${formatKind(options.kind)}.`,
    options.moduleTitle ? `Chapitre source : ${options.moduleTitle}.` : null,
    options.moduleDescription ? `Objectif du chapitre : ${options.moduleDescription}.` : null,
    options.lesson ? `Contexte du cours : ${options.lesson}` : null,
    options.tags.length ? `Tags à respecter : ${options.tags.join(', ')}.` : null,
    '',
    options.prompt.trim(),
    '',
    'Contraintes de sortie :',
    '- écrire en français avec accents ;',
    '- rester cohérent avec le corpus ;',
    '- ne pas ajouter de préambule ;',
    '- produire uniquement le Markdown demandé ;',
    '- si le type est un QCM, suivre le format Question / A-D / Answer / Explanation.',
  ]

  return contextLines.filter(Boolean).join('\n')
}

function formatKind(kind: GeneratedContentKind) {
  return kind === 'qcm' ? 'QCM' : kind === 'exercise' ? 'exercice' : 'correction'
}

function buildChatPrompt(options: {
  corpusTitle: string
  corpusDescription?: string
  question: string
  history: Array<{ role: 'user' | 'assistant'; content: string }>
  sources: KnowledgeSource[]
}) {
  const historyBlock = options.history
    .map((message) => `${message.role === 'user' ? 'Utilisateur' : 'Assistant'}: ${message.content}`)
    .join('\n\n')

  const sourceBlock = options.sources
    .map((source) => {
      return [
        `- ${source.corpusTitle} / ${source.moduleTitle} / ${source.sectionLabel}`,
        `  Extrait: ${source.excerpt}`,
        `  Chemin: ${source.path}`,
      ].join('\n')
    })
    .join('\n\n')

  return [
    `Tu es un tuteur universitaire pour le corpus "${options.corpusTitle}".`,
    options.corpusDescription ? `Description du corpus: ${options.corpusDescription}.` : null,
    'Tu réponds en français, avec des accents corrects, un ton académique clair, précis et imagé, sans formule de salutation ni émoticône.',
    'Tu restes directement relié au corpus. Tu explicites les notions avant de les utiliser quand c’est utile.',
    'Quand du code est pertinent, utilise des blocs Markdown avec le langage adapté, par exemple java pour le corpus POO Java.',
    'Diversifie les exemples: privilégie des exemples issus du logiciel, de bibliothèques, d’applications métier, de réservation, de gestion de compte, de calendrier, de panier, de dossier ou du quotidien. Le cinéma peut servir de contexte, mais ne doit pas dominer la réponse.',
    'Quand un concept peut être éclairé par plusieurs exemples, utilise au moins deux contextes différents.',
    'Tu t’appuies d’abord sur le corpus fourni. Si un point n’est pas couvert, tu le dis explicitement.',
    'Tu évites les généralités floues et les tournures artificielles.',
    '',
    'Historique:',
    historyBlock || '(aucun)',
    '',
    'Corpus pertinent:',
    sourceBlock || '(aucune source)',
    '',
    `Question actuelle: ${options.question}`,
    '',
    'Réponds directement en Markdown, avec une explication structurée puis une section finale "Références du cours" claire et lisible.',
    'Dans cette section finale, liste le corpus, le chapitre et les passages concernés sous forme de liens ou de puces lisibles, sans numérotation artificielle.',
    'N’utilise pas le libellé "Source X".',
  ]
    .filter(Boolean)
    .join('\n')
}
