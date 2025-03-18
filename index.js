const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve frontend files

let votes = { count: 0 };

// Login API
app.post('/login', (req, res) => {
    const { uid, password } = req.body;
    if (uid === 'admin' && password === 'admin123') {
        res.json({ role: 'admin' });
    } else if (uid && password) {
        res.json({ role: 'user' });
    } else {
        res.status(401).json({ error: 'Invalid Credentials' });
    }
});

// Vote API (increments count, keeps anonymous)
app.post('/vote', (req, res) => {
    votes.count++;
    fs.writeFileSync('votes.json', JSON.stringify(votes));
    res.json({ message: 'Vote submitted successfully!' });
});

// Get Vote Count API (Admin only)
app.get('/count', (req, res) => {
    res.json({ votes: votes.count });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
