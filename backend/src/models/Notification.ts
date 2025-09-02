import mongoose, { Schema, Document, models, model } from "mongoose";

// Define an interface for Notification which extends Mongoose's Document.
// This interface tells TypeScript the shape of our Notification objects.
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

// Create a schema based on the INotification interface.
// The generic <INotification> ensures our schema aligns with our TypeScript interface.
const NotificationSchema = new Schema<INotification>({
  resourceId: { type: String },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// Export the model so it can be used elsewhere in our backend.
// Check if the model exists, otherwise create a new one
const Notification =
  models.Notification ||
  model<INotification>("Notification", NotificationSchema);

export default Notification;
