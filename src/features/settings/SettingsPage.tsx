import { useEffect, useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { getDefaultOllamaConfig, readOllamaConfig, saveOllamaConfig } from '../../lib/ollama'
import {
  chooseSpeechVoice,
  getFrenchVoices,
  readSpeechSettings,
  saveSpeechSettings,
  type SpeechSettings,
} from '../../lib/speechSettings'

export function SettingsPage() {
  const [config, setConfig] = useState(getDefaultOllamaConfig())
  const [speech, setSpeech] = useState<SpeechSettings>(readSpeechSettings)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])

  useEffect(() => {
    setConfig(readOllamaConfig())
    if (!('speechSynthesis' in window)) return

    const refreshVoices = () => setVoices(getFrenchVoices(window.speechSynthesis.getVoices()))
    refreshVoices()
    window.speechSynthesis.addEventListener('voiceschanged', refreshVoices)
    return () => window.speechSynthesis.removeEventListener('voiceschanged', refreshVoices)
  }, [])

  function saveConfig() {
    saveOllamaConfig(config)
  }

  function saveVoice() {
    saveSpeechSettings(speech)
  }

  function previewVoice() {
    window.speechSynthesis.cancel()
    const voice = chooseSpeechVoice(window.speechSynthesis.getVoices(), speech.voiceURI)
    if (!voice) return
    const utterance = new SpeechSynthesisUtterance(
      'Bonjour, je vais t’accompagner dans ton cours avec une voix plus naturelle et agréable.',
    )
    utterance.lang = 'fr-FR'
    utterance.rate = speech.rate
    utterance.voice = voice
    window.speechSynthesis.speak(utterance)
  }

  return (
    <div className="page-stack">
      <header className="page-header">
        <p className="eyebrow">Paramètres</p>
        <h2>Configuration du moteur</h2>
        <p>
          Choisis un moteur local ou une API distante, puis active la fonction seulement si tu en as besoin.
        </p>
      </header>

      <div className="settings-grid">
        <Card className="settings-panel">
          <h3>Moteur</h3>
          <p>Le mode reste désactivé tant qu’aucune configuration n’a été enregistrée.</p>
          <label>
            Mode
            <select
              value={config.provider}
              onChange={(event) => setConfig((state) => ({ ...state, provider: event.target.value as 'local' | 'api' }))}
            >
              <option value="local">Modèle local</option>
              <option value="api">API distante</option>
            </select>
          </label>
          <label>
            Activer le moteur
            <input
              type="checkbox"
              checked={config.enabled}
              onChange={(event) => setConfig((state) => ({ ...state, enabled: event.target.checked }))}
            />
          </label>
          <label>
            Modèle
            <input
              value={config.model}
              onChange={(event) => setConfig((state) => ({ ...state, model: event.target.value }))}
              placeholder="gemma4:e4b-mlx"
            />
          </label>
          <label>
            URL du service
            <input
              value={config.baseUrl}
              onChange={(event) => setConfig((state) => ({ ...state, baseUrl: event.target.value }))}
              placeholder="http://localhost:11434"
            />
          </label>
          <label>
            Clé API
            <input
              value={config.apiKey}
              onChange={(event) => setConfig((state) => ({ ...state, apiKey: event.target.value }))}
              placeholder="facultatif"
            />
          </label>
          <Button onClick={saveConfig}>Enregistrer la config</Button>
        </Card>

        <Card className="settings-panel">
          <h3>Voix de lecture</h3>
          <p>
            La synthèse vocale utilise uniquement les voix disponibles sur cet appareil. Par défaut, Corpus privilégie
            une voix française féminine et naturelle.
          </p>
          <label>
            Voix française
            <select value={speech.voiceURI} onChange={(event) => setSpeech((state) => ({ ...state, voiceURI: event.target.value }))}>
              <option value="">Automatique — féminine et naturelle</option>
              {voices.map((voice) => (
                <option key={voice.voiceURI} value={voice.voiceURI}>
                  {voice.name} — locale
                </option>
              ))}
            </select>
          </label>
          <label>
            Vitesse — {speech.rate.toFixed(2)}×
            <input
              type="range"
              min="0.7"
              max="1.3"
              step="0.05"
              value={speech.rate}
              onChange={(event) => setSpeech((state) => ({ ...state, rate: Number(event.target.value) }))}
            />
          </label>
          <div className="card-actions">
            <Button onClick={previewVoice}>Écouter un aperçu</Button>
            <Button onClick={saveVoice}>Enregistrer la voix</Button>
          </div>
          {!voices.length ? (
            <p className="muted">Aucune voix française locale n’est actuellement exposée par ce navigateur.</p>
          ) : null}
        </Card>

        <div className="settings-note">
          <strong>Installation</strong>
          <ul className="settings-list">
            <li>Installer l’application et lancer le projet en local avec <code>npm install</code> puis <code>npm run dev</code>.</li>
            <li>Choisir un mode dans Paramètres : modèle local ou API distante.</li>
            <li>Activer le moteur seulement quand l’URL, le modèle et la clé éventuelle sont renseignés.</li>
            <li>Le mode local recommande Ollama avec <code>ollama serve</code> puis <code>ollama pull gemma4:e4b-mlx</code>.</li>
          </ul>
          <p>
            Sur GitHub Pages, la fonction reste désactivée tant qu’aucune configuration locale n’a été faite.
          </p>
          <p>
            Contraintes matérielles pour le mode local: prévoir au minimum 8 Go de RAM, idéalement 16 Go pour un usage
            plus confortable. En CPU seul, la génération sera plus lente; il vaut mieux garder des prompts courts et
            des corpus ciblés. Si la machine est trop juste, utiliser un modèle plus léger ou passer par une API.
          </p>
          <p>
            Côté usage, on évite d’ouvrir trop d’onglets lourds pendant la génération et on garde les corpus
            raisonnables pour ne pas surcharger la mémoire.
          </p>
          <p>
            Pour une API distante, le service doit exposer une compatibilité avec les appels utilisés par l’application
            ou être placé derrière un proxy qui traduit la requête.
          </p>
        </div>
      </div>
    </div>
  )
}
