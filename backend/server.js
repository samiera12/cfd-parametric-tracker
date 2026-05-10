const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const studiesRouter = require('./routes/studies');
const runsRouter = require('./routes/runs');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, '../frontend/public')));

// API routes
app.use('/api/studies', studiesRouter);
app.use('/api/studies/:studyId/runs', runsRouter);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// SPA fallback
app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
});

app.listen(3000, () => console.log('Running on http://localhost:3000'));