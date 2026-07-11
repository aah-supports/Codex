import type { ComponentPropsWithoutRef } from 'react'
import { Link, useParams } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import ReactMarkdown from 'react-markdown'
import hljs from 'highlight.js/lib/core'
import java from 'highlight.js/lib/languages/java'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { getMarkdown } from '../../content/api'
import { useLearningStore } from '../../stores/learningStore'
import type { ParsedMarkdown } from '../../types/content'
import { useCorpusIndex } from '../corpus/useCorpus'

hljs.registerLanguage('java', java)

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

  const contentItems = [
    { query: lesson },
    { query: examples },
    { query: exercises },
    { query: solutions },
    { query: lab },
    { query: readings },
  ]
  const contentTags = uniqueStrings([
    ...module.tags,
    ...contentItems.flatMap((item) => getFrontmatterTags(item.query.data)),
  ])
  const learningMarkers = contentTags.filter((tag) => pedagogicalTags.has(tag))
  const conceptMarkers = contentTags.filter((tag) => !pedagogicalTags.has(tag))

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

      <Card className="module-summary-card">
        <div>
          <p className="eyebrow">Résumé visuel</p>
          <h3>Repères du module</h3>
        </div>
        <TagGroup title="Types de contenu" tags={learningMarkers} />
        <TagGroup title="Notions travaillées" tags={conceptMarkers} />
      </Card>

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
      <ReactMarkdown components={{ code: CodeBlock }}>{query.data.body}</ReactMarkdown>
    </>
  )
}

const tagLabels: Record<string, string> = {
  'a-retenir': 'À retenir',
  'anti-pattern': 'Anti-pattern',
  architecture: 'Architecture',
  association: 'Association',
  atelier: 'Atelier',
  adapter: 'Adapter',
  classe: 'Classe',
  'code-smell': 'Code smell',
  comportement: 'Comportement',
  cohesion: 'Cohésion',
  composition: 'Composition',
  contrat: 'Contrat',
  correction: 'Correction',
  couplage: 'Couplage',
  definition: 'Définition',
  dip: 'DIP',
  domaine: 'Domaine',
  encapsulation: 'Encapsulation',
  erreur: 'Erreur fréquente',
  exception: 'Exception',
  exemple: 'Exemple',
  exercice: 'Exercice',
  glossaire: 'Glossaire',
  heritage: 'Héritage',
  interface: 'Interface',
  invariant: 'Invariant',
  lecture: 'Lecture',
  objet: 'Objet',
  polymorphisme: 'Polymorphisme',
  port: 'Port',
  pratique: 'Pratique',
  quiz: 'QCM',
  refactoring: 'Refactoring',
  responsabilite: 'Responsabilité',
  solid: 'SOLID',
  synthese: 'Synthèse',
  test: 'Test',
  'value-object': 'Value object',
}

const pedagogicalTags = new Set([
  'definition',
  'exemple',
  'anti-pattern',
  'erreur',
  'exercice',
  'correction',
  'atelier',
  'lecture',
  'quiz',
  'a-retenir',
  'synthese',
  'pratique',
])

function getFrontmatterTags(markdown: ParsedMarkdown | undefined) {
  if (!markdown) {
    return []
  }

  return uniqueStrings([
    ...toStringArray(markdown.frontmatter.tags),
    ...toStringArray(markdown.frontmatter.summaryTags),
  ])
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

function TagGroup({ title, tags }: { title: string; tags: string[] }) {
  if (tags.length === 0) {
    return null
  }

  return (
    <div className="summary-tag-group">
      <strong>{title}</strong>
      <ContentTags tags={tags} />
    </div>
  )
}

function CodeBlock({ className, children, ...props }: ComponentPropsWithoutRef<'code'>) {
  const code = String(children ?? '').replace(/\n$/, '')
  const language = /language-(\w+)/.exec(className ?? '')?.[1]

  if (language === 'java') {
    return (
      <code
        className="hljs language-java"
        dangerouslySetInnerHTML={{ __html: hljs.highlight(code, { language: 'java' }).value }}
      />
    )
  }

  return (
    <code className={className} {...props}>
      {children}
    </code>
  )
}
