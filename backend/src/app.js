const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/auth.routes');
const needsRoutes = require('./routes/needs.routes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '200kb' }));
app.use(compression());
app.use(morgan('tiny'));

app.get('/health', (req, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api/needs', needsRoutes);
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

module.exports = app;