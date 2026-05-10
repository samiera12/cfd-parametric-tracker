const express = require('express');
const router = express.Router({ mergeParams: true });
const { v4: uuidv4 } = require('uuid');
const store = require('../store');

// GET all runs for a study
router.get('/', (req, res) => {
  const runs = store.runs
    .filter(r => r.studyId === req.params.studyId)
    .sort((a, b) => a.parameterValue - b.parameterValue);
  res.json(runs);
});

// GET comparison summary (must be before /:runId)
router.get('/compare/summary', (req, res) => {
  const runs = store.runs
    .filter(r => r.studyId === req.params.studyId && r.status === 'converged')
    .sort((a, b) => a.parameterValue - b.parameterValue);

  if (!runs.length) return res.json({ labels: [], datasets: {} });

  const metrics = [...new Set(runs.flatMap(r => Object.keys(r.outputs)))];
  const datasets = {};
  metrics.forEach(m => {
    datasets[m] = runs.map(r => ({ x: r.parameterValue, y: r.outputs[m], label: r.label }));
  });

  res.json({ labels: runs.map(r => r.label), paramValues: runs.map(r => r.parameterValue), datasets });
});

// GET single run
router.get('/:runId', (req, res) => {
  const run = store.runs.find(r => r.id === req.params.runId && r.studyId === req.params.studyId);
  if (!run) return res.status(404).json({ error: 'Run not found' });
  res.json(run);
});

// POST create run
router.post('/', (req, res) => {
  const study = store.studies.find(s => s.id === req.params.studyId);
  if (!study) return res.status(404).json({ error: 'Study not found' });

  const { label, parameterValue, meshCells, outputs, notes } = req.body;
  if (parameterValue === undefined) return res.status(400).json({ error: 'parameterValue is required' });

  const run = {
    id: uuidv4(),
    studyId: req.params.studyId,
    label: label || `${study.parameterName} = ${parameterValue}`,
    parameterValue: parseFloat(parameterValue),
    status: outputs ? 'converged' : 'queued',
    solver: study.solver || 'simpleFoam',
    meshCells: meshCells || 80000,
    iterations: outputs ? Math.floor(Math.random() * 3000) + 1500 : 0,
    residual: outputs ? parseFloat((Math.random() * 9e-6 + 1e-6).toExponential(2)) : null,
    wallTime: outputs ? Math.round(30 + Math.random() * 60) : null,
    outputs: outputs || {},
    notes: notes || '',
    convergenceHistory: [],
    createdAt: new Date().toISOString()
  };

  store.runs.push(run);
  res.status(201).json(run);
});

// PATCH update a run
router.patch('/:runId', (req, res) => {
  const idx = store.runs.findIndex(r => r.id === req.params.runId && r.studyId === req.params.studyId);
  if (idx === -1) return res.status(404).json({ error: 'Run not found' });
  store.runs[idx] = { ...store.runs[idx], ...req.body };
  res.json(store.runs[idx]);
});

// DELETE run
router.delete('/:runId', (req, res) => {
  const idx = store.runs.findIndex(r => r.id === req.params.runId && r.studyId === req.params.studyId);
  if (idx === -1) return res.status(404).json({ error: 'Run not found' });
  store.runs.splice(idx, 1);
  res.json({ message: 'Deleted' });
});

module.exports = router;