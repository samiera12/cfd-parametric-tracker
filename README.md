# CFD Parametric Study Tracker

A full stack web application for managing Computational Fluid Dynamics (CFD) parametric studies. Track simulation runs, compare output metrics across parameter sweeps, and visualize results — all in one place.

Built as a portfolio project to demonstrate full stack development skills applied to an engineering domain.

---

## Live Demo

[cfd-parametric-tracker.onrender.com](https://cfd-parametric-tracker.onrender.com) 

> Note: The app may take 30–60 seconds to load on first visit (free tier spins down after inactivity).

---

## What Problem Does This Solve?

CFD engineers typically track parametric studies manually in spreadsheets — juggling Reynolds numbers, mesh sizes, residuals, and output coefficients across dozens of simulation runs. This tool replaces that workflow with a structured web interface that lets you:

- Organize runs by study (Reynolds sweep, AoA sweep, mesh refinement, etc.)
- Log simulation outputs (Cd, Cl, Nu, pressure drop, etc.) per run
- Visualize how output metrics change across the parameter range
- Track convergence status and wall time for each run

---

## Features

- Create and manage multiple parametric studies
- Log simulation runs with parameter values, mesh size, solver settings, and output metrics
- Comparison chart — plot any metric vs the sweep parameter across all converged runs
- Run status tracking — converged, running, queued, failed
- Full REST API — integrate with OpenFOAM post-processing scripts to auto-log results
- Dark UI designed for engineering workflows

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js, Express |
| Storage | In-memory store (swap for PostgreSQL) |
| Frontend | Vanilla JS, Chart.js |
| Deployment | Render |

---

## Getting Started

### Prerequisites
- Node.js v18 or higher
- npm

### Installation

```bash
# Clone the repo
git clone https://github.com/samiera12/cfd-parametric-tracker.git
cd cfd-parametric-tracker

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open your browser at `http://localhost:3000`

The app loads with a seeded **NACA 0012 Reynolds sweep** study (5 converged runs + 1 running) so you can explore the UI immediately.

---

## API Reference

Base URL: `https://your-app.onrender.com/api`

### Studies

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /studies | List all studies |
| GET | /studies/:id | Get study by ID |
| POST | /studies | Create a study |
| PUT | /studies/:id | Update a study |
| DELETE | /studies/:id | Delete study and all its runs |

### Runs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /studies/:id/runs | List all runs |
| GET | /studies/:id/runs/:runId | Get single run |
| GET | /studies/:id/runs/compare/summary | Aggregated data for comparison chart |
| POST | /studies/:id/runs | Add a run |
| PATCH | /studies/:id/runs/:runId | Update a run |
| DELETE | /studies/:id/runs/:runId | Delete a run |

### Example — Log a converged run

```bash
curl -X POST https://your-app.onrender.com/api/studies/seed-study-001/runs \
  -H "Content-Type: application/json" \
  -d '{
    "label": "Re = 3e+6",
    "parameterValue": 3000000,
    "meshCells": 120000,
    "outputs": { "Cd": 0.0059, "Cl": 0.521, "Cl/Cd": 88.3 },
    "notes": "Refined mesh near leading edge"
  }'
```

---

## Project Structure

```
cfd-parametric-tracker/
├── backend/
│   ├── server.js
│   ├── store.js
│   └── routes/
│       ├── studies.js
│       └── runs.js
├── frontend/
│   └── public/
│       └── index.html
├── package.json
└── README.md
```

---

## About

Built by [Samiera](https://github.com/samiera12)

This project combines CFD domain knowledge with modern web development to solve a real workflow problem in simulation-driven engineering.
