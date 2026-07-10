import { ChangeEvent } from 'react'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { getOrCreateAnonymousUserId } from '../../lib/id'
import { nowIso } from '../../lib/date'
import { useLearningStore } from '../../stores/learningStore'
import type { AnonymousStatsExport, UserDataExport } from '../../types/content'
import { useCorpusIndex } from '../corpus/useCorpus'

export function SettingsPage() {
  const exportUserData = useLearningStore((state) => state.exportUserData)
  const importUserData = useLearningStore((state) => state.importUserData)
  const progress = useLearningStore((state) => state.progress)
  const { data } = useCorpusIndex()

  function download(filename: string, payload: unknown) {
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
    URL.revokeObjectURL(url)
  }

  function exportFullBackup() {
    download(`poo-learning-backup-${new Date().toISOString().slice(0, 10)}.json`, exportUserData())
  }

  function exportAnonymousStats() {
    const corpora: AnonymousStatsExport['corpora'] = {}

    for (const corpus of data?.corpora ?? []) {
      const corpusProgress = corpus.modules.map((module) => progress[module.id]).filter(Boolean)
      const completedModules = corpusProgress.filter((entry) => entry.lessonCompleted).length
      const scored = corpusProgress.filter((entry) => entry.quizAttempts > 0)
      const averageScore =
        scored.length === 0 ? 0 : scored.reduce((total, entry) => total + entry.bestQuizScore, 0) / scored.length

      corpora[corpus.id] = {
        completedModules,
        averageScore: Math.round(averageScore),
        quizAttempts: corpusProgress.reduce((total, entry) => total + entry.quizAttempts, 0),
        touchedModuleIds: corpusProgress.map((entry) => entry.moduleId),
      }
    }

    download('stats.anonymous.json', {
      schemaVersion: 1,
      anonymousUserId: getOrCreateAnonymousUserId(),
      generatedAt: nowIso(),
      corpora,
    } satisfies AnonymousStatsExport)
  }

  async function importBackup(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const text = await file.text()
    await importUserData(JSON.parse(text) as UserDataExport)
  }

  return (
    <div className="page-stack">
      <header className="page-header">
        <p className="eyebrow">Sauvegarde</p>
        <h2>Exporter, importer, partager</h2>
        <p>Le backup complet est prive. Les stats anonymisees peuvent etre poussees sur GitHub si tu le choisis.</p>
      </header>

      <div className="settings-grid">
        <Card>
          <h3>Backup complet</h3>
          <p>Contient progression, scores et tentatives. A garder prive.</p>
          <Button onClick={exportFullBackup}>Exporter mes donnees</Button>
        </Card>
        <Card>
          <h3>Stats anonymisees</h3>
          <p>Contient uniquement des scores agreges et des ids de modules.</p>
          <Button onClick={exportAnonymousStats} variant="secondary">
            Exporter pour GitHub
          </Button>
        </Card>
        <Card>
          <h3>Restaurer</h3>
          <p>Recharge un backup JSON complet dans IndexedDB.</p>
          <input type="file" accept="application/json" onChange={(event) => void importBackup(event)} />
        </Card>
      </div>
    </div>
  )
}
