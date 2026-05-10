const { v4: uuidv4 } = require('uuid');

const seedStudyId = 'seed-study-001';

const store = {
  studies: [
    {
      id: seedStudyId,
      name: 'NACA 0012 Reynolds Sweep',
      description: 'Drag and lift coefficient vs Reynolds number for NACA 0012 airfoil at 5° AoA',
      solver: 'OpenFOAM',
      fluid: 'Air',
      geometry: 'NACA 0012 Airfoil',
      parameterName: 'Reynolds Number',
      parameterUnit: '',
      outputMetrics: ['Cd', 'Cl', 'Cl/Cd'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],
  runs: [
    { id: uuidv4(), studyId: seedStudyId, label: 'Re = 1e+5', parameterValue: 1e5, status: 'converged', solver: 'simpleFoam', meshCells: 85000, iterations: 2800, residual: 8.2e-6, wallTime: 45, outputs: { Cd: 0.0142, Cl: 0.485, 'Cl/Cd': 34.15 }, notes: '', convergenceHistory: [], createdAt: new Date().toISOString() },
    { id: uuidv4(), studyId: seedStudyId, label: 'Re = 2e+5', parameterValue: 2e5, status: 'converged', solver: 'simpleFoam', meshCells: 90000, iterations: 3100, residual: 4.1e-6, wallTime: 63, outputs: { Cd: 0.0118, Cl: 0.492, 'Cl/Cd': 41.69 }, notes: '', convergenceHistory: [], createdAt: new Date().toISOString() },
    { id: uuidv4(), studyId: seedStudyId, label: 'Re = 5e+5', parameterValue: 5e5, status: 'converged', solver: 'simpleFoam', meshCells: 95000, iterations: 3600, residual: 2.9e-6, wallTime: 81, outputs: { Cd: 0.0089, Cl: 0.503, 'Cl/Cd': 56.52 }, notes: '', convergenceHistory: [], createdAt: new Date().toISOString() },
    { id: uuidv4(), studyId: seedStudyId, label: 'Re = 1e+6', parameterValue: 1e6, status: 'converged', solver: 'simpleFoam', meshCells: 100000, iterations: 4200, residual: 1.7e-6, wallTime: 99, outputs: { Cd: 0.0071, Cl: 0.511, 'Cl/Cd': 71.97 }, notes: '', convergenceHistory: [], createdAt: new Date().toISOString() },
    { id: uuidv4(), studyId: seedStudyId, label: 'Re = 2e+6', parameterValue: 2e6, status: 'converged', solver: 'simpleFoam', meshCells: 105000, iterations: 4800, residual: 9.3e-7, wallTime: 117, outputs: { Cd: 0.0063, Cl: 0.518, 'Cl/Cd': 82.22 }, notes: '', convergenceHistory: [], createdAt: new Date().toISOString() },
    { id: uuidv4(), studyId: seedStudyId, label: 'Re = 5e+6', parameterValue: 5e6, status: 'running',   solver: 'simpleFoam', meshCells: 110000, iterations: 2100, residual: 3.4e-4, wallTime: null, outputs: {}, notes: '', convergenceHistory: [], createdAt: new Date().toISOString() },
  ]
};

module.exports = store;