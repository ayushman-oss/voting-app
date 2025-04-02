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



// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(express.static("public"));

// Authentication middleware
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.redirect("/scan.html");
  }
};

// Routes
app.use("/api/verify", verifyRoutes);
app.use("/api/admin", isAuthenticated, adminRoutes);
app.use("/api/voter", isAuthenticated, voterRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/voted", voted);

app.get("/", (req, res) => {
  res.sendFile("scan.html", { root: __dirname + "/public" });
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {})
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Export handler for Vercel
module.exports = app;
