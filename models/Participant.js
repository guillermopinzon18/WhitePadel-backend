// models/Participant.js
const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
  player1: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  player2: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Participant", participantSchema);