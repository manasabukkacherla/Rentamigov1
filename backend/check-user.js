const mongoose = require("mongoose");
const User = require("./src/models/signup").default;

async function checkUser() {
  try {
    await mongoose.connect("mongodb://localhost:27017/rentamigo");
    console.log("Connected to MongoDB");

    const userId = "67dabebe3d2a907ad68f8c4c";
    console.log(`Checking if user ${userId} exists...`);

    const user = await User.findById(userId);
    if (user) {
      console.log("User found:", JSON.stringify(user, null, 2));
    } else {
      console.log("User not found");
    }

    // Also check the first user
    const firstUserId = "67d7ee9f6cbe496b68743fe7";
    console.log(`Checking if user ${firstUserId} exists...`);

    const firstUser = await User.findById(firstUserId);
    if (firstUser) {
      console.log("First user found:", JSON.stringify(firstUser, null, 2));
    } else {
      console.log("First user not found");
    }

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error:", error);
  }
}

checkUser();
