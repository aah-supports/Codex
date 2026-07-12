import { Card } from '../../components/ui/Card'
import { formatPercent } from '../../lib/date'
import { useLearningStore } from '../../stores/learningStore'
import { useCorpusIndex } from '../corpus/useCorpus'

export function StatsPage() {
  const { data } = useCorpusIndex()
  const progress = useLearningStore((state) => state.progress)
  const setSelfAssessment = useLearningStore((state) => state.setSelfAssessment)

  const modules = data?.corpora.flatMap((corpus) => corpus.modules) ?? []
  const attempts = Object.values(progress).reduce((total, entry) => total + entry.quizAttempts, 0)
  const scoredModules = Object.values(progress).filter((entry) => entry.quizAttempts > 0)
  const attemptedModuleIds = new Set(scoredModules.map((entry) => entry.moduleId))
  const strongQuizModules = scoredModules.filter((entry) => entry.bestQuizScore >= 70).length
  const averageScore =
    scoredModules.length === 0
      ? 0
      : scoredModules.reduce((total, entry) => total + entry.bestQuizScore, 0) / scoredModules.length

  return (
    <div className="page-stack">
      <header className="page-header">
        <p className="eyebrow">Progression locale</p>
        <h2>QCM et auto-évaluation</h2>
        <p>
          Les QCM donnent une mesure automatique. Pour les cours, c'est toi qui estimes ton niveau avec les barres
          de progression.
        </p>
      </header>

      <div className="page-summary">
        <Card>
          <span className="page-summary-label">Modules évalués</span>
          <span className="page-summary-value">
            {attemptedModuleIds.size}/{modules.length}
          </span>
          <p className="page-summary-note">Modules avec au moins une tentative de QCM.</p>
        </Card>
        <Card>
          <span className="page-summary-label">Score moyen</span>
          <span className="page-summary-value">{formatPercent(averageScore)}</span>
          <p className="page-summary-note">Meilleur score observé par module déjà tenté.</p>
        </Card>
        <Card>
          <span className="page-summary-label">Modules solides</span>
          <span className="page-summary-value">{strongQuizModules}</span>
          <p className="page-summary-note">Modules à 70 % ou plus sur leur meilleur essai.</p>
        </Card>
        <Card>
          <span className="page-summary-label">Tentatives</span>
          <span className="page-summary-value">{attempts}</span>
          <p className="page-summary-note">Total des essais QCM enregistrés localement.</p>
        </Card>
      </div>

      <Card>
        <h3>Persistance</h3>
        <p>Les scores QCM et ton auto-évaluation sont conservés localement dans IndexedDB.</p>
      </Card>

      <Card>
        <h3>Auto-évaluation par module</h3>
        <p>Déplace chaque barre selon ton ressenti après lecture du cours, des exemples et des exercices.</p>
        <div className="module-status-list">
          {modules.map((module) => {
            const entry = progress[module.id]
            const selfAssessment = entry?.selfAssessment ?? 0

            return (
              <div key={module.id} className="self-assessment-row">
                <div>
                  <strong>{module.title}</strong>
                  <span>QCM {entry?.bestQuizScore ?? 0} % · {entry?.quizAttempts ?? 0} tentative(s)</span>
                </div>
                <label>
                  <span>{selfAssessment} %</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={selfAssessment}
                    onChange={(event) => void setSelfAssessment(module.id, Number(event.currentTarget.value))}
                    aria-label={`Auto-évaluation pour ${module.title}`}
                  />
                </label>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
