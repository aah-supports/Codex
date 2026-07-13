import { Link, useRouterState } from '@tanstack/react-router'
import {
  Bell,
  BookOpen,
  Bot,
  ChartNoAxesColumnIncreasing,
  CloudOff,
  FileText,
  Menu,
  Moon,
  Search,
  Settings,
  Sparkles,
  Sun,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLearningStore } from '../../stores/learningStore'
import { useCorpusIndex } from '../../features/corpus/useCorpus'
import { usePersonalSheetIndex } from '../../features/sheets/usePersonalSheets'

type AppShellProps = {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('corpus:theme')
    return savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const currentPath = useRouterState({ select: (state) => state.location.pathname })
  const hydrated = useLearningStore((state) => state.hydrated)
  const hydrate = useLearningStore((state) => state.hydrate)
  const { data } = useCorpusIndex()
  const { data: personalSheets } = usePersonalSheetIndex()

  useEffect(() => {
    if (!hydrated) {
      void hydrate()
    }
  }, [hydrate, hydrated])

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'
    localStorage.setItem('corpus:theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  return (
    <div className="app-shell">
      {sidebarOpen ? <button className="sidebar-overlay" type="button" aria-label="Fermer la navigation" onClick={() => setSidebarOpen(false)} /> : null}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="brand-block">
          <div className="brand-mark" aria-hidden="true"><BookOpen size={21} /></div>
          <div>
            <h1>Codex</h1>
            <span>Manuel intelligent</span>
          </div>
          <button className="sidebar-close" type="button" aria-label="Fermer le menu" onClick={() => setSidebarOpen(false)}><X size={20} /></button>
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
                    <details key={module.id} className="module-nav-item nav-disclosure" open={currentPath.includes(module.id)}>
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
          <NavSection title="Outils">
            <Link to="/generation" className="nav-tool-link" activeProps={{ className: 'nav-tool-link active' }}><Sparkles size={18} /> Générer</Link>
            <Link to="/stats" className="nav-tool-link" activeProps={{ className: 'nav-tool-link active' }}><ChartNoAxesColumnIncreasing size={18} /> Progression</Link>
            <Link to="/glossary" className="nav-tool-link" activeProps={{ className: 'nav-tool-link active' }}><Search size={18} /> Recherche</Link>
            <Link to="/fiches" className="nav-tool-link" activeProps={{ className: 'nav-tool-link active' }}><FileText size={18} /> Fiches personnelles</Link>
            <Link to="/settings" className="nav-tool-link" activeProps={{ className: 'nav-tool-link active' }}><Settings size={18} /> Paramètres</Link>
            <Link to="/chat" className="nav-tool-link" activeProps={{ className: 'nav-tool-link active' }}><Bot size={18} /> Assistant local</Link>
          </NavSection>
        </nav>
      </aside>
      <div className="workspace">
        <header className="topbar">
          <button className="mobile-menu-button" type="button" aria-label="Ouvrir le menu" onClick={() => setSidebarOpen(true)}><Menu size={21} /></button>
          <label className="global-search">
            <Search size={18} aria-hidden="true" />
            <span className="sr-only">Rechercher dans Codex</span>
            <input type="search" placeholder="Rechercher dans Codex…" />
            <kbd>⌘ K</kbd>
          </label>
          <div className="topbar-actions">
            <button
              type="button"
              aria-label={darkMode ? 'Activer le thème clair' : 'Activer le thème sombre'}
              title={darkMode ? 'Thème clair' : 'Thème sombre'}
              onClick={() => setDarkMode((current) => !current)}
            >
              {darkMode ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <span className="offline-badge"><CloudOff size={16} /> Hors ligne</span>
            <button type="button" aria-label="Notifications"><Bell size={19} /></button>
            <span className="profile-avatar" aria-label="Profil utilisateur">AL</span>
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
