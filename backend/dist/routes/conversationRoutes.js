"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server/src/routes/conversations.ts
const express_1 = require("express");
const Conversation_1 = __importDefault(require("../models/Conversation"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// List all conversations involving current user
router.get("/", authMiddleware_1.protect, async (req, res) => {
    console.log("we are inside fetching conversation routes", req.query);
    const userId = req.user.id;
    // First, find all conversations where the current user is a participant
    const convos = await Conversation_1.default.find({
        participants: userId,
    }).sort({ updatedAt: -1 });
    console.log("Number of conversations found:", convos.length);
    // Import both User and Employee models
    const User = require("../models/signup").default;
    const Employee = require("../models/employee").default;
    // Then, manually populate the participants for each conversation
    const populatedConvos = await Promise.all(convos.map(async (conv) => {
        // Log the raw participants array before population
        console.log(`Conversation ${conv._id} - Raw participants:`, conv.participants);
        // Create a new object with the conversation data
        const convObj = conv.toObject();
        // Populate the participants manually
        const populatedParticipants = await Promise.all(conv.participants.map(async (participantId) => {
            try {
                // First try to find the participant as a user
                let participant = await User.findById(participantId).select("username");
                // If not found as a user, try to find as an employee
                if (!participant) {
                    participant = await Employee.findById(participantId).select("username name");
                    // If employee has a name field but no username, use name as username
                    if (participant && participant.name && !participant.username) {
                        participant.username = participant.name;
                    }
                }
                console.log(`Participant lookup for ${participantId}:`, participant ? "Found" : "Not found");
                return participant;
            }
            catch (error) {
                console.error(`Error looking up participant ${participantId}:`, error);
                return null;
            }
        }));
        // Filter out null participants
        const validParticipants = populatedParticipants.filter((p) => p !== null);
        console.log(`Conversation ${conv._id} - Valid participants:`, validParticipants);
        // Replace the participants array with the populated one
        convObj.participants = validParticipants;
        return convObj;
    }));
    res.json({ conversations: populatedConvos });
});
// GET /api/conversation/employee-status
// Returns status of each employee's conversation
router.get("/employee-status", async (req, res) => {
    try {
        const conversations = await Conversation_1.default.find({});
        // Create a mapping of employeeId to their latest status
        const statusMap = {};
        conversations.forEach((conv) => {
            // Assuming the second participant is the employee
            const employeeId = conv.participants[1]?.toString();
            const status = conv.status || "pending";
            if (employeeId) {
                // Prefer "active" over "pending" or "resolved"
                if (!statusMap[employeeId] || status === "active") {
                    statusMap[employeeId] = status;
                }
            }
        });
        // Convert to an array of { employeeId, status }
        const result = Object.entries(statusMap).map(([employeeId, status]) => ({
            employeeId,
            status,
        }));
        res.json(result);
    }
    catch (error) {
        console.error("Error fetching employee statuses:", error);
        res.status(500).json({ message: "Server error" });
    }
});
// Update conversation status
// PUT /api/conversation/:id/status
router.put("/:id/status", authMiddleware_1.protect, async (req, res) => {
    console.log("HIT: PUT /:id/status", req.params.id, req.body);
    const { id } = req.params;
    const { status } = req.body;
    if (!["pending", "active", "resolved"].includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
    }
    try {
        const updateFields = { status };
        // If marking as resolved, set lastResolvedAt to current time
        if (status === "resolved") {
            updateFields.lastResolvedAt = new Date();
        }
        else {
            updateFields.lastResolvedAt = null;
        }
        const updatedConversation = await Conversation_1.default.findByIdAndUpdate(id, updateFields, { new: true });
        if (!updatedConversation) {
            return res.status(404).json({ message: "Conversation not found" });
        }
        res.status(200).json({
            message: "Status updated",
            conversation: updatedConversation,
        });
    }
    catch (error) {
        console.error("Status update error:", error);
        res.status(500).json({ message: "Server error", error });
    }
});
exports.default = router;
