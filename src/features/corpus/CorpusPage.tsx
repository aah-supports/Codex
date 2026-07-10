import { Link } from '@tanstack/react-router'
import { Badge } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'
import { Progress } from '../../components/ui/Progress'
import { useLearningStore } from '../../stores/learningStore'
import { useCorpusIndex } from './useCorpus'

export function CorpusPage() {
  const { data, isLoading, error } = useCorpusIndex()
  const progress = useLearningStore((state) => state.progress)

  if (isLoading) {
    return <p>Chargement du corpus...</p>
  }

  if (error || !data) {
    return <p>Impossible de charger le corpus.</p>
  }

  return (
    <div className="page-stack">
      <header className="page-header">
        <p className="eyebrow">Apprentissage progressif</p>
        <h2>Reprendre ou démarrer un module</h2>
        <p>
          Les contenus viennent des fichiers Markdown versionnés. Ta progression reste locale et exportable.
        </p>
      </header>

      {data.corpora.map((corpus) => {
        const completed = corpus.modules.filter((module) => progress[module.id]?.lessonCompleted).length
        const percent = (completed / corpus.modules.length) * 100

        return (
          <section key={corpus.id} className="page-stack">
            <div className="section-heading">
              <div>
                <h3>{corpus.title}</h3>
                <p>{corpus.description}</p>
              </div>
              <Badge>v{corpus.version}</Badge>
            </div>
            <Progress value={percent} label="Leçons terminées" />
            <div className="module-grid">
              {corpus.modules.map((module) => {
                const moduleProgress = progress[module.id]

                return (
                  <Card key={module.id}>
                    <div className="card-header">
                      <h4>{module.title}</h4>
                      <Badge>{module.durationMinutes} min</Badge>
                    </div>
                    <p>{module.description}</p>
                    <div className="tag-row">
                      {module.tags.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>
                    <div className="card-actions">
                      <Link to="/learn/$corpusId/$moduleId" params={{ corpusId: corpus.id, moduleId: module.id }}>
                        Ouvrir
                      </Link>
                      <Link to="/quiz/$corpusId/$moduleId" params={{ corpusId: corpus.id, moduleId: module.id }}>
                        QCM
                      </Link>
                    </div>
                    <p className="muted">
                      Score QCM: {moduleProgress?.bestQuizScore ?? 0} % · Tentatives:{' '}
                      {moduleProgress?.quizAttempts ?? 0}
                    </p>
                  </Card>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}
