import { Card } from '../../components/ui/Card'
import { Progress } from '../../components/ui/Progress'
import { formatPercent } from '../../lib/date'
import { useLearningStore } from '../../stores/learningStore'
import { useCorpusIndex } from '../corpus/useCorpus'

export function StatsPage() {
  const { data } = useCorpusIndex()
  const progress = useLearningStore((state) => state.progress)

  const modules = data?.corpora.flatMap((corpus) => corpus.modules) ?? []
  const completedLessons = modules.filter((module) => progress[module.id]?.lessonCompleted).length
  const completedExercises = modules.filter((module) => progress[module.id]?.exerciseCompleted).length
  const attempts = Object.values(progress).reduce((total, entry) => total + entry.quizAttempts, 0)
  const scoredModules = Object.values(progress).filter((entry) => entry.quizAttempts > 0)
  const averageScore =
    scoredModules.length === 0
      ? 0
      : scoredModules.reduce((total, entry) => total + entry.bestQuizScore, 0) / scoredModules.length
  const lessonPercent = modules.length === 0 ? 0 : (completedLessons / modules.length) * 100
  const exercisePercent = modules.length === 0 ? 0 : (completedExercises / modules.length) * 100

  return (
    <div className="page-stack">
      <header className="page-header">
        <p className="eyebrow">Progression locale</p>
        <h2>Où tu en es exactement</h2>
        <p>Ces données viennent d'IndexedDB. Elles ne partent vers GitHub que par export explicite.</p>
      </header>

      <div className="stats-grid">
        <Card>
          <span className="metric">{completedLessons}/{modules.length}</span>
          <p>Leçons terminées</p>
        </Card>
        <Card>
          <span className="metric">{completedExercises}/{modules.length}</span>
          <p>Exercices terminés</p>
        </Card>
        <Card>
          <span className="metric">{formatPercent(averageScore)}</span>
          <p>Meilleur score moyen</p>
        </Card>
        <Card>
          <span className="metric">{attempts}</span>
          <p>Tentatives QCM</p>
        </Card>
      </div>

      <Card>
        <Progress value={lessonPercent} label="Leçons" />
        <Progress value={exercisePercent} label="Exercices" />
      </Card>

      <Card>
        <h3>Persistance</h3>
        <p>La progression est locale dans IndexedDB. Le corpus reste versionné dans GitHub.</p>
      </Card>
    </div>
  )
}
