import { Link, useParams } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import ReactMarkdown from 'react-markdown'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { getMarkdown } from '../../content/api'
import { useLearningStore } from '../../stores/learningStore'
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
            Marquer la lecon lue
          </Button>
          <Button onClick={() => void markExerciseCompleted(moduleId)} variant="secondary">
            Exercices faits
          </Button>
          <Link to="/quiz/$corpusId/$moduleId" params={{ corpusId, moduleId }} className="button primary">
            Passer le QCM
          </Link>
        </div>
        <p className="muted">
          Lecon: {progress?.lessonCompleted ? 'terminee' : 'en cours'} · Exercices:{' '}
          {progress?.exerciseCompleted ? 'termines' : 'a faire'}
        </p>
      </header>

      <div className="lesson-layout">
        <Card className="markdown-card">
          <h3>Lecon</h3>
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

  return <ReactMarkdown>{query.data.body}</ReactMarkdown>
}
