const express = require("express");
const router = express.Router();
const Voter = require('../models/Voter');



router.post('/', async (req, res) => {
  const { userId, dob, aadhaar } = req.body;

  try {
    const dobFormatted = new Date(dob);
    const voter = await Voter.findOne({ userId, dob: dobFormatted, aadhaar });

    if (voter) {
      return res.json({ success: true, message: 'Verification successful!' });
    } else {
      return res.status(401).json({ success: false, message: 'Verification failed!' });
    }
  } catch (error) {
    console.error('Error during verification:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

module.exports = router;
