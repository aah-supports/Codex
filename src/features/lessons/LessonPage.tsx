import { Link, useParams } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { MarkdownRenderer } from '../../components/MarkdownRenderer'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { getMarkdown } from '../../content/api'
import { useLearningStore } from '../../stores/learningStore'
import type { ParsedMarkdown } from '../../types/content'
import { useCorpusIndex } from '../corpus/useCorpus'

export function LessonPage() {
  const { corpusId, moduleId } = useParams({ from: '/learn/$corpusId/$moduleId' })
  const { data: index } = useCorpusIndex()
  const markLessonCompleted = useLearningStore((state) => state.markLessonCompleted)
  const markExerciseCompleted = useLearningStore((state) => state.markExerciseCompleted)
  const progress = useLearningStore((state) => state.progress[moduleId])

  const corpus = index?.corpora.find((entry) => entry.id === corpusId)
  const module = corpus?.modules.find((entry) => entry.id === moduleId)

  const lesson = useQuery({
    queryKey: ['markdown', module?.paths.lesson],
    queryFn: () => getMarkdown(module!.paths.lesson),
    enabled: Boolean(module),
  })
  const examples = useQuery({
    queryKey: ['markdown', module?.paths.examples],
    queryFn: () => getMarkdown(module!.paths.examples),
    enabled: Boolean(module),
  })
  const exercises = useQuery({
    queryKey: ['markdown', module?.paths.exercises],
    queryFn: () => getMarkdown(module!.paths.exercises),
    enabled: Boolean(module),
  })
  const solutions = useQuery({
    queryKey: ['markdown', module?.paths.solutions],
    queryFn: () => getMarkdown(module!.paths.solutions!),
    enabled: Boolean(module?.paths.solutions),
  })
  const lab = useQuery({
    queryKey: ['markdown', module?.paths.lab],
    queryFn: () => getMarkdown(module!.paths.lab!),
    enabled: Boolean(module?.paths.lab),
  })
  const readings = useQuery({
    queryKey: ['markdown', module?.paths.readings],
    queryFn: () => getMarkdown(module!.paths.readings),
    enabled: Boolean(module),
  })

  if (!module) {
    return <p>Module introuvable.</p>
  }

  return (
    <div className="page-stack">
      <header className="page-header">
        <p className="eyebrow">{corpus?.title}</p>
        <h2>{module.title}</h2>
        <p>{module.description}</p>
        <div className="action-row">
          <Button onClick={() => void markLessonCompleted(moduleId)} variant="secondary">
            Marquer la leçon lue
          </Button>
          <Button onClick={() => void markExerciseCompleted(moduleId)} variant="secondary">
            Exercices faits
          </Button>
          <Link to="/quiz/$corpusId/$moduleId" params={{ corpusId, moduleId }} className="button primary">
            Passer le QCM
          </Link>
        </div>
        <p className="muted">
          Leçon: {progress?.lessonCompleted ? 'terminée' : 'en cours'} · Exercices:{' '}
          {progress?.exerciseCompleted ? 'terminés' : 'à faire'}
        </p>
      </header>

      <div className="lesson-layout">
        <Card className="markdown-card">
          <h3>Leçon</h3>
          <MarkdownState query={lesson} />
        </Card>
        <Card className="markdown-card">
          <h3>Exemples</h3>
          <MarkdownState query={examples} />
        </Card>
        <Card className="markdown-card">
          <h3>Exercices</h3>
          <MarkdownState query={exercises} />
        </Card>
        {module.paths.solutions ? (
          <Card className="markdown-card solution-card">
            <div className="solution-heading">
              <p className="eyebrow">Après l’exercice</p>
              <h3>Corrections guidées</h3>
            </div>
            <MarkdownState query={solutions} />
          </Card>
        ) : null}
        {module.paths.lab ? (
          <Card className="markdown-card">
            <h3>Atelier guidé</h3>
            <MarkdownState query={lab} />
          </Card>
        ) : null}
        <Card className="markdown-card">
          <h3>Lectures</h3>
          <MarkdownState query={readings} />
        </Card>
      </div>
    </div>
  )
}

function MarkdownState({
  query,
}: {
  query: ReturnType<typeof useQuery<ParsedMarkdown>>
}) {
  if (query.isLoading) {
    return <p>Chargement...</p>
  }

  if (query.error || !query.data) {
    return <p>Contenu indisponible.</p>
  }

  return (
    <>
      <ContentTags tags={getFrontmatterTags(query.data)} />
      <MarkdownRenderer>{query.data.body}</MarkdownRenderer>
    </>
  )
}

const tagLabels: Record<string, string> = {
  def: 'Définition',
  important: 'Important',
}

const visibleTags = new Set(['def', 'important'])

function getFrontmatterTags(markdown: ParsedMarkdown | undefined) {
  if (!markdown) {
    return []
  }

  return uniqueStrings(toStringArray(markdown.frontmatter.tags)).filter((tag) => visibleTags.has(tag))
}

function toStringArray(value: ParsedMarkdown['frontmatter'][string]) {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string')
  }

  return typeof value === 'string' ? [value] : []
}

function uniqueStrings(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)))
}

function formatTag(tag: string) {
  return tagLabels[tag] ?? tag.replaceAll('-', ' ')
}

function ContentTags({ tags }: { tags: string[] }) {
  if (tags.length === 0) {
    return null
  }

  return (
    <div className="content-tags" aria-label="Tags du contenu">
      {tags.map((tag) => (
        <Badge key={tag}>{formatTag(tag)}</Badge>
      ))}
    </div>
  )
}
