const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/voted", async (req, res) => {
    try {
        const { username } = req.body;
        if (!username) {
            return res.status(400).json({ error: "Username is required" });
        }

        const user = await User.findOneAndUpdate(
            { username },
            { voted: true },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "User marked as voted", user });
    } catch (error) {
        console.error("Error updating voted status:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
