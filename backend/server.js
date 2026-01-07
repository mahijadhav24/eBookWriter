const path = require('path');
const dotenv = require('dotenv');

// Load .env — supports custom path via ENV_PATH env var
const dotenvPath = process.env.ENV_PATH || path.join(__dirname, '.env');
const dotenvResult = dotenv.config({ path: dotenvPath });

const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 4000;

// Load required config values (supports alternate names)
const MONGO_URI = process.env.MONGO_URI || process.env.MongoURI || '';
const JWT_SECRET = process.env.JWT_SECRET || process.env.JWTSECRET || '';


// Basic middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

async function start() {
  try {
    await connectDB(MONGO_URI);
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err.message || err);
    process.exit(1);
  }
}

start();
