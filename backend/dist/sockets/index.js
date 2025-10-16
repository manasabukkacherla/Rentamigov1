"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = socketHandler;
const Notification_1 = __importDefault(require("../models/Notification"));
const Message_1 = __importDefault(require("../models/Message"));
const Conversation_1 = __importDefault(require("../models/Conversation"));
const mongoose_1 = __importDefault(require("mongoose"));
/* ---------- presence map ---------- */
const onlineUsers = new Map(); // userId → socket.id
/* ============================================================================
   MAIN HANDLER
============================================================================ */
function socketHandler(io) {
    io.on("connection", (socket) => {
        console.log(`Client connected: ${socket.id}`);
        /* ──────────────────────────────────────────────────────────────
           1. USER REGISTRATION  (client must emit: socket.emit("register", userId))
        ────────────────────────────────────────────────────────────── */
        socket.on("register", (userId) => {
            onlineUsers.set(userId, socket.id);
            console.log(`User ${userId} registered with socket ${socket.id}`);
            /*  👇 broadcast presence to EVERYONE (including sender) */
            io.emit("userStatus", { userId, isOnline: true });
        });
        /* ──────────────────────────────────────────────────────────────
           2. SINGLE-SHOT STATUS QUERY   (client: socket.emit("getUserStatus", id, cb))
        ────────────────────────────────────────────────────────────── */
        socket.on("getUserStatus", (otherId, cb) => {
            cb(onlineUsers.has(otherId));
        });
        /* ──────────────────────────────────────────────────────────────
           3. ROOMS
        ────────────────────────────────────────────────────────────── */
        socket.on("joinRoom", (roomId) => {
            socket.join(roomId);
            console.log(`Socket ${socket.id} joined room ${roomId}`);
        });
        socket.on("leaveRoom", (roomId) => {
            socket.leave(roomId);
            console.log(`Socket ${socket.id} left room ${roomId}`);
        });
        /* ──────────────────────────────────────────────────────────────
           4. NOTIFICATIONS
        ────────────────────────────────────────────────────────────── */
        socket.on("getNotifications", async () => {
            try {
                const notifications = await Notification_1.default.find().sort({ createdAt: -1 });
                socket.emit("loadNotifications", notifications);
            }
            catch (err) {
                console.error(err);
            }
        });
        socket.on("sendNotification", async (data) => {
            try {
                const notification = new Notification_1.default({
                    receiverId: data.receiverId,
                    type: data.type,
                    message: data.message,
                });
                await notification.save();
                const receiverSocketId = onlineUsers.get(data.receiverId);
                if (receiverSocketId) {
                    io.to(receiverSocketId).emit("notification", {
                        ...data,
                        id: notification._id,
                    });
                    console.log(`Notification sent to user ${data.receiverId} at socket ${receiverSocketId}`);
                }
            }
            catch (error) {
                console.error("Error storing notification:", error);
                socket.emit("error", "Failed to store notification");
            }
        });
        socket.on("markAsRead", async (id, cb) => {
            try {
                const updated = await Notification_1.default.findByIdAndUpdate(id, { read: true }, { new: true });
                cb({ status: "success", notification: updated });
                io.emit("notificationUpdated", updated);
            }
            catch (error) {
                console.error("Error marking notification as read:", error);
                cb({ status: "error", error: error.message });
            }
        });
        /* ──────────────────────────────────────────────────────────────
           5. CHAT MESSAGES
        ────────────────────────────────────────────────────────────── */
        socket.on("chatMessage", async (data) => {
            try {
                /* store message */
                const message = new Message_1.default({
                    senderId: data.senderId,
                    receiverId: data.receiverId,
                    roomId: data.roomId,
                    text: data.text,
                });
                await message.save();
                /* upsert conversation */
                let conversation = await Conversation_1.default.findOne({ roomId: data.roomId });
                const senderObj = new mongoose_1.default.Types.ObjectId(data.senderId);
                const receiverObj = new mongoose_1.default.Types.ObjectId(data.receiverId);
                if (!conversation) {
                    conversation = new Conversation_1.default({
                        roomId: data.roomId,
                        participants: [senderObj, receiverObj],
                        lastMessage: data.text,
                    });
                }
                else {
                    conversation.lastMessage = data.text;
                    if (!conversation.participants.some(p => p.equals(senderObj)))
                        conversation.participants.push(senderObj);
                    if (!conversation.participants.some(p => p.equals(receiverObj)))
                        conversation.participants.push(receiverObj);
                }
                await conversation.save();
                /* broadcast message */
                io.to(data.roomId).emit("newMessage", {
                    ...data,
                    _id: message._id,
                    createdAt: message.createdAt,
                });
                /* send notification to receiver if online */
                const receiverSocketId = onlineUsers.get(data.receiverId);
                if (receiverSocketId && receiverSocketId !== socket.id) {
                    const notif = new Notification_1.default({
                        receiverId: data.receiverId,
                        type: "chat",
                        message: `New message from ${data.senderId}`,
                    });
                    await notif.save();
                    io.to(receiverSocketId).emit("notification", {
                        receiverId: data.receiverId,
                        type: "chat",
                        message: `New message from ${data.senderId}`,
                        id: notif._id,
                    });
                }
            }
            catch (err) {
                console.error("Error storing message:", err);
                socket.emit("error", "Failed to store message");
            }
        });
        /* ──────────────────────────────────────────────────────────────
           6. DISCONNECT
        ────────────────────────────────────────────────────────────── */
        socket.on("disconnect", (reason) => {
            /* find which user owned this socket and remove */
            for (const [userId, sId] of onlineUsers) {
                if (sId === socket.id) {
                    onlineUsers.delete(userId);
                    console.log(`User ${userId} disconnected and removed from online users. (${reason})`);
                    /* 👇 broadcast presence OFFLINE */
                    io.emit("userStatus", { userId, isOnline: false });
                    break;
                }
            }
        });
    });
}
