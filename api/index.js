require("dotenv").config();
const mongoose = require("mongoose");

const adminRoutes = require("./admin");
const voterRoutes = require("./voter");
const verifyRoutes = require("./verify");
const authRoutes = require("./auth");
const votedRoutes = require("./voted");

mongoose.connect(process.env.MONGO_URI, {})
    .then(() => console.log("✅ Connected to MongoDB Atlas"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

module.exports = async (req, res) => {
    const { method, url } = req;
    console.log(`Handling ${method} request to ${url}`);
    // Enable CORS for all requests
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (url.startsWith('/api/admin')) {
        await adminRoutes(req, res);
    } else if (url.startsWith('/api/voter')) {
        await voterRoutes(req, res);
    } else if (url.startsWith('/api/verify')) {
        await verifyRoutes(req, res);
    } else if (url.startsWith('/api/auth')) {
        await authRoutes(req, res);
    } else if (url.startsWith('/api/voted')) {
        await votedRoutes(req, res);
    } else {
        res.status(404).json({ error: 'Not Found' });
    }
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