import { Link } from '@tanstack/react-router'
import { Badge } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'
import { usePersonalSheetIndex } from './usePersonalSheets'

export function PersonalSheetsPage() {
  const { data, isLoading, error } = usePersonalSheetIndex()

  if (isLoading) {
    return <p>Chargement des fiches...</p>
  }

  if (error || !data) {
    return <p>Impossible de charger les fiches personnelles.</p>
  }

  return (
    <div className="page-stack">
      <header className="page-header">
        <p className="eyebrow">Fiches perso</p>
        <h2>Notes écrites à la main</h2>
        <p>
          Ces fiches viennent du dossier Markdown `public/fiches`. Elles servent à ajouter tes propres synthèses au
          corpus sans modifier les cours.
        </p>
      </header>

      <div className="module-grid">
        {data.sheets.map((sheet) => (
          <Card key={sheet.id}>
            <div className="card-header">
              <h4>{sheet.title}</h4>
            </div>
            <p>{sheet.description}</p>
            <div className="tag-row">
              {sheet.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
            <div className="card-actions">
              <Link to="/fiches/$sheetId" params={{ sheetId: sheet.id }}>
                Ouvrir
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
