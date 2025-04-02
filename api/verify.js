const Voter = require("../models/Voter");

module.exports = async (req, res) => {
  if (req.method === 'POST' && req.url === '/') {
    const { userId, dob, aadhaar } = req.body;

    try {
      const dobFormatted = new Date(dob);
      const voter = await Voter.findOne({ userId, dob: dobFormatted, aadhaar });

      if (voter) {
        return res.json({ success: true, message: "Verification successful!" });
      } else {
        return res.status(401).json({ success: false, message: "Verification failed!" });
      }
    } catch (error) {
      console.error("Error during verification:", error);
      return res.status(500).json({ success: false, message: "Internal server error." });
    }
  } else {
    return res.status(405).end(); // Method Not Allowed
  }
};
