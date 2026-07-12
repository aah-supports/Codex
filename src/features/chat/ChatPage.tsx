import { FormEvent, useEffect, useRef, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { MarkdownRenderer } from '../../components/MarkdownRenderer'
import { getCorpusIndex } from '../../content/api'
import { chatWithOllama, getDefaultOllamaConfig, readOllamaConfig } from '../../lib/ollama'
import { formatSourceLabel, loadKnowledgeSources, rankKnowledgeSources, type KnowledgeSource } from '../../lib/corpusKnowledge'

type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
  references: KnowledgeSource[]
}

export function ChatPage() {
  const corpusIndex = useQuery({
    queryKey: ['corpus-index'],
    queryFn: getCorpusIndex,
  })
  const [selectedCorpusId, setSelectedCorpusId] = useState('')
  const knowledge = useQuery({
    queryKey: ['knowledge-sources', selectedCorpusId],
    queryFn: () => loadKnowledgeSources(selectedCorpusId || undefined),
    enabled: Boolean(selectedCorpusId),
  })
  const [config, setConfig] = useState(getDefaultOllamaConfig)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [question, setQuestion] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setConfig(readOllamaConfig())
  }, [])

  useEffect(() => {
    const selectedCorpus = corpusIndex.data?.corpora.find((entry) => entry.id === selectedCorpusId)

    if (!selectedCorpus) {
      return
    }

    setMessages([
      {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: buildIntroMessage(selectedCorpus),
        references: [],
      },
    ])
    setQuestion('')
    setError('')
  }, [selectedCorpusId, corpusIndex.data])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages])

  const selectedCorpus = corpusIndex.data?.corpora.find((entry) => entry.id === selectedCorpusId)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedQuestion = question.trim()

    if (!trimmedQuestion || sending || !knowledge.data?.length) {
      return
    }

    const nextUserMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: trimmedQuestion,
      references: [],
    }

    const nextMessages = [...messages, nextUserMessage]
    const references = rankKnowledgeSources(trimmedQuestion, knowledge.data, 4)

    setMessages(nextMessages)
    setQuestion('')
    setSending(true)
    setError('')

    try {
      const answer = await chatWithOllama(config, {
        corpusTitle: selectedCorpus?.title ?? 'Corpus',
        corpusDescription: selectedCorpus?.description,
        question: trimmedQuestion,
        history: nextMessages.slice(-6).map(({ role, content }) => ({ role, content })),
        sources: references,
      })

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: answer,
          references,
        },
      ])
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Réponse impossible.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="page-stack chat-page">
      <header className="page-header">
        <p className="eyebrow">Assistant local</p>
        <h2>Chat de corpus</h2>
        <p>
          Choisis un cours, pose tes questions et reçois des réponses qui renvoient vers les chapitres concernés.
        </p>
      </header>

      <div className="chat-layout">
        <Card className="chat-panel">
          <div className="chat-toolbar">
            <div className="chat-toolbar-copy">
              <h3>Discussion</h3>
              <p>Modèle: {config.model}</p>
            </div>
            <Badge>{selectedCorpus?.title ?? 'Choisir un corpus'}</Badge>
          </div>

          <div className="chat-corpus-picker">
            <label>
              Corpus
              <select value={selectedCorpusId} onChange={(event) => setSelectedCorpusId(event.target.value)}>
                <option value="">Choisir un corpus</option>
                {corpusIndex.data?.corpora.map((entry) => (
                  <option key={entry.id} value={entry.id}>
                    {entry.title}
                  </option>
                ))}
              </select>
            </label>
            <p>{selectedCorpus?.description ?? 'Choisis un corpus pour activer le chat.'}</p>
          </div>

          <div className="chat-thread">
            {messages.length ? (
              <>
                {messages.map((message) => (
                  <article key={message.id} className={`chat-message ${message.role}`}>
                    <div className="chat-message-header">
                      <strong>{message.role === 'user' ? 'Vous' : 'Assistant'}</strong>
                    </div>
                    <div className="chat-message-body">
                      {message.role === 'user' ? (
                        <p>{message.content}</p>
                      ) : (
                        <div className="chat-response" aria-label="Réponse de l'assistant">
                          <MarkdownRenderer copyCode copyText>{message.content}</MarkdownRenderer>
                        </div>
                      )}
                    </div>
                    {message.references.length ? (
                      <div className="chat-references">
                        <p>Références du cours</p>
                        <ul>
                          {message.references.map((source) => (
                            <li key={`${message.id}-${source.path}`}>
                              <Link
                                to="/learn/$corpusId/$moduleId"
                                params={{ corpusId: source.corpusId, moduleId: source.moduleId }}
                                className="chat-reference-link"
                              >
                                {source.corpusTitle} · {formatSourceLabel(source)}
                              </Link>
                              <span>{source.excerpt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </article>
                ))}
                {sending ? (
                  <article className="chat-message assistant chat-message-thinking" aria-live="polite">
                    <div className="chat-message-header">
                      <strong>Assistant</strong>
                      <span className="chat-spinner" aria-hidden="true" />
                    </div>
                    <div className="chat-message-body">
                      <p>Recherche dans le corpus sélectionné</p>
                    </div>
                  </article>
                ) : null}
              </>
            ) : (
              <div className="chat-empty">
                <p>Choisis un corpus pour commencer.</p>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <form className="chat-form" onSubmit={(event) => void handleSubmit(event)}>
            <textarea
              rows={4}
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              disabled={!selectedCorpusId}
              placeholder="Demande une explication, une comparaison ou une aide sur un chapitre..."
            />
            <div className="chat-form-actions">
              <Button type="submit" disabled={sending || !question.trim() || !knowledge.data?.length || !selectedCorpusId}>
                {sending ? 'Réponse...' : 'Envoyer'}
              </Button>
            </div>
            {error ? <p className="generation-error">{error}</p> : null}
          </form>
        </Card>
      </div>
    </div>
  )
}

function buildIntroMessage(corpus: { title: string; description: string }) {
  return [
    `Corpus sélectionné: ${corpus.title}.`,
    corpus.description,
    'Pose une question sur un chapitre, un concept ou une comparaison entre notions.',
  ]
    .filter(Boolean)
    .join(' ')
}
