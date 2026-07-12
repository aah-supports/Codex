import { useMemo, useState, type ReactNode } from 'react'
import { Button } from './ui/Button'
import { Card } from './ui/Card'
import type { QuizQuestion } from '../types/content'

type QuizQuestionsProps = {
  questions: QuizQuestion[]
  onSubmitScore?: (score: number) => Promise<void> | void
  submitLabel?: string
  secondaryAction?: ReactNode
}

export function QuizQuestions({
  questions,
  onSubmitScore,
  submitLabel = 'Valider',
  secondaryAction,
}: QuizQuestionsProps) {
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)

  const score = useMemo(() => {
    if (!questions.length) {
      return 0
    }

    const correct = questions.filter((question) => answers[question.id] === question.answerIndex).length
    return Math.round((correct / questions.length) * 100)
  }, [answers, questions])

  async function submit() {
    setSubmitted(true)

    if (onSubmitScore) {
      await onSubmitScore(score)
    }
  }

  return (
    <>
      <div className="page-stack">
        <div className="section-heading">
          <div>
            <h3>Questions</h3>
            <p>{questions.length} questions pour vérifier les points essentiels du module.</p>
          </div>
        </div>
        {questions.map((question, questionIndex) => (
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
        <Button onClick={() => void submit()} disabled={questions.length === 0 || Object.keys(answers).length < questions.length}>
          {submitLabel} · {score} %
        </Button>
        {secondaryAction}
      </div>
    </>
  )
}
