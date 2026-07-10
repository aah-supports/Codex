import { FormEvent, useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { useLearningStore } from '../../stores/learningStore'

export function NotesPage() {
  const notes = useLearningStore((state) => state.notes)
  const createNote = useLearningStore((state) => state.createNote)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!title.trim() || !body.trim()) {
      return
    }

    await createNote({
      title: title.trim(),
      body: body.trim(),
      tags: tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    })

    setTitle('')
    setBody('')
    setTags('')
  }

  return (
    <div className="page-stack">
      <header className="page-header">
        <p className="eyebrow">Fiches et tags</p>
        <h2>Creer tes propres fiches</h2>
        <p>Les fiches restent privees dans IndexedDB jusqu'a export volontaire.</p>
      </header>

      <Card>
        <form className="note-form" onSubmit={(event) => void submit(event)}>
          <label>
            Titre
            <input value={title} onChange={(event) => setTitle(event.target.value)} />
          </label>
          <label>
            Tags separes par des virgules
            <input value={tags} onChange={(event) => setTags(event.target.value)} placeholder="poo, heritage" />
          </label>
          <label>
            Contenu
            <textarea value={body} onChange={(event) => setBody(event.target.value)} rows={6} />
          </label>
          <Button type="submit">Ajouter</Button>
        </form>
      </Card>

      <div className="module-grid">
        {notes.map((note) => (
          <Card key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.body}</p>
            <div className="tag-row">
              {note.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
            <p className="muted">Modifiee le {new Date(note.updatedAt).toLocaleDateString('fr-FR')}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
