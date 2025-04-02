require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const adminRoutes = require("./admin");
const voterRoutes = require("./voter");
const verifyRoutes = require("./verify");
const authRoutes = require("./auth");
const voted = require("./voted");

const app = express();

app.use(cors());
app.use(bodyParser.json({limit:"10mb"}));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(express.static("public"));


const isAuthenticated = (req, res, next) => {
  // In a serverless environment, we can't rely on sessions.
  // Authentication would typically be handled with JWT or API keys.
  // For this example, we'll bypass authentication.
  next();
};

app.use("/verify", verifyRoutes);
app.use("/admin", isAuthenticated, adminRoutes);
app.use("/voter", isAuthenticated, voterRoutes);
app.use("/auth", authRoutes);
app.use("/voted",voted);

mongoose.connect(process.env.MONGO_URI, {})
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

module.exports = app;