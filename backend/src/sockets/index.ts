import { Server, Socket } from "socket.io";
import { Document } from "mongoose";
import Notification from "../models/Notification";
import Message from "../models/Message";
import Conversation from "../models/Conversation";
import mongoose from "mongoose";

/* ---------- types ---------- */
export interface INotification extends Document {
  resourceId?: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

interface MarkAsReadResponseSuccess {
  status: "success";
  notification: INotification | null;
}
interface MarkAsReadResponseError {
  status: "error";
  error: string;
}
type MarkAsReadCallback = (
  resp: MarkAsReadResponseSuccess | MarkAsReadResponseError
) => void;

/* ---------- presence map ---------- */
const onlineUsers = new Map<string, string>(); // userId → socket.id

/* ============================================================================
   MAIN HANDLER
============================================================================ */
export default function socketHandler(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log(`Client connected: ${socket.id}`);

    /* ──────────────────────────────────────────────────────────────
       1. USER REGISTRATION  (client must emit: socket.emit("register", userId))
    ────────────────────────────────────────────────────────────── */
    socket.on("register", (userId: string) => {
      onlineUsers.set(userId, socket.id);
      console.log(`User ${userId} registered with socket ${socket.id}`);

      /*  👇 broadcast presence to EVERYONE (including sender) */
      io.emit("userStatus", { userId, isOnline: true });
    });

    /* ──────────────────────────────────────────────────────────────
       2. SINGLE-SHOT STATUS QUERY   (client: socket.emit("getUserStatus", id, cb))
    ────────────────────────────────────────────────────────────── */
    socket.on(
      "getUserStatus",
      (otherId: string, cb: (online: boolean) => void) => {
        cb(onlineUsers.has(otherId));
      }
    );

    /* ──────────────────────────────────────────────────────────────
       3. ROOMS
    ────────────────────────────────────────────────────────────── */
    socket.on("joinRoom", (roomId: string) => {
      socket.join(roomId);
      console.log(`Socket ${socket.id} joined room ${roomId}`);
    });

    socket.on("leaveRoom", (roomId: string) => {
      socket.leave(roomId);
      console.log(`Socket ${socket.id} left room ${roomId}`);
    });

    /* ──────────────────────────────────────────────────────────────
       4. NOTIFICATIONS
    ────────────────────────────────────────────────────────────── */
    socket.on("getNotifications", async () => {
      try {
        const notifications = await Notification.find().sort({ createdAt: -1 });
        socket.emit("loadNotifications", notifications);
      } catch (err) {
        console.error(err);
      }
    });

    socket.on(
      "sendNotification",
      async (data: { receiverId: string; type: string; message: string }) => {
        try {
          const notification = new Notification({
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
            console.log(
              `Notification sent to user ${data.receiverId} at socket ${receiverSocketId}`
            );
          }
        } catch (error) {
          console.error("Error storing notification:", error);
          socket.emit("error", "Failed to store notification");
        }
      }
    );

    socket.on(
      "markAsRead",
      async (id: string, cb: MarkAsReadCallback) => {
        try {
          const updated = await Notification.findByIdAndUpdate(
            id,
            { read: true },
            { new: true }
          );
          cb({ status: "success", notification: updated });
          io.emit("notificationUpdated", updated);
        } catch (error: any) {
          console.error("Error marking notification as read:", error);
          cb({ status: "error", error: error.message });
        }
      }
    );

    /* ──────────────────────────────────────────────────────────────
       5. CHAT MESSAGES
    ────────────────────────────────────────────────────────────── */
    socket.on(
      "chatMessage",
      async (data: {
        senderId: string;
        receiverId: string;
        roomId: string;
        text: string;
      }) => {
        try {
          /* store message */
          const message = new Message({
            senderId: data.senderId,
            receiverId: data.receiverId,
            roomId: data.roomId,
            text: data.text,
          });
          await message.save();

          /* upsert conversation */
          let conversation = await Conversation.findOne({ roomId: data.roomId });
          const senderObj   = new mongoose.Types.ObjectId(data.senderId);
          const receiverObj = new mongoose.Types.ObjectId(data.receiverId);

          if (!conversation) {
            conversation = new Conversation({
              roomId: data.roomId,
              participants: [senderObj, receiverObj],
              lastMessage: data.text,
            });
          } else {
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
            const notif = new Notification({
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
        } catch (err) {
          console.error("Error storing message:", err);
          socket.emit("error", "Failed to store message");
        }
      }
    );

    /* ──────────────────────────────────────────────────────────────
       6. DISCONNECT
    ────────────────────────────────────────────────────────────── */
    socket.on("disconnect", (reason: string) => {
      /* find which user owned this socket and remove */
      for (const [userId, sId] of onlineUsers) {
        if (sId === socket.id) {
          onlineUsers.delete(userId);
          console.log(
            `User ${userId} disconnected and removed from online users. (${reason})`
          );

          /* 👇 broadcast presence OFFLINE */
          io.emit("userStatus", { userId, isOnline: false });
          break;
        }
      }
    });
  });
}
