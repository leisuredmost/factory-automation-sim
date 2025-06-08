// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, 'public')));

// In-memory log (simulate DB)
let robotLogs = [];

// API: log robot task
app.post('/api/log', (req, res) => {
  const { robotId, task } = req.body;
  const entry = {
    time: new Date().toISOString(),
    robotId,
    task
  };
  robotLogs.push(entry);
  console.log(`[LOG] ${entry.time} - ${robotId}: ${task}`);
  res.json({ success: true });
});

// API: get logs
app.get('/api/logs', (req, res) => {
  res.json(robotLogs);
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
