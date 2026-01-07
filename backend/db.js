const mongoose = require('mongoose');

async function connectDB(uri) {
  if (!uri) {
    throw new Error('MONGO_URI is not set. Set MONGO_URI in your environment to connect to MongoDB (see .env.example).');
  }
  try {
    // Mongoose 6+ enables the modern parsers/options by default; pass only uri
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err.message || err);
    throw err;
  }
}

module.exports = connectDB;
