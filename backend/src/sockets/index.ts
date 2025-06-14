import { Server, Socket } from "socket.io";
import { Document } from "mongoose"; // Assuming you're using Mongoose for DB operations
import Notification from "../models/Notification";
import Message from "../models/Message";
import Conversation from "../models/Conversation";
import mongoose from "mongoose";

// Define the interface for a Notification document.
// Adjust this based on your actual Mongoose schema.
export interface INotification extends Document {
  // Optional field that can link to a specific resource or user.
  resourceId?: string;
  // The message to be displayed in the notification (this is required).
  message: string;
  // A flag to indicate if the notification has been read.
  read: boolean;
  // The timestamp for when the notification was created.
  createdAt: Date;
}

// Define the shape of the response for a successful "markAsRead" event.
interface MarkAsReadResponseSuccess {
  status: "success";
  notification: INotification | null;
}

// Define the shape of the response when an error occurs in "markAsRead".
interface MarkAsReadResponseError {
  status: "error";
  error: string;
}

// Union type for the callback parameter of "markAsRead" event.
type MarkAsReadCallback = (
  response: MarkAsReadResponseSuccess | MarkAsReadResponseError
) => void;

// Export a function to initialize our Socket.IO events.

/**
 * Socket.IO Connection Event:
 * This is where every new client connection is handled.
 * We also define events like "getNotifications", "joinRoom", etc.
 */
const onlineUsers = new Map<string, string>(); // userId -> socket.id

export default function socketHandler(io: Server) {
  // Listen for new client connections.
  io.on("connection", (socket: Socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("register", (userId: string) => {
      onlineUsers.set(userId, socket.id);
      console.log(`User ${userId} registered with socket ${socket.id}`);
    });

    // Handle "joinRoom" event.
    socket.on("joinRoom", (roomId: string) => {
      socket.join(roomId);
      console.log(`Socket ${socket.id} joined room ${roomId}`);
    });

    // Handle "leaveRoom" event.
    socket.on("leaveRoom", (roomId: string): void => {
      socket.leave(roomId);
      console.log(`Socket ${socket.id} left room: ${roomId}`);
    });
    // Handle "getNotifications" event.
    socket.on("getNotifications", async (): Promise<void> => {
      try {
        // Fetch notifications from your DB, sorting them with the most recent first.
        // Here, Notification is assumed to be your Mongoose model.
        const notifications: INotification[] = await Notification.find().sort({
          createdAt: -1,
        });
        // Send the notifications back to the requesting client.
        socket.emit("loadNotifications", notifications);
      } catch (err) {
        console.error(err);
      }
    });

    // Notification listener
    socket.on(
      "sendNotification",
      async (data: { receiverId: string; type: string; message: string }) => {
        try {
          // Store notification in database
          const notification = new Notification({
            receiverId: data.receiverId,
            type: data.type,
            message: data.message,
          });
          await notification.save();

          // Emit notification to receiver if online
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
    // Handle "markAsRead" event with an acknowledgement callback.
    socket.on(
      "markAsRead",
      async (
        notificationId: string,
        callback: MarkAsReadCallback
      ): Promise<void> => {
        try {
          // Update the notification in the database.
          const updatedNotification: INotification | null =
            await Notification.findByIdAndUpdate(
              notificationId,
              { read: true },
              { new: true }
            );
          // Acknowledge success to the client.
          callback({ status: "success", notification: updatedNotification });
          // Optionally broadcast the updated notification to all connected clients.
          io.emit("notificationUpdated", updatedNotification);
        } catch (error: any) {
          console.error("Error marking notification as read:", error);
          // Acknowledge failure to the client.
          callback({ status: "error", error: error.message });
        }
      }
    );

    // chat message listener
    socket.on(
      "chatMessage",
      async (data: {
        senderId: string;
        receiverId: string;
        roomId: string;
        text: string;
      }) => {
        try {
          // Store message in database
          const message = new Message({
            senderId: data.senderId,
            receiverId: data.receiverId,
            roomId: data.roomId,
            text: data.text,
          });
          await message.save();

          // Update conversation's last message
          console.log(
            "Updating conversation in socket handler with roomId:",
            data.roomId
          );
          console.log("Participants:", [data.senderId, data.receiverId]);

          // Find the conversation or create a new one
          let conversation = await Conversation.findOne({
            roomId: data.roomId,
          });

          if (conversation) {
            // Update existing conversation
            conversation.lastMessage = data.text;

            // Make sure both participants are in the array
            const senderIdObj = new mongoose.Types.ObjectId(data.senderId);
            const receiverIdObj = new mongoose.Types.ObjectId(data.receiverId);

            if (!conversation.participants.some((p) => p.equals(senderIdObj))) {
              conversation.participants.push(senderIdObj);
            }
            if (
              !conversation.participants.some((p) => p.equals(receiverIdObj))
            ) {
              conversation.participants.push(receiverIdObj);
            }

            await conversation.save();
          } else {
            // Create new conversation
            conversation = new Conversation({
              roomId: data.roomId,
              participants: [
                new mongoose.Types.ObjectId(data.senderId),
                new mongoose.Types.ObjectId(data.receiverId),
              ],
              lastMessage: data.text,
            });
            await conversation.save();
          }

          console.log(
            "Conversation after update in socket:",
            JSON.stringify(conversation, null, 2)
          );
          console.log(
            "Number of participants:",
            conversation.participants.length
          );

          // Emit message to room
          io.to(data.roomId).emit("newMessage", {
            ...data,
            _id: message._id,
            createdAt: message.createdAt,
          });
          console.log(
            `Message from ${data.senderId} in room ${data.roomId}: ${data.text}`
          );

          // Send notification to receiver if online and not the sender
          const receiverSocketId = onlineUsers.get(data.receiverId);
          if (receiverSocketId && receiverSocketId !== socket.id) {
            // Store notification in database
            const notification = new Notification({
              receiverId: data.receiverId,
              type: "chat",
              message: `New message from ${data.senderId}`,
            });
            await notification.save();

            // Emit notification
            io.to(receiverSocketId).emit("notification", {
              receiverId: data.receiverId,
              type: "chat",
              message: `New message from ${data.senderId}`,
              id: notification._id,
            });
          }
        } catch (error) {
          console.error("Error storing message:", error);
          socket.emit("error", "Failed to store message");
        }
      }
    );

    socket.on("disconnect", (reason: string): void => {
      onlineUsers.forEach((id, userId) => {
        if (id === socket.id) {
          onlineUsers.delete(userId);
          console.log(
            `User ${userId} disconnected and removed from online users. (${reason})`
          );
        }
      });
    });
  });
}
