import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { MarkdownRenderer } from '../../components/MarkdownRenderer'
import { Card } from '../../components/ui/Card'
import { getMarkdown } from '../../content/api'

type GlossaryItem = {
  term: string
  text: string
  searchText: string
}

type RankedGlossaryItem = GlossaryItem & {
  rank: number
}

type GlossarySection = {
  title: string
  items: GlossaryItem[]
}

type RankedGlossarySection = {
  title: string
  items: RankedGlossaryItem[]
}

export function GlossaryPage() {
  const [query, setQuery] = useState('')
  const glossary = useQuery({
    queryKey: ['markdown', 'shared/glossary.md'],
    queryFn: () => getMarkdown('shared/glossary.md'),
  })
  const sections = useMemo(() => parseGlossary(glossary.data?.body ?? ''), [glossary.data?.body])
  const normalizedQuery = normalizeSearch(query)
  const filteredSections: RankedGlossarySection[] = useMemo(() => {
    if (!normalizedQuery) {
      return sections.map((section) => ({
        ...section,
        items: section.items.map((item) => ({ ...item, rank: 0 })),
      }))
    }

    return sections
      .map((section) => ({
        ...section,
        items: section.items
          .map((item) => ({ ...item, rank: rankGlossaryItem(item, normalizedQuery) }))
          .filter((item) => item.rank > 0)
          .sort((left, right) => right.rank - left.rank || left.term.localeCompare(right.term, 'fr')),
      }))
      .filter((section) => section.items.length > 0)
  }, [normalizedQuery, sections])
  const totalItems = sections.reduce((sum, section) => sum + section.items.length, 0)
  const visibleItems = filteredSections.reduce((sum, section) => sum + section.items.length, 0)

  return (
    <div className="page-stack">
      <header className="page-header">
        <p className="eyebrow">Repères</p>
        <h2>Glossaire progressif</h2>
        <p>
          Les définitions sont reliées aux chapitres du parcours pour revenir rapidement à l’explication complète.
        </p>
      </header>

      <Card className="glossary-search-card">
        <label htmlFor="glossary-search">Rechercher une notion</label>
        <input
          id="glossary-search"
          type="search"
          value={query}
          placeholder="Ex. invariant, composition, SOLID, repository..."
          onChange={(event) => setQuery(event.target.value)}
        />
        <p>
          {query.trim()
            ? `${visibleItems} résultat${visibleItems > 1 ? 's' : ''} sur ${totalItems} définitions`
            : `${totalItems} définitions disponibles`}
        </p>
      </Card>

      <Card className="glossary-card">
        {glossary.isLoading ? <p>Chargement du glossaire...</p> : null}
        {glossary.error ? <p>Glossaire indisponible.</p> : null}
        {glossary.data && filteredSections.length === 0 ? (
          <p className="glossary-empty">Aucune définition ne correspond à cette recherche.</p>
        ) : null}
        {glossary.data && normalizedQuery && filteredSections.length > 0 ? (
          <div className="glossary-result-heading">
            <p className="eyebrow">Définitions liées</p>
            <h3>{query.trim()}</h3>
          </div>
        ) : null}
        {filteredSections.map((section) => (
          <section className="glossary-section" key={section.title}>
            <h3>{section.title}</h3>
            <div className="glossary-list">
              {section.items.map((item) => (
                <article className="glossary-item" key={`${section.title}-${item.term}`}>
                  <h4>{item.term}</h4>
                  <div className="markdown-card">
                    <MarkdownRenderer>{item.text}</MarkdownRenderer>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </Card>
    </div>
  )
}

function parseGlossary(markdown: string): GlossarySection[] {
  const sections: GlossarySection[] = []
  let currentSection: GlossarySection | undefined
  let currentItem: GlossaryItem | undefined

  for (const line of markdown.split('\n')) {
    if (line.startsWith('# ')) {
      continue
    }

    if (line.startsWith('## ')) {
      currentSection = { title: line.replace(/^##\s+/, '').trim(), items: [] }
      sections.push(currentSection)
      currentItem = undefined
      continue
    }

    if (line.startsWith('- ') && currentSection) {
      const text = line.replace(/^-\s+/, '').trim()
      currentItem = createGlossaryItem(text)
      currentSection.items.push(currentItem)
      continue
    }

    if (line.trim() && currentItem) {
      currentItem.text = `${currentItem.text}\n${line.trim()}`
      currentItem.searchText = normalizeSearch(`${currentItem.term} ${currentItem.text}`)
    }
  }

  return sections.filter((section) => section.items.length > 0)
}

function createGlossaryItem(text: string): GlossaryItem {
  const separatorIndex = text.indexOf(' : ')
  const fallbackSeparatorIndex = text.indexOf(':')
  const index = separatorIndex >= 0 ? separatorIndex : fallbackSeparatorIndex
  const separatorLength = separatorIndex >= 0 ? 3 : 1
  const term = index >= 0 ? text.slice(0, index).replace(/\*\*/g, '').trim() : text
  const definition = index >= 0 ? text.slice(index + separatorLength).trim() : text

  return {
    term,
    text: definition,
    searchText: normalizeSearch(`${term} ${definition}`),
  }
}

function normalizeSearch(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

function rankGlossaryItem(item: GlossaryItem, query: string) {
  const queryTerms = expandQuery(query)
  let rank = 0

  for (const term of queryTerms) {
    const normalizedTerm = normalizeSearch(item.term)

    if (normalizedTerm === term) {
      rank += 120
    }

    if (normalizedTerm.startsWith(term)) {
      rank += 80
    }

    if (normalizedTerm.includes(term)) {
      rank += 55
    }

    if (item.searchText.includes(term)) {
      rank += 30
    }
  }

  return rank
}

function expandQuery(query: string) {
  const tokens = query.split(/\s+/).filter(Boolean)
  const expanded = new Set(tokens)

  for (const token of tokens) {
    RELATED_TERMS[token]?.forEach((relatedTerm) => expanded.add(relatedTerm))
  }

  return [...expanded]
}

const RELATED_TERMS: Record<string, string[]> = {
  architecture: ['domaine', 'infrastructure', 'repository', 'cas d utilisation', 'service applicatif', 'port'],
  classe: ['objet', 'instance', 'constructeur', 'methode', 'encapsulation'],
  couplage: ['dependance', 'interface', 'dip', 'adaptateur', 'injection de dependance'],
  encapsulation: ['invariant', 'etat valide', 'private', 'setter', 'getter', 'constructeur'],
  heritage: ['extends', 'substitution', 'lsp', 'classe abstraite', 'polymorphisme'],
  pattern: ['strategy', 'adapter', 'observer', 'state', 'command', 'factory method', 'facade'],
  patterns: ['strategy', 'adapter', 'observer', 'state', 'command', 'factory method', 'facade'],
  persistence: ['repository', 'infrastructure', 'dto', 'port', 'adaptateur'],
  poo: ['objet', 'classe', 'instance', 'responsabilite', 'encapsulation', 'polymorphisme'],
  solid: ['srp', 'ocp', 'lsp', 'isp', 'dip', 'substitution', 'extension', 'dependance'],
  test: ['test unitaire', 'mock', 'stub', 'fake', 'dummy', 'arrange', 'act', 'assert'],
  tests: ['test unitaire', 'mock', 'stub', 'fake', 'dummy', 'arrange', 'act', 'assert'],
}
