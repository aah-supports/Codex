import { createHashHistory, createRootRoute, createRoute, createRouter, Outlet } from '@tanstack/react-router'
import { AppShell } from '../shell/AppShell'
import { CorpusPage } from '../../features/corpus/CorpusPage'
import { LessonPage } from '../../features/lessons/LessonPage'
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
