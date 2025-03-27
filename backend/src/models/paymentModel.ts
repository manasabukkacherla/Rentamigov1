import mongoose, { Schema, Document } from "mongoose";

// Payment Model Interface
interface IPayment extends Document {
  userId: string;
  userName: string;
  amount: number;
  transactionId: string;
  planName: string;
  planId: string;
  expirationDate: Date;
  dateOfPayment: Date;
  plantype: string;
}

const paymentSchema = new Schema(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    amount: { type: Number, required: true },
    transactionId: { type: String, required: true },
    planName: { type: String, required: true },
    plantype: { type: String, required: true },
    planId: { type: String, required: true },
    expirationDate: { type: Date, required: true },
    dateOfPayment: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Payment = mongoose.model<IPayment>("Payment", paymentSchema);

export default Payment;