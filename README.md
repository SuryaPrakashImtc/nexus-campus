# Nexus Campus — Meridian University

"One Platform. Every Student Journey."

A high-fidelity, clickable UI/UX prototype for a modern university ERP, built as
a standard React + Vite web app. Includes Student, Faculty, and Registrar
role-based journeys with mock data — no backend required.

## Tech stack

- React 18
- Vite 5
- Tailwind CSS 3
- lucide-react (icons)
- recharts (charts)

## Getting started

Requires Node.js 18 or later.

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

The production build is output to the `dist/` folder and can be deployed to
any static host (Vercel, Netlify, GitHub Pages, Google AI Studio hosting, etc.).

## Project structure

```
nexus-campus/
├── index.html            # HTML entry point, loads Google Fonts
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx           # React root
    ├── index.css          # Tailwind directives
    └── App.jsx            # Entire Nexus Campus prototype (all screens,
                            # components, mock data and interactions)
```

## What's included

- Persistent dark-navy sidebar with role switcher (Student / Faculty / Registrar)
- Global search overlay, notification panel, profile menu
- **Student**: Dashboard, Attendance, Fees & Payments, Timetable, Academic Records
- **Faculty**: Dashboard, Attendance marking workflow, Gradebook (editable)
- **Registrar**: Institution dashboard, Analytics Workspace, Student Directory,
  Student 360 profile, Connected Systems / Integrations view
- Toast notifications, empty states, and fully clickable navigation — no dead links

All data is mocked locally in `src/App.jsx`; there is no backend, authentication,
or payment gateway. Fonts (League Spartan, Inter, IBM Plex Mono) are loaded from
Google Fonts via `index.html`.
