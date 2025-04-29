// server/src/routes/conversations.ts
import { Router } from "express";
import Conversation from "../models/Conversation";
import { protect } from "../middleware/authMiddleware";
const router = Router();

// List all conversations involving current user
router.get("/", protect, async (req, res) => {
  console.log("we are inside fetching conversation routes", req.query);
  const userId = req.user.id;

  // First, find all conversations where the current user is a participant
  const convos = await Conversation.find({
    participants: userId,
  }).sort({ updatedAt: -1 });

  console.log("Number of conversations found:", convos.length);

  // Import both User and Employee models
  const User = require("../models/signup").default;
  const Employee = require("../models/employee").default;

  // Then, manually populate the participants for each conversation
  const populatedConvos = await Promise.all(
    convos.map(async (conv) => {
      // Log the raw participants array before population
      console.log(
        `Conversation ${conv._id} - Raw participants:`,
        conv.participants
      );

      // Create a new object with the conversation data
      const convObj = conv.toObject();

      // Populate the participants manually
      const populatedParticipants = await Promise.all(
        conv.participants.map(async (participantId) => {
          try {
            // First try to find the participant as a user
            let participant = await User.findById(participantId).select(
              "username"
            );

            // If not found as a user, try to find as an employee
            if (!participant) {
              participant = await Employee.findById(participantId).select(
                "username name"
              );

              // If employee has a name field but no username, use name as username
              if (participant && participant.name && !participant.username) {
                participant.username = participant.name;
              }
            }

            console.log(
              `Participant lookup for ${participantId}:`,
              participant ? "Found" : "Not found"
            );
            return participant;
          } catch (error) {
            console.error(
              `Error looking up participant ${participantId}:`,
              error
            );
            return null;
          }
        })
      );

      // Filter out null participants
      const validParticipants = populatedParticipants.filter((p) => p !== null);
      console.log(
        `Conversation ${conv._id} - Valid participants:`,
        validParticipants
      );

      // Replace the participants array with the populated one
      convObj.participants = validParticipants;

      return convObj;
    })
  );

  res.json({ conversations: populatedConvos });
});

export default router;
