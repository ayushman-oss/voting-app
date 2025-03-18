const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    votes: { type: Number, default: 0 }, // Track number of votes
    symbol: { type: String, required: true }
});

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;
