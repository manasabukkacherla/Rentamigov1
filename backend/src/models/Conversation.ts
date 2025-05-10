// server/src/models/Conversation.ts

import mongoose, { Schema, Document } from "mongoose";

export interface IConversation extends Document {
  roomId: string; // Unique room identifier (e.g., "user1_user2")
  participants: mongoose.Types.ObjectId[]; // Array of User IDs
  lastMessage?: string; // Preview of last message
}

const ConversationSchema = new Schema(
  {
    roomId: { type: String, required: true, unique: true }, // ← our roomId field
    participants: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ],
    lastMessage: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IConversation>(
  "Conversation",
  ConversationSchema
);
