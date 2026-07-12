import { createHashHistory, createRootRoute, createRoute, createRouter, Outlet } from '@tanstack/react-router'
import { AppShell } from '../shell/AppShell'
import { ChatPage } from '../../features/chat/ChatPage'
import { CorpusPage } from '../../features/corpus/CorpusPage'
import { GlossaryPage } from '../../features/glossary/GlossaryPage'
import { GenerationPage } from '../../features/generation/GenerationPage'
import { LessonPage } from '../../features/lessons/LessonPage'
import { PersonalSheetPage } from '../../features/sheets/PersonalSheetPage'
import { PersonalSheetsPage } from '../../features/sheets/PersonalSheetsPage'
import { QuizPage } from '../../features/quizzes/QuizPage'
import { SettingsPage } from '../../features/settings/SettingsPage'
import { StatsPage } from '../../features/stats/StatsPage'

const rootRoute = createRootRoute({
  component: () => (
    <AppShell>
      <Outlet />
    </AppShell>
  ),
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: CorpusPage,
})

const corpusRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/corpus',
  component: CorpusPage,
})

const learnRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/learn/$corpusId/$moduleId',
  component: LessonPage,
})

const quizRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/quiz/$corpusId/$moduleId',
  component: QuizPage,
})

const statsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/stats',
  component: StatsPage,
})

const glossaryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/glossary',
  component: GlossaryPage,
})

const generationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/generation',
  component: GenerationPage,
})

const chatRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/chat',
  component: ChatPage,
})

const personalSheetsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/fiches',
  component: PersonalSheetsPage,
})

const personalSheetRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/fiches/$sheetId',
  component: PersonalSheetPage,
})

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: SettingsPage,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  corpusRoute,
  learnRoute,
  quizRoute,
  statsRoute,
  glossaryRoute,
  generationRoute,
  chatRoute,
  personalSheetsRoute,
  personalSheetRoute,
  settingsRoute,
])

export const router = createRouter({
  routeTree,
  history: createHashHistory(),
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
