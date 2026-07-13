import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'
import { QuizQuestions } from '../../components/QuizQuestions'
import { MarkdownRenderer } from '../../components/MarkdownRenderer'
import { getCorpusIndex, getGeneratedContentIndex, getMarkdown } from '../../content/api'
import { createGeneratedDraft, saveGeneratedDraft } from '../../lib/generatedDrafts'
import { generateWithOllama, getDefaultOllamaConfig, readOllamaConfig } from '../../lib/ollama'
import { parseQuizMarkdown } from '../../lib/markdown'
import type { GeneratedContentKind } from '../../types/content'

const kindLabels: Record<GeneratedContentKind, string> = {
  qcm: 'QCM',
  exercise: 'Exercice',
  correction: 'Correction',
}

export function GenerationPage() {
  const corpusIndex = useQuery({
    queryKey: ['corpus-index'],
    queryFn: getCorpusIndex,
  })
  const generatedIndex = useQuery({
    queryKey: ['generated-index'],
    queryFn: getGeneratedContentIndex,
  })
  const [config, setConfig] = useState(getDefaultOllamaConfig)
  const [kind, setKind] = useState<GeneratedContentKind>('qcm')
  const [corpusId, setCorpusId] = useState('poo')
  const [moduleId, setModuleId] = useState('')
  const [tagInput, setTagInput] = useState('generated, local')
  const [prompt, setPrompt] = useState('')
  const [output, setOutput] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const corpus = corpusIndex.data?.corpora.find((entry) => entry.id === corpusId)
  const module = corpus?.modules.find((entry) => entry.id === moduleId)
  const lesson = useQuery({
    queryKey: ['markdown', module?.paths.lesson],
    queryFn: () => getMarkdown(module!.paths.lesson),
    enabled: Boolean(module?.paths.lesson),
  })

  useEffect(() => {
    setConfig(readOllamaConfig())
  }, [])

  useEffect(() => {
    if (!module && corpus?.modules.length) {
      setModuleId(corpus.modules[0].id)
    }
  }, [corpus, module])

  async function handleGenerate() {
    if (!module) {
      setError('Choisis un module de corpus.')
      return
    }

    if (!config.enabled) {
      setError('Active l’IA dans les paramètres avant de lancer une génération.')
      return
    }

    setStatus('loading')
    setError('')

    try {
      const generatedMarkdown = await generateWithOllama(config, {
        kind,
        title: module.title,
        prompt: buildKindPrompt(kind, prompt),
        corpusTitle: corpus?.title ?? 'Corpus',
        moduleTitle: module.title,
        moduleDescription: module.description,
        lesson: lesson.data?.body,
        tags: extractTags(tagInput, module.tags),
      })

      const draft = createGeneratedDraft({
        kind,
        title: module.title,
        tags: extractTags(tagInput, module.tags),
        prompt,
        markdown: generatedMarkdown,
        model: config.model,
        sourceModuleId: module.id,
        sourceCorpusId: corpus?.id,
      })

      saveGeneratedDraft(draft)
      setOutput(generatedMarkdown)
      setStatus('success')
    } catch (caught) {
      setStatus('error')
      setError(caught instanceof Error ? caught.message : 'Génération impossible.')
    }
  }

  function handleDownload(markdown: string, filename: string) {
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="page-stack">
      <header className="page-header">
        <p className="eyebrow">Génération</p>
        <h2>Génération de contenus</h2>
        <p>
          Le moteur est activé dans les paramètres. Ici, tu choisis le type de contenu, le corpus source et la
          consigne.
        </p>
      </header>

      <div className="generation-grid">
        <Card className="generation-panel">
          <div className="card-header">
            <h3>Créer un contenu</h3>
            <Badge>{kindLabels[kind]}</Badge>
          </div>
          <label>
            Type
            <select value={kind} onChange={(event) => setKind(event.target.value as GeneratedContentKind)}>
              <option value="qcm">QCM</option>
              <option value="exercise">Exercice</option>
              <option value="correction">Correction</option>
            </select>
          </label>
          <label>
            Corpus
            <select value={corpusId} onChange={(event) => setCorpusId(event.target.value)}>
              {corpusIndex.data?.corpora.map((entry) => (
                <option key={entry.id} value={entry.id}>
                  {entry.title}
                </option>
              ))}
            </select>
          </label>
          <label>
            Module
            <select value={moduleId} onChange={(event) => setModuleId(event.target.value)}>
              {corpus?.modules.map((entry) => (
                <option key={entry.id} value={entry.id}>
                  {entry.title}
                </option>
              ))}
            </select>
          </label>
          <label>
            Tags de recherche
            <input value={tagInput} onChange={(event) => setTagInput(event.target.value)} placeholder="solid, invariants" />
          </label>
          <label>
            Consigne locale
            <textarea
              rows={8}
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder="Décris précisément ce que tu veux générer."
            />
          </label>
          <div className="card-actions">
            <Button onClick={() => void handleGenerate()} disabled={status === 'loading' || !config.enabled}>
              {status === 'loading' ? 'Génération...' : 'Générer'}
            </Button>
          </div>
          {error ? <p className="generation-error">{error}</p> : null}
          <p className="generation-hint">
            {config.enabled
              ? `Moteur actif: ${config.provider === 'local' ? 'local' : 'API'} · ${config.model}`
              : 'Active le moteur dans Paramètres pour lancer une génération.'}
          </p>
        </Card>
      </div>

      <Card className="generation-panel">
        <div className="card-header">
          <h3>Références de rangement</h3>
          <Badge>{generatedIndex.data?.buckets.length ?? 0} dossiers</Badge>
        </div>
        <div className="generated-bucket-list">
          {generatedIndex.data?.buckets.map((bucket) => (
            <div className="generated-bucket" key={bucket.kind}>
              <strong>{bucket.title}</strong>
              <span>{bucket.directory}</span>
              <small>{bucket.tags.join(' · ')}</small>
            </div>
          ))}
        </div>
      </Card>

      {output && kind === 'qcm' ? (
        <Card className="generation-output">
          <div className="card-header">
            <h3>Dernier QCM généré</h3>
            <div className="card-actions">
              <Button
                variant="secondary"
                onClick={() =>
                  handleDownload(output, `${kind}-${slugify(module?.title ?? 'generated')}.md`)
                }
              >
                Télécharger
              </Button>
            </div>
          </div>
          <QuizQuestions questions={parseQuizMarkdown(output)} submitLabel="Valider l’aperçu" />
        </Card>
      ) : output ? (
        <Card className="generation-output">
          <div className="card-header">
            <h3>Dernière génération</h3>
            <div className="card-actions">
              <Button
                variant="secondary"
                onClick={() =>
                  handleDownload(output, `${kind}-${slugify(module?.title ?? 'generated')}.md`)
                }
              >
                Télécharger
              </Button>
            </div>
          </div>
          <MarkdownRenderer copyCode copyText>{output}</MarkdownRenderer>
        </Card>
      ) : null}

    </div>
  )
}

function extractTags(tagInput: string, fallbackTags: string[]) {
  return Array.from(
    new Set(
      tagInput
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean)
        .concat(fallbackTags),
    ),
  )
}

function buildKindPrompt(kind: GeneratedContentKind, prompt: string) {
  const base = prompt.trim()

  if (base) {
    return base
  }

  if (kind === 'qcm') {
    return 'Génère 5 questions de QCM avec 4 réponses, une seule correcte, et une explication courte pour chacune.'
  }

  if (kind === 'exercise') {
    return 'Génère un exercice progressif avec un énoncé, un guidage et un niveau autonome.'
  }

  return "Génère une correction claire avec raisonnement pas à pas, erreurs fréquentes et correction type."
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
