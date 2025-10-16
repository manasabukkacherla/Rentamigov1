"use strict";
// server/src/routes/chat.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Message_1 = __importDefault(require("../models/Message"));
const Conversation_1 = __importDefault(require("../models/Conversation"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const mongoose_1 = __importDefault(require("mongoose"));
const router = (0, express_1.Router)();
// GET /api/chat/history/:roomId
// This endpoint retrieves the chat history for a given room.
router.get("/history/:roomId", async (req, res) => {
    const { roomId } = req.params;
    try {
        // Find all messages that match the roomId, sorted by creation time (ascending).
        const messages = await Message_1.default.find({ roomId }).sort({
            createdAt: 1,
        });
        res.status(200).json({ messages });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
// Create a message (protected route)
router.post("/history/:roomId", authMiddleware_1.protect, async (req, res) => {
    try {
        console.log("message body", req.body);
        const { text, senderId, receiverId } = req.body;
        if (!text || !senderId || !receiverId) {
            return res
                .status(400)
                .json({ message: "Content and userId are required." });
        }
        // 1. Save the message
        const message = new Message_1.default({ text, senderId, receiverId });
        await message.save();
        // 2. Prepare roomId
        const roomId = `${senderId}_${receiverId}`;
        let conversation = await Conversation_1.default.findOne({ roomId });
        const senderIdObj = new mongoose_1.default.Types.ObjectId(senderId);
        const receiverIdObj = new mongoose_1.default.Types.ObjectId(receiverId);
        if (conversation) {
            // 3. Update lastMessage
            conversation.lastMessage = text;
            // Ensure both participants are in the array
            if (!conversation.participants.some((p) => p.equals(senderIdObj))) {
                conversation.participants.push(senderIdObj);
            }
            if (!conversation.participants.some((p) => p.equals(receiverIdObj))) {
                conversation.participants.push(receiverIdObj);
            }
            // 4. Revert to "pending" if a new message comes after resolution
            if (conversation.status === "resolved" &&
                (!conversation.lastResolvedAt ||
                    new Date(message.createdAt) > new Date(conversation.lastResolvedAt))) {
                conversation.status = "pending";
                conversation.lastResolvedAt = null;
                console.log("Conversation status auto-reverted to 'pending'");
            }
            await conversation.save();
        }
        else {
            // 5. Create new conversation
            conversation = new Conversation_1.default({
                roomId,
                participants: [senderIdObj, receiverIdObj],
                lastMessage: text,
                status: "pending",
            });
            await conversation.save();
        }
        console.log("Conversation after update:", JSON.stringify(conversation, null, 2));
        res.status(201).json({
            success: "Message and conversation updated successfully",
            message,
            conversation,
        });
    }
    catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ message: "Server error", error });
    }
});
// GET /api/messages/unread-count
router.get("/unread-count", authMiddleware_1.protect, async (req, res) => {
    try {
        const userId = req.user.id; // set by authMiddleware
        // Count messages where recipient is the current user and read flag is false
        const count = await Message_1.default.countDocuments({ to: userId, read: false });
        return res.json({ count });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
});
exports.default = router;
