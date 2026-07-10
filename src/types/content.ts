export type CorpusId = string
export type ModuleId = string

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
    quiz: string
    readings: string
  }
}

export type ParsedMarkdown = {
  frontmatter: Record<string, string | string[] | number | boolean>
  body: string
}

export type QuizQuestion = {
  id: string
  question: string
  choices: string[]
  answerIndex: number
  explanation: string
}

export type UserNote = {
  id: string
  title: string
  body: string
  tags: string[]
  moduleId?: ModuleId
  createdAt: string
  updatedAt: string
}

export type ModuleProgress = {
  moduleId: ModuleId
  lessonCompleted: boolean
  exerciseCompleted: boolean
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
  notes: UserNote[]
  tags: string[]
}
