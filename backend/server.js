const path = require('path');
const dotenv = require('dotenv');

// Load .env — supports custom path via ENV_PATH env var
const dotenvPath = process.env.ENV_PATH || path.join(__dirname, '.env');
const dotenvResult = dotenv.config({ path: dotenvPath });
if (dotenvResult.error) {
  console.warn(`[dotenv] no .env loaded from ${dotenvPath} — ${dotenvResult.error.message || 'file not found'}`);
} else {
  console.log(`[dotenv] loaded env from ${dotenvPath}`);
}

const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 4000;

// Load required config values (supports alternate names)
const MONGO_URI = process.env.MONGO_URI || process.env.MongoURI || '';
const JWT_SECRET = process.env.JWT_SECRET || process.env.JWTSECRET || '';

if (!MONGO_URI) {
  console.error('Failed to start server: MONGO_URI is not set. Please add MONGO_URI to your .env or set it in the environment. See .env.example for format.');
  process.exit(1);
}

// Diagnostic: extract and log the host portion (do NOT log credentials)
(function logMongoHost() {
  try {
    const hostMatch = MONGO_URI.match(/@([^/]+)(?:\/.+)?$/);
    const host = hostMatch ? hostMatch[1] : '<unknown>';
    const hasEncodedAt = MONGO_URI.includes('%40');
    console.log('[diagnostic] Mongo host:', host);
    console.log('[diagnostic] password URL-encoded (looks for %40):', hasEncodedAt);
  } catch (e) {
    console.log('[diagnostic] failed to parse MONGO_URI');
  }
})();

if (!JWT_SECRET) {
  console.warn('Warning: JWT_SECRET is not set. Using default insecure secret. Set JWT_SECRET in .env for production.');
} 

// Basic middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Auth server is running' });
});

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
