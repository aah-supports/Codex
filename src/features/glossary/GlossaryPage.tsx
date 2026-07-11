import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { MarkdownRenderer } from '../../components/MarkdownRenderer'
import { Card } from '../../components/ui/Card'
import { getMarkdown } from '../../content/api'

type GlossaryItem = {
  term: string
  text: string
  links: GlossaryLink[]
  searchText: string
}

type GlossaryLink = {
  label: string
  href: string
}

type RankedGlossaryItem = GlossaryItem & {
  rank: number
}

type GlossarySection = {
  title: string
  items: GlossaryItem[]
}

export function GlossaryPage() {
  const [query, setQuery] = useState('')
  const glossary = useQuery({
    queryKey: ['markdown', 'shared/glossary.md'],
    queryFn: () => getMarkdown('shared/glossary.md'),
  })
  const sections = useMemo(() => parseGlossary(glossary.data?.body ?? ''), [glossary.data?.body])
  const normalizedQuery = normalizeSearch(query)
  const items = useMemo(() => sections.flatMap((section) => section.items), [sections])
  const visibleItems: RankedGlossaryItem[] = useMemo(() => {
    if (!normalizedQuery) {
      return items
        .map((item) => ({ ...item, rank: 0 }))
        .sort((left, right) => left.term.localeCompare(right.term, 'fr'))
    }

    return items
      .map((item) => ({ ...item, rank: rankGlossaryItem(item, normalizedQuery) }))
      .filter((item) => item.rank > 0)
      .sort((left, right) => right.rank - left.rank || left.term.localeCompare(right.term, 'fr'))
  }, [items, normalizedQuery])
  const totalItems = items.length

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
            ? `${visibleItems.length} résultat${visibleItems.length > 1 ? 's' : ''} sur ${totalItems} définitions`
            : `${totalItems} définitions disponibles`}
        </p>
      </Card>

      <Card className="glossary-card">
        {glossary.isLoading ? <p>Chargement du glossaire...</p> : null}
        {glossary.error ? <p>Glossaire indisponible.</p> : null}
        {glossary.data && visibleItems.length === 0 ? (
          <p className="glossary-empty">Aucune définition ne correspond à cette recherche.</p>
        ) : null}
        {glossary.data && normalizedQuery && visibleItems.length > 0 ? (
          <div className="glossary-result-heading">
            <p className="eyebrow">Définitions liées</p>
            <h3>{query.trim()}</h3>
          </div>
        ) : null}
        <div className="glossary-list">
          {visibleItems.map((item) => (
            <article className="glossary-item" key={item.term}>
              <h4>{item.term}</h4>
              <div className="markdown-card">
                <MarkdownRenderer>{item.text}</MarkdownRenderer>
              </div>
              {item.links.length > 0 ? (
                <div className="glossary-references" aria-label={`Cours associés à ${item.term}`}>
                  <p>{normalizedQuery ? 'Références pertinentes dans le cours' : 'Références dans le cours'}</p>
                  <ul>
                    {rankLinks(item.links, normalizedQuery).map((link) => (
                      <li key={`${item.term}-${link.href}-${link.label}`}>
                        <a href={link.href}>{link.label}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </article>
          ))}
        </div>
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
  const rawDefinition = index >= 0 ? text.slice(index + separatorLength).trim() : text
  const links = extractMarkdownLinks(rawDefinition)
  const definition = stripReferenceLinks(rawDefinition)

  return {
    term,
    text: definition,
    links,
    searchText: normalizeSearch(`${term} ${rawDefinition}`),
  }
}

function extractMarkdownLinks(markdown: string): GlossaryLink[] {
  const links: GlossaryLink[] = []
  const seen = new Set<string>()

  for (const match of markdown.matchAll(/\[([^\]]+)]\((#[^)]+)\)/g)) {
    const [, label, href] = match
    const key = `${label}-${href}`

    if (!seen.has(key)) {
      links.push({ label, href })
      seen.add(key)
    }
  }

  return links
}

function stripReferenceLinks(markdown: string) {
  const referenceStart = markdown.indexOf(' [Voir ')

  if (referenceStart < 0) {
    return markdown
  }

  return markdown.slice(0, referenceStart).trim()
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

function rankLinks(links: GlossaryLink[], query: string) {
  if (!query) {
    return links
  }

  const queryTerms = expandQuery(query)

  return [...links].sort((left, right) => {
    const leftRank = rankLink(left, queryTerms)
    const rightRank = rankLink(right, queryTerms)

    return rightRank - leftRank || left.label.localeCompare(right.label, 'fr')
  })
}

function rankLink(link: GlossaryLink, queryTerms: string[]) {
  const linkText = normalizeSearch(`${link.label} ${link.href}`)
  let rank = 0

  for (const term of queryTerms) {
    if (linkText.includes(term)) {
      rank += 20
    }
  }

  return rank
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
