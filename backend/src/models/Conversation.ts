// server/src/models/Conversation.ts

import mongoose, { Schema, Document } from "mongoose";



export interface IConversation extends Document {
  roomId: string;
  participants: mongoose.Types.ObjectId[];
  lastMessage?: string;
  status?: "pending" | "active" | "resolved"; // <-- Add this line
   lastResolvedAt?: Date | null; 

}

const ConversationSchema = new Schema(
  {
    roomId: { type: String, required: true, unique: true },
    participants: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ],
    lastMessage: { type: String },
    status: {
      type: String,
      enum: ["pending", "active", "resolved"],
      default: "pending",
    }, // <-- Add this block
    lastResolvedAt: { type: Date, default: null }

  },
  { timestamps: true }
);


export default mongoose.model<IConversation>(
  "Conversation",
  ConversationSchema
);