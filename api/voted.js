const User = require("../models/User");

module.exports = async (req, res) => {
  if (req.method === "POST" && req.url === "/voted") {
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
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};
