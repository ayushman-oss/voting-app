const express = require("express");
const router = express.Router();
const Candidate = require("../models/Candidate");
const User = require('../models/User');
const mongoose = require('mongoose'); 
const { ObjectId } = mongoose.Types;

// ✅ Fetch all candidates
router.get("/candidates", async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.json(candidates);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch candidates" });
    }
});

router.post("/verify", async (req, res) => {
    const { uid } = req.body;

    try {
        if (!uid) {
            console.log("No UID provided");
            return res.status(401).json({ success: false, message: "Unauthorized. Please log in." });
        }

        // Find the user by UID
        const user = await User.findOne({ uid });
        if (!user) {
            console.log("User not found with provided UID");
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // Check if the user has already voted
        if (user.voted) {
            console.log("User has already voted");
            return res.status(403).json({ success: false, message: "You have already voted." });
        }

        res.json({ success: true, message: "User eligible to vote." });
    } catch (error) {
        console.error("Error verifying voter eligibility:", error);
        res.status(500).json({ success: false, message: "Server error." });
    }
});
// ✅ Increment vote count
router.post("/vote/:id", async (req, res) => {
    const { id } = req.params;

    try {
        // Find the candidate by ID
        const candidate = await Candidate.findById(id);
        if (!candidate) {
            return res.status(404).json({ success: false, message: "Candidate not found." });
        }

        // Increment vote count
        candidate.votes += 1;
        await candidate.save();

        res.json({ success: true, message: `Vote recorded for ${candidate.name}`, votes: candidate.votes });
    } catch (error) {
        console.error("Error recording vote:", error);
        res.status(500).json({ success: false, message: "Failed to record vote" });
    }
});

router.post("/updateVoted", async (req, res) => {
    const { uid } = req.body;

    try {
        if (!uid) {
            console.log("No UID provided");
            return res.status(400).json({ success: false, message: "Invalid UID" });
        }

        // Find the user by UID
        const user = await User.findOne({ uid });
        if (!user) {
            console.log("User not found for UID:", uid);
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // Update the voted status to true
        user.voted = true;
        await user.save();

        res.json({ success: true, message: "Voted status updated successfully!" });
    } catch (error) {
        console.error("Error updating voted status:", error);
        res.status(500).json({ success: false, message: "Server error!" });
    }
});
module.exports = router;
