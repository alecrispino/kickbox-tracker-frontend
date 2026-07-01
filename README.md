# Kickbox Tracker – Frontend

React-Frontend für die Kickbox-Tracker-App.

## Tech Stack

- React 19
- Vite
- JavaScript (JSX)

## Voraussetzungen

Das Backend muss lokal laufen:
→ [kickbox-tracker Backend](https://github.com/alecrispino/kickbox-tracker)

## Setup & Starten

```bash
npm install
npm run dev
```

App läuft dann auf `http://localhost:5173`

## Features

- Trainingseinheiten anlegen (Datum, Typ, Dauer, Intensität)
- Alle Trainings in einer Übersicht anzeigen
- Notizen & Tags zu jeder Trainingseinheit anlegen (MongoDB)

## Projektstruktur

```
src/
├── App.jsx           # Hauptkomponente, Session-Liste & Formular
└── SessionNotes.jsx  # Notizen-Komponente pro Session
```