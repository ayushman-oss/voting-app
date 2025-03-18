const mongoose = require('mongoose');

const voterSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dob: { type: Date, required: true },
  aadhaar: { type: String, required: true, unique: true },
});

const Voter = mongoose.model('Voter', voterSchema);

module.exports = Voter;
