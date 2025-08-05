import mongoose, { Schema, Document } from "mongoose";

// Payment Model Interface
export interface IPayment extends Document {
  userId: string;
  userName: string;
  amount: number;
  transactionId: string;
  planName: string;
  planId: string;
  dateOfPayment?: Date;
  plantype: string;
  tokensPurchased?: number;
}

// Mongoose Schema Definition
const paymentSchema = new Schema<IPayment>(
  {
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    planName: {
      type: String,
      required: true,
    },
    planId: {
      type: String,
      required: true,
    },
    plantype: {
      type: String,
      required: true,
    },
    dateOfPayment: {
      type: Date,
      default: Date.now,
    },
    tokensPurchased: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Export the Payment Model
const Payment = mongoose.model<IPayment>("Payment", paymentSchema);
export default Payment;
