// server/src/models/Message.ts

import mongoose, { Schema, Document } from "mongoose";

// Define an interface for a message document.
export interface IMessage extends Document {
  senderId: string;
  receiverId: string;
  roomId: string;
  text: string;
  createdAt: Date;
  read: boolean;
  lastResolvedAt?: string;
}
// Define the message schema.
// Here we define what data each message should store.
const MessageSchema: Schema = new Schema(
  {
    // 'senderId' is a reference to a User document.
    senderId: {
  type: mongoose.Schema.Types.Mixed,  // 👈 allows ObjectId or "bot"
  required: true,
},
receiverId: {
  type: mongoose.Schema.Types.Mixed,  // 👈 allows ObjectId or "bot"
  required: true,
},
    // 'roomId' is a string that identifies the conversation room.
    roomId: { type: String, required: true },

    // 'text' is the actual message content.
    text: { type: String, required: true },

    read: { type: Boolean, default: false },
  },

  {
    // Enable timestamps for messages too.
    timestamps: true,
  }
);

// Export the Message model for use in other parts of the app.
export default mongoose.model<IMessage>("Message", MessageSchema);