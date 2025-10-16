const mongoose = require("mongoose");
const Conversation = require("./src/models/Conversation.ts");

async function checkConversation() {
  try {
    await mongoose.connect("mongodb://localhost:27017/rentamigo");
    console.log("Connected to MongoDB");

    const conv = await Conversation.findById("680f28b8a45456aa4909a19a");
    console.log("Conversation document:", JSON.stringify(conv, null, 2));

    // Check if participants are properly stored
    if (conv && conv.participants) {
      console.log("Number of participants:", conv.participants.length);
      console.log("Participants:", conv.participants);
    }

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error:", error);
  }
}

checkConversation();
