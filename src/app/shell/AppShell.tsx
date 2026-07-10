import { Link } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useLearningStore } from '../../stores/learningStore'

type AppShellProps = {
  children: React.ReactNode
}

const navItems = [
  { to: '/corpus', label: 'Corpus' },
  { to: '/stats', label: 'Stats' },
  { to: '/notes', label: 'Fiches' },
  { to: '/settings', label: 'Backup' },
] as const

export function AppShell({ children }: AppShellProps) {
  const hydrated = useLearningStore((state) => state.hydrated)
  const hydrate = useLearningStore((state) => state.hydrate)

  useEffect(() => {
    if (!hydrated) {
      void hydrate()
    }
  }, [hydrate, hydrated])

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">Local-first</p>
          <h1>POO Learning</h1>
        </div>
        <nav className="main-nav" aria-label="Navigation principale">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} className="nav-link" activeProps={{ className: 'nav-link active' }}>
              {item.label}
            </Link>
          ))}
        </nav>
        <p className="sidebar-note">
          Corpus sur GitHub. Progression en IndexedDB. Export JSON pour sauvegarder.
        </p>
      </aside>
      <main className="content-area">{children}</main>
    </div>
  )
}
