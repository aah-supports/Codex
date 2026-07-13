export type SpeechSettings = {
  voiceURI: string
  rate: number
}

const STORAGE_KEY = 'corpus:speech-settings'

export const DEFAULT_SPEECH_SETTINGS: SpeechSettings = {
  voiceURI: '',
  rate: 0.94,
}

export function readSpeechSettings(): SpeechSettings {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as Partial<SpeechSettings>
    return {
      voiceURI: typeof stored.voiceURI === 'string' ? stored.voiceURI : DEFAULT_SPEECH_SETTINGS.voiceURI,
      rate: typeof stored.rate === 'number' ? Math.min(1.3, Math.max(0.7, stored.rate)) : DEFAULT_SPEECH_SETTINGS.rate,
    }
  } catch {
    return DEFAULT_SPEECH_SETTINGS
  }
}

export function saveSpeechSettings(settings: SpeechSettings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
}

export function getFrenchVoices(voices: SpeechSynthesisVoice[]) {
  return voices
    .filter((voice) => voice.localService && voice.lang.toLowerCase().startsWith('fr'))
    .sort((left, right) => left.name.localeCompare(right.name, 'fr'))
}

export function chooseSpeechVoice(voices: SpeechSynthesisVoice[], voiceURI = '') {
  const selected = voices.find((voice) => voice.localService && voice.voiceURI === voiceURI)
  if (selected) return selected

  const french = getFrenchVoices(voices)
  const naturalFeminine = /audrey|am[eé]lie|aur[eé]lie|hortense|julie|marie|virginie|celine|denise|vivienne|femme|female|premium|enhanced/i
  return french.find((voice) => naturalFeminine.test(voice.name)) ?? french[0]
}
