import { useState, useEffect } from 'react'

function App() {
  const [sessions, setSessions] = useState([])

  const [date, setDate] = useState('')
  const [type, setType] = useState('SPARRING')
  const [durationMinutes, setDurationMinutes] = useState('')
  const [intensity, setIntensity] = useState('')

  useEffect(() => {
    fetchSessions()
  }, [])

  function fetchSessions() {
    fetch("http://localhost:8080/api/sessions")
      .then(response => response.json())
      .then(data => setSessions(data))
      .catch(error => console.error("Fehler beim Laden:", error))
  }
  
  function handleSubmit(event) {
    event.preventDefault()

    const newSession = {
      date: date,
      type: type,
      durationMinutes: parseInt(durationMinutes),
      intensity: parseInt(intensity)
    }

    fetch("http://localhost:8080/api/sessions", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newSession)
    })
      .then(response => response.json())
      .then(() => {
        fetchSessions()
        setDate('')
        setType('SPARRING')
        setDurationMinutes('')
        setIntensity('')
      })
      .catch(error => console.error("Fehler beim Speichern: ", error))
  }

  return (
    <div>
      <h1>Kickbox Tracker</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Datum: </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Typ: </label>
          <select value={type} onChange={(e)=> setType(e.target.value)}>
            <option value="SPARRING">Sparring</option>
            <option value="PADWORK">Padwork</option>
            <option value="CONDITIONING">Kondition</option>
            <option value="TECHNIQUE">Technik</option>
          </select>
        </div>

        <div>
          <label>Dauer in Minuten: </label>
          <input 
            type="number" 
            value={durationMinutes}
            onChange={(e) => setDurationMinutes(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Intensität 1-10: </label>
          <input
            type="number"
            min="1"
            max="10"
            value={intensity}
            onChange={(e) => setIntensity(e.target.value)}
            required
          />
        </div>

        <button type='submit'>Training speichern</button>
      </form>
      
      <ul>
        {sessions.map(session => (
          <li key={session.id}>
            {session.date} - {session.type} - {session.durationMinutes} Min - Intensität: {session.intensity}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App