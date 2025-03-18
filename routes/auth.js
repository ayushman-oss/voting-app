const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// ✅ Register User
router.post("/register", async (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, role });
        await user.save();

        res.status(201).json({ success: true, message: "User registered successfully!" });
    } catch (err) {
        console.error("Registration Error:", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// ✅ Login User
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username, password });
      if (!user) {
        return res.json({ success: false, message: "Invalid credentials!" });
      }
  
      if (user.voted) {
        return res.status(403).json({ error: "You have already voted." });
      }
  
      const role = user.role;
      req.session.user = user; 
      res.json({ success: true,userId:user.username, role });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error!" });
    }

});

router.post("/logout", (req, res) => {
    req.session.destroy(() => {
        res.json({ success: true, message: "Logout successful" });
    });
});

module.exports = router;
