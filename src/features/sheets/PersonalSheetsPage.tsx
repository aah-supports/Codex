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

      <div className="page-summary">
        <Card>
          <span className="page-summary-label">Source</span>
          <span className="page-summary-value">Markdown</span>
          <p className="page-summary-note">Chaque fiche est stockée dans le dossier local prévu pour le site.</p>
        </Card>
        <Card>
          <span className="page-summary-label">Usage</span>
          <span className="page-summary-value">Consultation</span>
          <p className="page-summary-note">Les fiches complètent le corpus sans modifier les cours existants.</p>
        </Card>
        <Card>
          <span className="page-summary-label">Fiches</span>
          <span className="page-summary-value">{data.sheets.length}</span>
          <p className="page-summary-note">Fiches personnelles indexées dans l’application.</p>
        </Card>
      </div>

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
