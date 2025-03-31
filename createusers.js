require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedUsers = async () => {
  try {
    await User.deleteMany(); 
    await User.insertMany([
    ]);
    console.log("✅ Users seeded successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding users:", error);
    mongoose.connection.close();
  }
};

seedUsers();
