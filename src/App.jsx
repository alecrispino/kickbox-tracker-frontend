import { useState, useEffect } from 'react'

function App() {
  const [sessions, setSessions] = useState([])

  useEffect(() => {
    fetch("http://localhost:8080/api/sessions")
      .then(response => response.json())
      .then(data => setSessions(data))
      .catch(error => console.error("Fehler beim Laden:", error))
  }, [])

  return (
    <div>
      <h1>Kickbox Tracker</h1>
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