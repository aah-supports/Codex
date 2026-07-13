import { Link } from '@tanstack/react-router'
import { ArrowRight, BookOpen, Clock3, ListTree, TrendingUp } from 'lucide-react'
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

  const modules = data.corpora.flatMap((corpus) => corpus.modules.map((module) => ({ corpus, module })))
  const latestProgress = Object.values(progress).sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))[0]
  const resume = modules.find(({ module }) => module.id === latestProgress?.moduleId) ?? modules[0]
  const overallProgress = modules.length
    ? Math.round(modules.reduce((total, { module }) => total + (progress[module.id]?.selfAssessment ?? 0), 0) / modules.length)
    : 0
  const completedLessons = modules.filter(({ module }) => progress[module.id]?.lessonCompleted).length

  return (
    <div className="page-stack home-page">
      <nav className="breadcrumbs" aria-label="Fil d’Ariane"><strong>Accueil</strong><span>/</span><span>Mes parcours</span></nav>
      <header className="page-header">
        <div className="title-with-badge"><h2>Bienvenue dans Codex</h2><Badge>Local-first</Badge></div>
        <p>
          Reprends ton apprentissage là où tu l’as laissé ou explore un nouveau module dans ton manuel intelligent.
        </p>
      </header>

      <div className="home-layout">
        <div className="home-main">
          {resume ? (
            <Card className="resume-card">
              <div className="resume-icon"><BookOpen size={24} /></div>
              <div className="resume-copy">
                <span className="page-summary-label">Continuer mon apprentissage</span>
                <h3>{resume.module.title}</h3>
                <p>{resume.module.description}</p>
                <div className="resume-meta"><span><Clock3 size={16} /> {resume.module.durationMinutes} min</span><span>{progress[resume.module.id]?.selfAssessment ?? 0}% parcouru</span></div>
              </div>
              <Link className="resume-link" to="/learn/$corpusId/$moduleId" params={{ corpusId: resume.corpus.id, moduleId: resume.module.id }}>Reprendre <ArrowRight size={18} /></Link>
            </Card>
          ) : null}

          {data.corpora.map((corpus) => {
            const attemptedModules = corpus.modules.filter((module) => (progress[module.id]?.quizAttempts ?? 0) > 0).length

            return (
              <section key={corpus.id} className="page-stack home-corpus-section">
                <div className="section-heading">
                  <div><p className="eyebrow">Parcours disponible</p><h3>{corpus.title}</h3><p>{corpus.description}</p></div>
                  <Badge>v{corpus.version}</Badge>
                </div>
                <p className="muted">QCM tentés : {attemptedModules}/{corpus.modules.length}</p>
                <div className="module-grid">
                  {corpus.modules.map((module) => {
                    const moduleProgress = progress[module.id]

                    return (
                      <Card key={module.id} className="home-module-card">
                        <div className="card-header"><h4>{module.title}</h4><Badge>{module.durationMinutes} min</Badge></div>
                        <p>{module.description}</p>
                        <div className="progress-block"><div className="progress-label"><span>Progression</span><span>{moduleProgress?.selfAssessment ?? 0}%</span></div><div className="progress-track"><div className="progress-fill" style={{ width: `${moduleProgress?.selfAssessment ?? 0}%` }} /></div></div>
                        <div className="card-actions"><Link to="/learn/$corpusId/$moduleId" params={{ corpusId: corpus.id, moduleId: module.id }}>Ouvrir</Link><Link to="/quiz/$corpusId/$moduleId" params={{ corpusId: corpus.id, moduleId: module.id }}>QCM</Link></div>
                      </Card>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </div>

        <aside className="home-aside" aria-label="Résumé de ma progression">
          <Card className="aside-card progress-aside-card">
            <div className="aside-card-title"><TrendingUp size={19} /><h3>Ma progression</h3></div>
            <div className="progress-overview"><div className="progress-ring" style={{ '--progress': `${overallProgress * 3.6}deg` } as React.CSSProperties}><span>{overallProgress}%</span></div><div><p>Progression globale</p><div className="progress-track"><div className="progress-fill" style={{ width: `${overallProgress}%` }} /></div></div></div>
            <p className="aside-note">{completedLessons} leçon(s) terminée(s) sur {modules.length}</p>
          </Card>
          <Card className="aside-card home-summary-card">
            <div className="aside-card-title"><ListTree size={19} /><h3>Sommaire</h3></div>
            <ol>{data.corpora.map((corpus) => <li key={corpus.id}><span>{corpus.title}</span><small>{corpus.modules.length} modules</small></li>)}</ol>
          </Card>
        </aside>
      </div>
    </div>
  )
}
