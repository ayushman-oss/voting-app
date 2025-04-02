const Candidate = require("../models/Candidate");
const User = require('../models/User');
const mongoose = require('mongoose'); 
const { ObjectId } = mongoose.Types;

module.exports = async (req, res) => {
    const { method, url } = req;

    // ✅ Fetch all candidates
    if (method === 'GET' && url === '/candidates') {
        try {
            const candidates = await Candidate.find();
            return res.json(candidates);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Failed to fetch candidates" });
        }
    }

    if (method === 'POST' && url === '/verify') {
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

            return res.json({ success: true, message: "User eligible to vote." });
        } catch (error) {
            console.error("Error verifying voter eligibility:", error);
            return res.status(500).json({ success: false, message: "Server error." });
        }
    }

    // ✅ Increment vote count
    if (method === 'POST' && url.startsWith('/vote/')) {
        const id = url.split('/').pop();

        try {
            // Find the candidate by ID
            const candidate = await Candidate.findById(id);
            if (!candidate) {
                return res.status(404).json({ success: false, message: "Candidate not found." });
            }

            // Increment vote count
            candidate.votes += 1;
            await candidate.save();

            return res.json({ success: true, message: `Vote recorded for ${candidate.name}`, votes: candidate.votes });
        } catch (error) {
            console.error("Error recording vote:", error);
            return res.status(500).json({ success: false, message: "Failed to record vote" });
        }
    }

    if (method === 'POST' && url === '/updateVoted') {
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

            return res.json({ success: true, message: "Voted status updated successfully!" });
        } catch (error) {
            console.error("Error updating voted status:", error);
            return res.status(500).json({ success: false, message: "Server error!" });
        }
    }
    return res.status(405).end(); // Method Not Allowed
};
