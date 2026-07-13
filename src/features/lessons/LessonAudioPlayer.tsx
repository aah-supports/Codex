import { useEffect, useRef, useState } from 'react'
import { chooseSpeechVoice, readSpeechSettings } from '../../lib/speechSettings'

type PlaybackState = 'idle' | 'playing' | 'paused'

export function LessonAudioPlayer({ markdown, title }: { markdown: string; title: string }) {
  const [playback, setPlayback] = useState<PlaybackState>('idle')
  const idRef = useRef(crypto.randomUUID())
  const chunksRef = useRef<string[]>([])
  const chunkIndexRef = useRef(0)
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window

  useEffect(() => {
    const stopWhenAnotherChapterStarts = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== idRef.current) setPlayback('idle')
    }
    window.addEventListener('lesson-audio-start', stopWhenAnotherChapterStarts)
    return () => {
      window.removeEventListener('lesson-audio-start', stopWhenAnotherChapterStarts)
      window.speechSynthesis?.cancel()
    }
  }, [])

  function speakChunk() {
    const text = chunksRef.current[chunkIndexRef.current]
    if (!text) {
      setPlayback('idle')
      return
    }

    const utterance = new SpeechSynthesisUtterance(text)
    const voices = window.speechSynthesis.getVoices()
    const settings = readSpeechSettings()
    utterance.lang = 'fr-FR'
    utterance.rate = settings.rate
    const voice = chooseSpeechVoice(voices, settings.voiceURI)
    if (!voice) {
      setPlayback('idle')
      return
    }
    utterance.voice = voice
    utterance.onend = () => {
      chunkIndexRef.current += 1
      speakChunk()
    }
    utterance.onerror = (event) => {
      if (event.error !== 'interrupted' && event.error !== 'canceled') setPlayback('idle')
    }
    window.speechSynthesis.speak(utterance)
  }

  function start() {
    window.dispatchEvent(new CustomEvent('lesson-audio-start', { detail: idRef.current }))
    window.speechSynthesis.cancel()
    chunksRef.current = splitForSpeech(markdownToSpeech(`${title}.\n\n${markdown}`))
    chunkIndexRef.current = 0
    setPlayback('playing')
    speakChunk()
  }

  function togglePause() {
    if (playback === 'playing') {
      window.speechSynthesis.pause()
      setPlayback('paused')
    } else {
      window.speechSynthesis.resume()
      setPlayback('playing')
    }
  }

  function stop() {
    window.speechSynthesis.cancel()
    setPlayback('idle')
  }

  if (!supported) return null

  return (
    <div className="audio-reader" aria-label={`Lecture audio : ${title}`}>
      {playback === 'idle' ? (
        <button className="audio-reader-button" type="button" onClick={start} title={`Lire ${title}`} aria-label={`Lire ${title}`}>
          <span aria-hidden="true">▶</span>
        </button>
      ) : (
        <>
          <button
            className="audio-reader-button"
            type="button"
            onClick={togglePause}
            title={playback === 'playing' ? 'Mettre en pause' : 'Reprendre la lecture'}
            aria-label={playback === 'playing' ? 'Mettre en pause' : 'Reprendre la lecture'}
          >
            <span aria-hidden="true">{playback === 'playing' ? '⏸' : '▶'}</span>
          </button>
          <button className="audio-reader-button" type="button" onClick={stop} title="Arrêter la lecture" aria-label="Arrêter la lecture">
            <span aria-hidden="true">■</span>
          </button>
        </>
      )}
    </div>
  )
}

function markdownToSpeech(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, ' Exemple de code omis. ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^[-*+]\s+/gm, '')
    .replace(/^>\s?/gm, '')
    .replace(/[|*_~]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function splitForSpeech(text: string, maxLength = 900) {
  const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [text]
  const chunks: string[] = []
  let current = ''

  for (const sentence of sentences) {
    if (current && current.length + sentence.length > maxLength) {
      chunks.push(current.trim())
      current = ''
    }
    current += sentence
  }

  if (current.trim()) chunks.push(current.trim())
  return chunks
}
