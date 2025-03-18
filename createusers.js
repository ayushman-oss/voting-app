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
      { username: "admin", password: "1234", role: "admin" , voted:false },
      { username: "user1", password: "password", role: "voter" , voted:false },
      { username: "user2", password: "password2", role: "voter" ,voted:false  },
      { username: "user3", password: "password3", role: "voter", voted:false },
      { username: "user4", password: "password4", role: "voter" ,voted:false },       

    ]);
    console.log("✅ Users seeded successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding users:", error);
    mongoose.connection.close();
  }
};

seedUsers();
