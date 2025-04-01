require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const adminRoutes = require("./routes/admin");
const voterRoutes = require("./routes/voter");
const verifyRoutes = require("./routes/verify");
const authRoutes = require("./routes/auth");
const voted = require("./routes/voted");

const app = express();
const PORT = process.env.PORT || 3000;

const session = require("express-session");

app.use(session({
  secret: process.env.SESSION_SECRET || "mysecret",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === "production" }
}));

app.use(cors());
app.use(bodyParser.json({limit:"10mb"}));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(express.static("public"));

const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    next(); 
  } else {
    res.redirect("/index.html"); 
  }
};

app.use("/verify", verifyRoutes);
app.use("/admin", isAuthenticated, adminRoutes);
app.use("/voter", isAuthenticated, voterRoutes);
app.use("/auth", authRoutes);
app.use("/voted", voted);

mongoose.connect(process.env.MONGODB_URI, {})
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
