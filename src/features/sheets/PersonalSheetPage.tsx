import { Link, useParams } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { MarkdownRenderer } from '../../components/MarkdownRenderer'
import { Card } from '../../components/ui/Card'
import { getPersonalSheet } from '../../content/api'
import { usePersonalSheetIndex } from './usePersonalSheets'

export function PersonalSheetPage() {
  const { sheetId } = useParams({ from: '/fiches/$sheetId' })
  const { data: index } = usePersonalSheetIndex()
  const sheet = index?.sheets.find((entry) => entry.id === sheetId)

  const content = useQuery({
    queryKey: ['personal-sheet', sheet?.path],
    queryFn: () => getPersonalSheet(sheet!.path),
    enabled: Boolean(sheet),
  })

  if (!sheet) {
    return <p>Fiche introuvable.</p>
  }

  return (
    <div className="page-stack">
      <header className="page-header">
        <p className="eyebrow">Fiche perso</p>
        <h2>{sheet.title}</h2>
        <p>{sheet.description}</p>
        <div className="action-row">
          <Link to="/fiches" className="button secondary">
            Toutes les fiches
          </Link>
        </div>
      </header>

      <Card className="markdown-card">
        {content.isLoading ? <p>Chargement de la fiche...</p> : null}
        {content.error ? <p>Fiche indisponible.</p> : null}
        {content.data ? <MarkdownRenderer copyCode>{content.data.body}</MarkdownRenderer> : null}
      </Card>
    </div>
  )
}
