const Candidate = require('../models/Candidate');
module.exports = async (req, res) => {
  if (req.method === 'GET' && req.url === '/admin/candidates') {
    try {
      const candidates = await Candidate.find();
      res.status(200).json(candidates);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else if (req.method === 'POST' && req.url === '/admin/candidate') {
    const { name, symbol } = req.body;

    if (!name || !symbol) {
      return res.status(400).json({ error: "All fields are required." });
    }

    try {
      const newCandidate = new Candidate({ name, symbol, votes: 0 });
      await newCandidate.save();
      res.status(201).json(newCandidate);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else if (req.method === 'DELETE' && req.url.startsWith('/admin/candidate/')) {
    const id = req.url.split('/')[3];

    try {
      await Candidate.findByIdAndDelete(id);
      res.status(200).json({ message: "Candidate deleted." });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).end();
  }
};

