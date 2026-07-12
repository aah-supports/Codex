import { Link, useParams } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { QuizQuestions } from '../../components/QuizQuestions'
import { Card } from '../../components/ui/Card'
import { getQuiz } from '../../content/api'
import { useLearningStore } from '../../stores/learningStore'
import { useCorpusIndex } from '../corpus/useCorpus'

export function QuizPage() {
  const { corpusId, moduleId } = useParams({ from: '/quiz/$corpusId/$moduleId' })
  const { data: index } = useCorpusIndex()
  const recordQuizScore = useLearningStore((state) => state.recordQuizScore)

  const corpus = index?.corpora.find((entry) => entry.id === corpusId)
  const module = corpus?.modules.find((entry) => entry.id === moduleId)

  const quiz = useQuery({
    queryKey: ['quiz', module?.paths.quiz],
    queryFn: () => getQuiz(module!.paths.quiz),
    enabled: Boolean(module),
  })

  if (!module) {
    return <p>Module introuvable.</p>
  }

  if (quiz.isLoading) {
    return <p>Chargement du QCM...</p>
  }

  if (quiz.error || !quiz.data) {
    return <p>QCM indisponible.</p>
  }

  return (
    <div className="page-stack">
      <header className="page-header">
        <p className="eyebrow">QCM</p>
        <h2>QCM · {module.title}</h2>
        <p>Chaque correction explique le raisonnement, pas seulement la bonne réponse.</p>
      </header>

      <div className="page-summary">
        <Card>
          <span className="page-summary-label">Corpus</span>
          <span className="page-summary-value">{corpus?.title}</span>
          <p className="page-summary-note">Le QCM reprend le même corpus que la leçon ouverte.</p>
        </Card>
        <Card>
          <span className="page-summary-label">Module</span>
          <span className="page-summary-value">{module.title}</span>
          <p className="page-summary-note">Une seule série de questions pour vérifier les points essentiels.</p>
        </Card>
      </div>

      <QuizQuestions
        questions={quiz.data}
        submitLabel="Valider"
        onSubmitScore={async (score) => {
          await recordQuizScore(moduleId, score)
        }}
        secondaryAction={
          <Link to="/learn/$corpusId/$moduleId" params={{ corpusId, moduleId }} className="button secondary">
            Retour au module
          </Link>
        }
      />
    </div>
  )
}
