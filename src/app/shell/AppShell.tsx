import { Link } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useLearningStore } from '../../stores/learningStore'
import { useCorpusIndex } from '../../features/corpus/useCorpus'
import { usePersonalSheetIndex } from '../../features/sheets/usePersonalSheets'

type AppShellProps = {
  children: React.ReactNode
}

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
      <div className="workspace">
        <header className="topbar">
          <nav className="topbar-nav" aria-label="Navigation rapide">
            <Link to="/generation" className="topbar-link" activeProps={{ className: 'topbar-link active' }}>
              <span className="topbar-shortcut">[G]</span> GÉN
            </Link>
            <Link to="/stats" className="topbar-link" activeProps={{ className: 'topbar-link active' }}>
              <span className="topbar-shortcut">[S]</span> STATS
            </Link>
            <Link to="/glossary" className="topbar-link" activeProps={{ className: 'topbar-link active' }}>
              <span className="topbar-shortcut">[R]</span> SEARCH
            </Link>
            <Link to="/fiches" className="topbar-link" activeProps={{ className: 'topbar-link active' }}>
              <span className="topbar-shortcut">[F]</span> FICHES PERSO
            </Link>
            <Link to="/settings" className="topbar-link" activeProps={{ className: 'topbar-link active' }}>
              <span className="topbar-shortcut">[P]</span> PARAM
            </Link>
            <Link to="/chat" className="topbar-link topbar-gemma" activeProps={{ className: 'topbar-link topbar-gemma active' }}>
              <span className="gemma-mark" aria-hidden="true">
                G4
              </span>
              <span className="topbar-shortcut">[C]</span> CHAT
            </Link>
          </nav>
          <div className="topbar-meta">
            <span>Local only</span>
            <strong>Ollama gemma4:e4b-mlx</strong>
          </div>
        </header>
        <main className="content-area">{children}</main>
      </div>
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
