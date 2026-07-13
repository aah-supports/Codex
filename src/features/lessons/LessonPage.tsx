import { Link, useParams } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { ChevronLeft, ChevronRight, CircleCheck, ListTree, TrendingUp } from 'lucide-react'
import { MarkdownRenderer } from '../../components/MarkdownRenderer'
import { Badge } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'
import { getMarkdown } from '../../content/api'
import type { ParsedMarkdown } from '../../types/content'
import { useCorpusIndex } from '../corpus/useCorpus'
import { LessonAudioPlayer } from './LessonAudioPlayer'
import { useLearningStore } from '../../stores/learningStore'

export function LessonPage() {
  const { corpusId, moduleId } = useParams({ from: '/learn/$corpusId/$moduleId' })
  const { data: index } = useCorpusIndex()

  const corpus = index?.corpora.find((entry) => entry.id === corpusId)
  const module = corpus?.modules.find((entry) => entry.id === moduleId)
  const progress = useLearningStore((state) => state.progress[moduleId])

  const lesson = useQuery({
    queryKey: ['markdown', module?.paths.lesson],
    queryFn: () => getMarkdown(module!.paths.lesson),
    enabled: Boolean(module),
  })
  const examples = useQuery({
    queryKey: ['markdown', module?.paths.examples],
    queryFn: () => getMarkdown(module!.paths.examples),
    enabled: Boolean(module),
  })
  const exercises = useQuery({
    queryKey: ['markdown', module?.paths.exercises],
    queryFn: () => getMarkdown(module!.paths.exercises),
    enabled: Boolean(module),
  })
  const solutions = useQuery({
    queryKey: ['markdown', module?.paths.solutions],
    queryFn: () => getMarkdown(module!.paths.solutions!),
    enabled: Boolean(module?.paths.solutions),
  })
  const lab = useQuery({
    queryKey: ['markdown', module?.paths.lab],
    queryFn: () => getMarkdown(module!.paths.lab!),
    enabled: Boolean(module?.paths.lab),
  })
  const readings = useQuery({
    queryKey: ['markdown', module?.paths.readings],
    queryFn: () => getMarkdown(module!.paths.readings),
    enabled: Boolean(module),
  })

  if (!module) {
    return <p>Module introuvable.</p>
  }

  const moduleIndex = corpus?.modules.findIndex((entry) => entry.id === moduleId) ?? -1
  const previousModule = moduleIndex > 0 ? corpus?.modules[moduleIndex - 1] : undefined
  const nextModule = moduleIndex >= 0 ? corpus?.modules[moduleIndex + 1] : undefined
  const progressValue = progress?.selfAssessment ?? 0

  return (
    <div className="page-stack lesson-shell">
      <nav className="breadcrumbs" aria-label="Fil d’Ariane">
        <Link to="/corpus">Corpus</Link><span aria-hidden="true">/</span>
        <span>{corpus?.title}</span><span aria-hidden="true">/</span>
        <strong>{module.title}</strong>
      </nav>
      <header className="page-header">
        <div className="title-with-badge"><h2>{module.title}</h2><Badge>Cours</Badge></div>
        <p>{module.description}</p>
        <div className="tag-row">
          {module.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </header>

      <nav className="lesson-tabs" aria-label="Navigation dans le module">
        <SectionButton className="active" sectionId="chapitre-lecon">Contenu</SectionButton>
        <SectionButton sectionId="chapitre-exemples">Exemples</SectionButton>
        <SectionButton sectionId="chapitre-exercices">Exercices</SectionButton>
        {module.paths.solutions ? <SectionButton sectionId="chapitre-corrections">Corrections</SectionButton> : null}
        {module.paths.lab ? <SectionButton sectionId="chapitre-atelier">Atelier</SectionButton> : null}
        <SectionButton sectionId="chapitre-lectures">Lectures</SectionButton>
      </nav>

      <div className="lesson-layout">
        <div className="lesson-content-column">
        <Card className="markdown-card" id="chapitre-lecon">
          <div className="section-heading">
            <div className="lesson-section-title">
              <p className="eyebrow">Chapitre 1</p>
              <h3>Leçon</h3>
            </div>
            {lesson.data ? <LessonAudioPlayer markdown={lesson.data.body} title="la leçon" /> : null}
          </div>
          <MarkdownState query={lesson} />
        </Card>
        <Card className="markdown-card" id="chapitre-exemples">
          <div className="section-heading">
            <div className="lesson-section-title">
              <p className="eyebrow">Chapitre 2</p>
              <h3>Exemples</h3>
            </div>
            {examples.data ? <LessonAudioPlayer markdown={examples.data.body} title="les exemples" /> : null}
          </div>
          <MarkdownState query={examples} />
        </Card>
        <Card className="markdown-card" id="chapitre-exercices">
          <div className="section-heading">
            <div className="lesson-section-title">
              <p className="eyebrow">Chapitre 3</p>
              <h3>Exercices</h3>
            </div>
            {exercises.data ? <LessonAudioPlayer markdown={exercises.data.body} title="les exercices" /> : null}
          </div>
          <MarkdownState query={exercises} />
        </Card>
        {module.paths.solutions ? (
          <Card className="markdown-card solution-card" id="chapitre-corrections">
            <div className="solution-heading">
              <div className="lesson-section-title">
                <p className="eyebrow">Après l’exercice</p>
                <h3>Corrections guidées</h3>
              </div>
              {solutions.data ? <LessonAudioPlayer markdown={solutions.data.body} title="les corrections guidées" /> : null}
            </div>
            <MarkdownState query={solutions} />
          </Card>
        ) : null}
        {module.paths.lab ? (
          <Card className="markdown-card" id="chapitre-atelier">
            <div className="section-heading">
              <div className="lesson-section-title">
                <p className="eyebrow">Chapitre 4</p>
                <h3>Atelier guidé</h3>
              </div>
              {lab.data ? <LessonAudioPlayer markdown={lab.data.body} title="l’atelier guidé" /> : null}
            </div>
            <MarkdownState query={lab} />
          </Card>
        ) : null}
        <Card className="markdown-card" id="chapitre-lectures">
          <div className="section-heading">
            <div className="lesson-section-title">
              <p className="eyebrow">Lecture</p>
              <h3>Lectures</h3>
            </div>
            {readings.data ? <LessonAudioPlayer markdown={readings.data.body} title="les lectures" /> : null}
          </div>
          <MarkdownState query={readings} />
        </Card>
        </div>

        <aside className="lesson-aside" aria-label="Informations du module">
          <Card className="aside-card progress-aside-card">
            <div className="aside-card-title"><TrendingUp size={19} /><h3>Ma progression</h3></div>
            <div className="progress-overview">
              <div className="progress-ring" style={{ '--progress': `${progressValue * 3.6}deg` } as React.CSSProperties}>
                <span>{progressValue}%</span>
              </div>
              <div><p>Progression dans ce module</p><div className="progress-track"><div className="progress-fill" style={{ width: `${progressValue}%` }} /></div></div>
            </div>
          </Card>

          <Card className="aside-card floating-summary">
            <div className="aside-card-title"><ListTree size={19} /><h3>Sommaire</h3></div>
            <ol>
              <li><SectionButton className="active" sectionId="chapitre-lecon">Leçon</SectionButton></li>
              <li><SectionButton sectionId="chapitre-exemples">Exemples</SectionButton></li>
              <li><SectionButton sectionId="chapitre-exercices">Exercices</SectionButton></li>
              {module.paths.solutions ? <li><SectionButton sectionId="chapitre-corrections">Corrections</SectionButton></li> : null}
              {module.paths.lab ? <li><SectionButton sectionId="chapitre-atelier">Atelier guidé</SectionButton></li> : null}
              <li><SectionButton sectionId="chapitre-lectures">Lectures</SectionButton></li>
            </ol>
          </Card>

          <Card className="aside-card module-navigation-card">
            <div className="aside-card-title"><CircleCheck size={19} /><h3>Navigation</h3></div>
            {previousModule ? <Link to="/learn/$corpusId/$moduleId" params={{ corpusId, moduleId: previousModule.id }}><ChevronLeft size={18} /><span><small>Module précédent</small>{previousModule.title}</span></Link> : null}
            {nextModule ? <Link to="/learn/$corpusId/$moduleId" params={{ corpusId, moduleId: nextModule.id }}><span><small>Module suivant</small>{nextModule.title}</span><ChevronRight size={18} /></Link> : null}
          </Card>
        </aside>
      </div>
    </div>
  )
}

function SectionButton({
  sectionId,
  className,
  children,
}: {
  sectionId: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
    >
      {children}
    </button>
  )
}

function MarkdownState({
  query,
}: {
  query: ReturnType<typeof useQuery<ParsedMarkdown>>
}) {
  if (query.isLoading) {
    return <p>Chargement...</p>
  }

  if (query.error || !query.data) {
    return <p>Contenu indisponible.</p>
  }

  return (
    <>
      <ContentTags tags={getFrontmatterTags(query.data)} />
      <MarkdownRenderer copyCode copyText>{query.data.body}</MarkdownRenderer>
    </>
  )
}

const tagLabels: Record<string, string> = {
  def: 'Définition',
  important: 'Important',
}

const visibleTags = new Set(['def', 'important'])

function getFrontmatterTags(markdown: ParsedMarkdown | undefined) {
  if (!markdown) {
    return []
  }

  return uniqueStrings(toStringArray(markdown.frontmatter.tags)).filter((tag) => visibleTags.has(tag))
}

function toStringArray(value: ParsedMarkdown['frontmatter'][string]) {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string')
  }

  return typeof value === 'string' ? [value] : []
}

function uniqueStrings(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)))
}

function formatTag(tag: string) {
  return tagLabels[tag] ?? tag.replaceAll('-', ' ')
}

function ContentTags({ tags }: { tags: string[] }) {
  if (tags.length === 0) {
    return null
  }

  return (
    <div className="content-tags" aria-label="Tags du contenu">
      {tags.map((tag) => (
        <Badge key={tag}>{formatTag(tag)}</Badge>
      ))}
    </div>
  )
}
