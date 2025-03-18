const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Multer setup for file uploads
const upload = multer({ dest: "uploads/" });

app.post("/login", (req, res) => {
    res.json({ success: true });
});

app.post("/verify", upload.single("photo"), (req, res) => {
    const { dob, aadhaar } = req.body;
    const photo = req.file;

    if (!dob || !aadhaar) {
        return res.json({ message: "All fields are required!" });
    }

    res.json({ message: "Voter verification successful! ✅" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
