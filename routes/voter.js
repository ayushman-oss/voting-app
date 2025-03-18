const express = require("express");
const router = express.Router();
const Candidate = require("../models/Candidate");
const User = require('../models/User');

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

// ✅ Increment vote count
router.post("/vote/:id", async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    try {

        if (!userId) {
            console.log("No user ID provided");
            return res.status(401).json({ error: "Unauthorized. Please log in." });
        }
        
        const user = await User.findById(userId);
       

        if (!user) {
            console.log("no user found 2nd");
            return res.status(404).json({ error: "User not found." });
        }


        if (user.voted) {
            console.log("user found voted");
            return res.status(403).json({ error: "You have already voted." });
        }


        const candidate = await Candidate.findById(id);
        if (!candidate) {
            return res.status(404).json({ error: "Candidate not found." });
        }

        
        candidate.votes += 1;
        await candidate.save();

        user.voted = true; 
        await user.save();

        res.json({ message: `Vote recorded for ${candidate.name}`, votes: candidate.votes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to record vote" });
    }
});

module.exports = router;
