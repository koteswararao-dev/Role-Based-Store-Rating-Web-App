const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const userRoutes = require('./routes/user.routes');
const ownerRoutes = require('./routes/owner.routes');

const app = express();

// Configure CORS for production
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://store-rating-web-app-2026.netlify.app',
    /\.netlify\.app$/
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/owner', ownerRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Roxiler Store Rating API' });
});

module.exports = app;
