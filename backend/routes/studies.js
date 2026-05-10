const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const store = require('../store');
console.log('store is:', store);
router.get('/', (req, res) => {
  const enriched = store.studies.map(s => ({
    ...s,
    runCount: store.runs.filter(r => r.studyId === s.id).length,
    convergedCount: store.runs.filter(r => r.studyId === s.id && r.status === 'converged').length
  }));
  res.json(enriched);
});
router.get('/:id', (req, res) => {
  const study = store.studies.find(s => s.id === req.params.id);
  if (!study) return res.status(404).json({ error: 'Study not found' });
  res.json(study);
});
router.post('/', (req, res) => {
  const { name, description, solver, fluid, geometry, parameterName, parameterUnit, outputMetrics } = req.body;
  if (!name || !parameterName) {
    return res.status(400).json({ error: 'name and parameterName are required' });
  }
  const study = {
    id: uuidv4(),
    name,
    description: description || '',
    solver: solver || 'OpenFOAM',
    fluid: fluid || 'Air',
    geometry: geometry || '',
    parameterName,
    parameterUnit: parameterUnit || '',
    outputMetrics: outputMetrics || ['Cd', 'Cl'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  store.studies.push(study);
  res.status(201).json(study);
});
router.put('/:id', (req, res) => {
  const idx = store.studies.findIndex(s => s.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Study not found' });
  store.studies[idx] = { ...store.studies[idx], ...req.body, updatedAt: new Date().toISOString() };
  res.json(store.studies[idx]);
});
router.delete('/:id', (req, res) => {
  const idx = store.studies.findIndex(s => s.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Study not found' });
  store.studies.splice(idx, 1);
  store.runs = store.runs.filter(r => r.studyId !== req.params.id);
  res.json({ message: 'Deleted' });
});
module.exports = router;