import { Link } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useLearningStore } from '../../stores/learningStore'
import { useCorpusIndex } from '../../features/corpus/useCorpus'

type AppShellProps = {
  children: React.ReactNode
}

const navItems = [
  { to: '/corpus', label: 'Parcours' },
  { to: '/stats', label: 'Progression' },
  { to: '/glossary', label: 'Glossaire' },
  { to: '/settings', label: 'Sauvegarde' },
] as const

export function AppShell({ children }: AppShellProps) {
  const hydrated = useLearningStore((state) => state.hydrated)
  const hydrate = useLearningStore((state) => state.hydrate)
  const { data } = useCorpusIndex()

  useEffect(() => {
    if (!hydrated) {
      void hydrate()
    }
  }, [hydrate, hydrated])

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <h1>POO</h1>
          <span>Learning API</span>
        </div>
        <div className="version-block">
          <span>Version</span>
          <strong>{data?.corpora[0]?.version ?? '0.1.0'}</strong>
        </div>
        <nav className="main-nav doc-nav" aria-label="Navigation principale">
          <NavSection title="App">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} className="nav-link" activeProps={{ className: 'nav-link active' }}>
                {item.label}
              </Link>
            ))}
          </NavSection>

          {data?.corpora.map((corpus) => (
            <NavSection key={corpus.id} title={corpus.title}>
              {corpus.modules.map((module) => (
                <div key={module.id} className="module-nav-item">
                  <Link
                    to="/learn/$corpusId/$moduleId"
                    params={{ corpusId: corpus.id, moduleId: module.id }}
                    className="nav-link"
                    activeProps={{ className: 'nav-link active' }}
                  >
                    {module.title}
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
              ))}
            </NavSection>
          ))}
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
