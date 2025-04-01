const express = require("express");
const router = express.Router();
const Candidate = require("../models/Candidate");

// Get Candidates
router.get("/candidates", async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.json(candidates);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add Candidate
router.post("/candidate", async (req, res) => {
    const { name, symbol } = req.body;

    if (!name || !symbol) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        const newCandidate = new Candidate({ name, symbol, votes: 0 });
        await newCandidate.save();
        res.status(201).json(newCandidate);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete Candidate
router.delete("/candidate/:id", async (req, res) => {
    try {
        await Candidate.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Candidate deleted." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
