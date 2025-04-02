const bcrypt = require("bcryptjs");
const User = require("../models/User");

module.exports = async (req, res) => {
  switch (req.url) {
    case "/register": {
      if (req.method === "POST") {
        const { username, password, role, aadharNo, dob } = req.body;
        if (!username || !password || !role || !aadharNo || !dob) {
          return res
            .status(400)
            .json({ success: false, message: "All fields are required" });
        }

        try {
          const user = new User({ username, password, role, aadharNo, dob });
          await user.save();

          res
            .status(201)
            .json({ success: true, message: "User registered successfully!" });
        } catch (err) {
          console.error("Registration Error:", err);
          res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        }
      } else {
        res.status(405).end(); // Method Not Allowed
      }
      break;
    }
    case "/login": {
      if (req.method === "POST") {
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
          res.json({ success: true, userId: user.username, role });
        } catch (error) {
          res.status(500).json({ success: false, message: "Server error!" });
        }
      } else {
        res.status(405).end(); // Method Not Allowed
      }
      break;
    }
    case "/updateSession": {
      if (req.method === "POST") {
        const { aadharNo, sessionId } = req.body;
        if (typeof sessionId !== "string" || sessionId.length !== 36) {
          return res
            .status(400)
            .json({ success: false, message: "Invalid session ID" });
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
      } else {
        res.status(405).end(); // Method Not Allowed
      }
      break;
    }
    default:
      res.status(404).json({ error: "Not Found" });
  }
};
