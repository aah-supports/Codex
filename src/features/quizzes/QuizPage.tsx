import { useMemo, useState } from 'react'
import { Link, useParams } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { getQuiz } from '../../content/api'
import { useLearningStore } from '../../stores/learningStore'
import { useCorpusIndex } from '../corpus/useCorpus'

export function QuizPage() {
  const { corpusId, moduleId } = useParams({ from: '/quiz/$corpusId/$moduleId' })
  const { data: index } = useCorpusIndex()
  const recordQuizScore = useLearningStore((state) => state.recordQuizScore)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)

  const corpus = index?.corpora.find((entry) => entry.id === corpusId)
  const module = corpus?.modules.find((entry) => entry.id === moduleId)

  const quiz = useQuery({
    queryKey: ['quiz', module?.paths.quiz],
    queryFn: () => getQuiz(module!.paths.quiz),
    enabled: Boolean(module),
  })

  const score = useMemo(() => {
    if (!quiz.data?.length) {
      return 0
    }

    const correct = quiz.data.filter((question) => answers[question.id] === question.answerIndex).length
    return Math.round((correct / quiz.data.length) * 100)
  }, [answers, quiz.data])

  if (!module) {
    return <p>Module introuvable.</p>
  }

  if (quiz.isLoading) {
    return <p>Chargement du QCM...</p>
  }

  if (quiz.error || !quiz.data) {
    return <p>QCM indisponible.</p>
  }

  async function submit() {
    setSubmitted(true)
    await recordQuizScore(moduleId, score)
  }

  return (
    <div className="page-stack">
      <header className="page-header">
        <p className="eyebrow">QCM</p>
        <h2>{module.title}</h2>
        <p>Chaque correction explique le raisonnement, pas seulement la bonne reponse.</p>
      </header>

      <div className="page-stack">
        {quiz.data.map((question, questionIndex) => (
          <Card key={question.id}>
            <h3>
              {questionIndex + 1}. {question.question}
            </h3>
            <div className="choice-list">
              {question.choices.map((choice, choiceIndex) => {
                const selected = answers[question.id] === choiceIndex
                const correct = submitted && question.answerIndex === choiceIndex

                return (
                  <label key={choice} className={`choice ${selected ? 'selected' : ''} ${correct ? 'correct' : ''}`}>
                    <input
                      type="radio"
                      name={question.id}
                      checked={selected}
                      onChange={() => setAnswers((current) => ({ ...current, [question.id]: choiceIndex }))}
                    />
                    <span>{choice}</span>
                  </label>
                )
              })}
            </div>
            {submitted ? <p className="feedback">{question.explanation}</p> : null}
          </Card>
        ))}
      </div>

      <div className="sticky-actions">
        <Button onClick={() => void submit()} disabled={Object.keys(answers).length < quiz.data.length}>
          Valider · {score} %
        </Button>
        <Link to="/learn/$corpusId/$moduleId" params={{ corpusId, moduleId }} className="button secondary">
          Retour au module
        </Link>
      </div>
    </div>
  )
}
