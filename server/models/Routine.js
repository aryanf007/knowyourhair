// server/models/Routine.js
const mongoose = require('mongoose');

const routineSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  porosity: String,
  steps: [String], // e.g. ["Cleanse with sulfate-free shampoo", "Deep condition weekly"]
}, { timestamps: true });

module.exports = mongoose.model('Routine', routineSchema);