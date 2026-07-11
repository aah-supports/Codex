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

      <div className="stats-grid">
        <Card>
          <span className="metric">{attemptedModuleIds.size}/{modules.length}</span>
          <p>Modules évalués en QCM</p>
        </Card>
        <Card>
          <span className="metric">{formatPercent(averageScore)}</span>
          <p>Meilleur score moyen QCM</p>
        </Card>
        <Card>
          <span className="metric">{strongQuizModules}</span>
          <p>QCM à 70 % ou plus</p>
        </Card>
        <Card>
          <span className="metric">{attempts}</span>
          <p>Tentatives QCM</p>
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
