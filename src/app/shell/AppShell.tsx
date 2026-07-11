import { Link } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useLearningStore } from '../../stores/learningStore'
import { useCorpusIndex } from '../../features/corpus/useCorpus'
import { usePersonalSheetIndex } from '../../features/sheets/usePersonalSheets'

type AppShellProps = {
  children: React.ReactNode
}

const navItems = [
  { to: '/corpus', label: 'Parcours' },
  { to: '/stats', label: 'Progression' },
  { to: '/glossary', label: 'Glossaire' },
  { to: '/fiches', label: 'Fiches perso' },
  { to: '/settings', label: 'Sauvegarde' },
] as const

export function AppShell({ children }: AppShellProps) {
  const hydrated = useLearningStore((state) => state.hydrated)
  const hydrate = useLearningStore((state) => state.hydrate)
  const { data } = useCorpusIndex()
  const { data: personalSheets } = usePersonalSheetIndex()

  useEffect(() => {
    if (!hydrated) {
      void hydrate()
    }
  }, [hydrate, hydrated])

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <h1>Corpus</h1>
          <span>Plateforme de cours</span>
        </div>
        <div className="version-block">
          <span>Corpus</span>
          <strong>{data?.corpora[0]?.version ?? '0.1.0'}</strong>
        </div>
        <nav className="main-nav doc-nav" aria-label="Navigation principale">
          <NavSection title="Plateforme">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} className="nav-link" activeProps={{ className: 'nav-link active' }}>
                {item.label}
              </Link>
            ))}
          </NavSection>

          <NavSection title="Cours">
            {data?.corpora.map((corpus) => (
              <details key={corpus.id} className="nav-disclosure" open>
                <summary>{corpus.title}</summary>
                <div className="nav-disclosure-body">
                  {corpus.modules.map((module) => (
                    <details key={module.id} className="module-nav-item nav-disclosure" open>
                      <summary>{module.title}</summary>
                      <div className="nav-disclosure-body">
                        <Link
                          to="/learn/$corpusId/$moduleId"
                          params={{ corpusId: corpus.id, moduleId: module.id }}
                          className="sub-nav-link"
                          activeProps={{ className: 'sub-nav-link active' }}
                        >
                          Cours
                        </Link>
                        <Link
                          to="/quiz/$corpusId/$moduleId"
                          params={{ corpusId: corpus.id, moduleId: module.id }}
                          className="sub-nav-link"
                          activeProps={{ className: 'sub-nav-link active' }}
                        >
                          QCM
                        </Link>
                      </div>
                    </details>
                  ))}
                </div>
              </details>
            ))}
          </NavSection>

          {personalSheets?.sheets.length ? (
            <NavSection title="Fiches perso">
              <details className="nav-disclosure" open>
                <summary>Mes fiches</summary>
                <div className="nav-disclosure-body">
                  {personalSheets.sheets.map((sheet) => (
                    <Link
                      key={sheet.id}
                      to="/fiches/$sheetId"
                      params={{ sheetId: sheet.id }}
                      className="sub-nav-link"
                      activeProps={{ className: 'sub-nav-link active' }}
                    >
                      {sheet.title}
                    </Link>
                  ))}
                </div>
              </details>
            </NavSection>
          ) : null}
        </nav>
      </aside>
      <main className="content-area">{children}</main>
    </div>
  )
}

function NavSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="nav-section">
      <h2>{title}</h2>
      <div className="nav-section-links">{children}</div>
    </section>
  )
}
