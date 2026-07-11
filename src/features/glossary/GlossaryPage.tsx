import { useQuery } from '@tanstack/react-query'
import ReactMarkdown from 'react-markdown'
import { Card } from '../../components/ui/Card'
import { getMarkdown } from '../../content/api'

export function GlossaryPage() {
  const glossary = useQuery({
    queryKey: ['markdown', 'shared/glossary.md'],
    queryFn: () => getMarkdown('shared/glossary.md'),
  })

  return (
    <div className="page-stack">
      <header className="page-header">
        <p className="eyebrow">Repères</p>
        <h2>Glossaire progressif</h2>
        <p>
          Les définitions sont courtes, reliées aux exemples du parcours et utiles pour relire les exercices.
        </p>
      </header>

      <Card className="markdown-card glossary-card">
        {glossary.isLoading ? <p>Chargement du glossaire...</p> : null}
        {glossary.error ? <p>Glossaire indisponible.</p> : null}
        {glossary.data ? <ReactMarkdown>{glossary.data.body}</ReactMarkdown> : null}
      </Card>
    </div>
  )
}
