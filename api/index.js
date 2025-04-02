require("dotenv").config();
const mongoose = require("mongoose");

const adminHandler = require("./admin");
const voterHandler = require("./voter");
const verifyHandler = require("./verify");
const authHandler = require("./auth");
const votedHandler = require("./voted");

mongoose.connect(process.env.MONGO_URI, {})
    .then(() => console.log("✅ Connected to MongoDB Atlas"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://voting-i27hehsy1-aykens-projects.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  console.log("Incoming request URL:", req.url); // Log the request URL
  const { url, method } = req;
  if (method === 'POST' && url === '/voter/verify') {
      await voterHandler(req, res);
  }
   else if (url.startsWith("/admin")) {
      await adminHandler(req, res);
   } else if (url.startsWith("/voter")) {
      await voterHandler(req, res);
   } else if (url.startsWith("/verify")) {
      await verifyHandler(req, res);
  } else if (url.startsWith("/auth")) {
    await authHandler(req, res);
  } else if (url.startsWith("/voted")) {
    await votedHandler(req, res);
  } else {
    res.status(404).json({ error: "Not Found" });
  }
};