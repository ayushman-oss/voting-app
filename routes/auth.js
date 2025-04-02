const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// ✅ Register User
router.post("/register", async (req, res) => {
  console.log("Register endpoint hit");
  const { username, password, role, aadharNo, dob } = req.body;

  if (!username || !password || !role || !aadharNo || !dob) {
      return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
      const user = new User({ username, password, role, aadharNo, dob });
      await user.save();

      res.status(201).json({ success: true, message: "User registered successfully!" });
  } catch (err) {
      console.error("Registration Error:", err);
      res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// ✅ Login User
router.post("/login", async (req, res) => {
  console.log("Login endpoint hit");
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
    //req.session.user = user; 
    res.json({ success: true, userId: user.username, role });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error!" });
  }

});

router.post("/updateSession", async (req, res) => {
  console.log("UpdateSession endpoint hit");
  const { aadharNo, sessionId } = req.body;

  if (typeof sessionId !== 'string' || sessionId.length !== 36) {
    return res.status(400).json({ success: false, message: "Invalid session ID" });
  }

  try {
      const user = await User.findOne({ aadharNo });
      if (!user) {
          return res.json({ success: false, message: "User not found!" });
      }

      user.uid = sessionId;
      await user.save();
      res.json({ success: true, message: "Session ID updated successfully!" });
  } catch (error) {
      console.error("Error updating session ID:", error);
      res.status(500).json({ success: false, message: "Server error!" });
  }
});

router.post("/logout", (req, res) => {
  console.log("Logout endpoint hit");
  req.session.destroy(() => {
      res.json({ success: true, message: "Logout successful" });
  });
});

module.exports = router;
