export type CorpusId = string
export type ModuleId = string
export type GeneratedContentKind = 'qcm' | 'exercise' | 'correction'

export type CorpusIndex = {
  schemaVersion: number
  corpora: CorpusSummary[]
}

export type CorpusSummary = {
  id: CorpusId
  title: string
  description: string
  version: string
  modules: ModuleSummary[]
}

export type ModuleSummary = {
  id: ModuleId
  slug: string
  title: string
  description: string
  level: 'beginner' | 'beginner-intermediate' | 'intermediate' | 'advanced'
  durationMinutes: number
  tags: string[]
  paths: {
    lesson: string
    examples: string
    exercises: string
    solutions?: string
    lab?: string
    quiz: string
    readings: string
  }
}

export type ParsedMarkdown = {
  frontmatter: Record<string, string | string[] | number | boolean>
  body: string
}

export type GeneratedDraft = {
  id: string
  kind: GeneratedContentKind
  title: string
  tags: string[]
  sourceModuleId?: ModuleId
  sourceCorpusId?: CorpusId
  prompt: string
  markdown: string
  model: string
  createdAt: string
  updatedAt: string
}

export type GeneratedContentIndex = {
  schemaVersion: number
  rootDirectory: string
  buckets: Array<{
    kind: GeneratedContentKind
    title: string
    directory: string
    indexPath: string
    tags: string[]
  }>
}

export type PersonalSheetIndex = {
  schemaVersion: number
  sheets: PersonalSheetSummary[]
}

export type PersonalSheetSummary = {
  id: string
  title: string
  description: string
  path: string
  tags: string[]
}

export type QuizQuestion = {
  id: string
  question: string
  choices: string[]
  answerIndex: number
  explanation: string
}

export type ModuleProgress = {
  moduleId: ModuleId
  lessonCompleted: boolean
  exerciseCompleted: boolean
  selfAssessment: number
  bestQuizScore: number
  quizAttempts: number
  updatedAt: string
}

export type AnonymousStatsExport = {
  schemaVersion: number
  anonymousUserId: string
  generatedAt: string
  corpora: Record<
    string,
    {
      completedModules: number
      averageScore: number
      quizAttempts: number
      touchedModuleIds: string[]
    }
  >
}

export type UserDataExport = {
  schemaVersion: number
  exportedAt: string
  progress: Record<ModuleId, ModuleProgress>
  generatedDrafts: Record<string, GeneratedDraft>
}
