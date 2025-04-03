import { Server, Socket } from "socket.io";
import { Document } from "mongoose"; // Assuming you're using Mongoose for DB operations
import Notification from "./models/Notification";

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

export default function socketHandler(io: Server) {
  // Listen for new client connections.
  io.on("connection", (socket: Socket) => {
    console.log(`Client connected: ${socket.id}`);

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

    // Handle "joinRoom" event for subscribing to a room.
    socket.on("joinRoom", (roomName: string): void => {
      socket.join(roomName);
      console.log(`Socket ${socket.id} joined room: ${roomName}`);
    });

    // Handle "leaveRoom" event.
    socket.on("leaveRoom", (roomName: string): void => {
      socket.leave(roomName);
      console.log(`Socket ${socket.id} left room: ${roomName}`);
    });

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

    // Log when a client disconnects.
    socket.on("disconnect", (reason: string): void => {
      console.log(`Client disconnected: ${socket.id} (${reason})`);
    });
  });
}
