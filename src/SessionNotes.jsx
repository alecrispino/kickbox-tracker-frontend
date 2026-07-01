import { useState, useEffect } from "react";

function SessionNotes({ sessionId }) {
    const [notes, setNotes] = useState([])
    const [text, setText] = useState('')
    const [tags, setTags] = useState('')

    useEffect(() => {
        fetchNotes()
    }, [sessionId])

    function fetchNotes() {
        fetch(`http://localhost:8080/api/notes/by-session/${sessionId}`)
            .then(response => response.json())
            .then(data => setNotes(data))
            .catch(error => console.error('Fehler beim Laden der Notizen:', error))
    }

    function handleSubmit(event) {
        event.preventDefault()

        const newNote = {
            trainingSessionId: sessionId,
            text: text,
            tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
        }

        fetch('http://localhost:8080/api/notes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newNote)
        })
            .then(response => response.json())
            .then(() => {
                fetchNotes()
                setText('')
                setTags('')
            })
            .catch(error => console.error('Fehler beim Speichern:', error))
    }

    return (
        <div>
            <h4>Notizen: </h4>

            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Notiz eingeben.."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                />

                <input 
                    type="text"
                    placeholder="Tags (mit Beistrich getrennt z.B. technik, ausdauer)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                />

                <button type="submit">Notiz speichern</button>
            </form>

            <ul>
                {notes.map(note => (
                    <li key={note.id}>
                        {note.text}
                        {note.tags.length > 0 && (
                            <span> - Tags: {note.tags.join(', ')}</span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SessionNotes