const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subscribed: { type: Boolean, default: true },
  admin: { type: Boolean, default: false },
});

module.exports = userSchema;
