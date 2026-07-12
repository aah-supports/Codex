import { useEffect, useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { getDefaultOllamaConfig, readOllamaConfig, saveOllamaConfig } from '../../lib/ollama'

export function SettingsPage() {
  const [config, setConfig] = useState(getDefaultOllamaConfig())

  useEffect(() => {
    setConfig(readOllamaConfig())
  }, [])

  function saveConfig() {
    saveOllamaConfig(config)
  }

  return (
    <div className="page-stack">
      <header className="page-header">
        <p className="eyebrow">Paramètres</p>
        <h2>Configuration locale</h2>
        <p>Le modèle Ollama est configuré ici. Le reste est laissé au local et aux fichiers du corpus.</p>
      </header>

      <div className="settings-grid">
        <Card className="settings-panel">
          <h3>Ollama local</h3>
          <p>Le modèle par défaut reste <strong>gemma4:e4b-mlx</strong>.</p>
          <label>
            Modèle
            <input
              value={config.model}
              onChange={(event) => setConfig((state) => ({ ...state, model: event.target.value }))}
              placeholder="gemma4:e4b-mlx"
            />
          </label>
          <Button onClick={saveConfig}>Enregistrer la config</Button>
        </Card>

        <Card className="settings-panel">
          <h3>Installation locale pour les étudiants</h3>
          <p>Le principe est simple: l’application React tourne dans le navigateur, et Ollama tourne sur la machine locale.</p>
          <ul className="settings-list">
            <li>Installer Ollama sur la machine de l’étudiant.</li>
            <li>Lancer le serveur local avec <code>ollama serve</code>.</li>
            <li>Télécharger le modèle avec <code>ollama pull gemma4:e4b-mlx</code>.</li>
            <li>Garder l’application et Ollama sur la même machine, sans service distant.</li>
          </ul>
          <p>
            Contraintes matérielles: sur une machine modeste, prévoir au minimum 8 Go de RAM, idéalement 16 Go pour
            plus de confort. En CPU seul, la génération sera plus lente; il faut donc privilégier des prompts courts et
            des corpus ciblés. Si la machine est trop juste, utiliser un modèle plus léger ou désactiver les usages
            lourds de génération.
          </p>
          <p>
            Côté usage, on évite d’ouvrir trop d’onglets lourds pendant la génération et on garde les corpus
            raisonnables pour ne pas surcharger la mémoire.
          </p>
        </Card>
      </div>
    </div>
  )
}
