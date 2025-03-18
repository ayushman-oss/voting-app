const mongoose = require('mongoose');
const Voter = require('./models/Voter');
const User = require('./models/User'); // Assuming you have a User model

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedData = async () => {
  try {
    // Find user ID to link with voter data
    const user = await User.findOne({ username: 'user1' });

    if (user) {
      await Voter.deleteMany(); // Clear existing data

      const voters = [
        {
          userId: user._id,
          dob: new Date('2025-01-01'),
          aadhaar: '101010',
        },
        {
          userId: user._id,
          dob: new Date('2025-01-01'),
          aadhaar: '101010',
        },
      ];

      await Voter.insertMany(voters);
      console.log('✅ Voter data seeded successfully');
    } else {
      console.log('❌ User not found. Cannot link voter data.');
    }

    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    mongoose.connection.close();
  }
};

seedData();
