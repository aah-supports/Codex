import type { ComponentPropsWithoutRef } from 'react'
import { Link, useParams } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import ReactMarkdown from 'react-markdown'
import hljs from 'highlight.js/lib/core'
import java from 'highlight.js/lib/languages/java'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { getMarkdown } from '../../content/api'
import { useLearningStore } from '../../stores/learningStore'
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
  query: ReturnType<typeof useQuery<{ body: string }>>
}) {
  if (query.isLoading) {
    return <p>Chargement...</p>
  }

  if (query.error || !query.data) {
    return <p>Contenu indisponible.</p>
  }

  return <ReactMarkdown components={{ code: CodeBlock }}>{query.data.body}</ReactMarkdown>
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
