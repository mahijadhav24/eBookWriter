const User = require('../models/User');

// Mongoose-only user service. Returns a consistent shape where possible.
async function findUserByEmail(email) {
  const user = await User.findOne({ email }).lean();
  if (!user) return null;
  if (user._id) user.id = user._id.toString();
  return user;
}

async function findUserById(id) {
  const user = await User.findById(id).select('-password').lean();
  if (!user) return null;
  if (user._id) user.id = user._id.toString();
  return user;
}

async function createUser({ name, email, passwordHash }) {
  const user = new User({ name, email, password: passwordHash });
  await user.save();
  return { id: user._id.toString(), name: user.name, email: user.email };
}

module.exports = { findUserByEmail, findUserById, createUser };
