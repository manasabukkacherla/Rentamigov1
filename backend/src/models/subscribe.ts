import { Schema, model, models, Document } from 'mongoose';

// Define the interface for Subscription document
interface ISubscription extends Document {
  name: string;
  email: string;
  subscribedAt: Date;
}

// Define the Subscription schema
const SubscriptionSchema = new Schema<ISubscription>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
      match: [
        /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/, 
        'Invalid email format',
      ],
    },
    subscribedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Check if the model exists, if not create a new one
const Subscription = models.Subscription || model<ISubscription>('Subscription', SubscriptionSchema);

export default Subscription;
