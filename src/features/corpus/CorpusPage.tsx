import { Link } from '@tanstack/react-router'
import { Badge } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'
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
        <h2>Reprendre ou démarrer un cours</h2>
        <p>
          Chaque cours est un corpus Markdown versionné. La POO est le premier parcours, et d’autres corpus pourront
          être ajoutés sans changer le socle de l’application.
        </p>
      </header>

      <div className="page-summary">
        <Card>
          <span className="page-summary-label">Corpus disponibles</span>
          <span className="page-summary-value">{data.corpora.length}</span>
          <p className="page-summary-note">Le contenu est chargé depuis les corpus Markdown du dépôt.</p>
        </Card>
        <Card>
          <span className="page-summary-label">Modules total</span>
          <span className="page-summary-value">
            {data.corpora.reduce((total, corpus) => total + corpus.modules.length, 0)}
          </span>
          <p className="page-summary-note">Chaque module regroupe leçon, exemples, exercices et lectures.</p>
        </Card>
        <Card>
          <span className="page-summary-label">Suivi local</span>
          <span className="page-summary-value">IndexedDB</span>
          <p className="page-summary-note">Les scores, la progression et l’auto-évaluation restent sur la machine.</p>
        </Card>
      </div>

      {data.corpora.map((corpus) => {
        const attemptedModules = corpus.modules.filter((module) => (progress[module.id]?.quizAttempts ?? 0) > 0).length

        return (
          <section key={corpus.id} className="page-stack">
            <div className="section-heading">
              <div>
                <h3>{corpus.title}</h3>
                <p>{corpus.description}</p>
              </div>
              <Badge>v{corpus.version}</Badge>
            </div>
            <p className="muted">
              QCM tentés : {attemptedModules}/{corpus.modules.length}. L'avancement des cours se règle dans la page
              Progression.
            </p>
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
                    <p className="muted">
                      {moduleProgress?.bestQuizScore ?? 0} % au meilleur QCM · {moduleProgress?.quizAttempts ?? 0}{' '}
                      tentative(s) · progression manuelle à ajuster dans Stats
                    </p>
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
