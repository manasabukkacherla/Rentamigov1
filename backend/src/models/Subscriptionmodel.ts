import mongoose, { Schema, model, models, Document } from "mongoose";

export interface ISubscriptionPlan extends Document {
  name: string;
  price: number;
  billingCycle: "monthly" | "yearly" | "quarterly";
  maxProperties: number;
  maxLeads: number;
  tokensPerLead: number;
  features: string[];
  description: string;
  trialDays: number;
}

const SubscriptionPlanSchema = new Schema<ISubscriptionPlan>(
  {
    name: {
      type: String,
      required: [true, "Subscription plan name is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a positive number"],
    },
    billingCycle: {
      type: String,
      enum: ["monthly", "yearly", "quarterly"],
      required: [true, "Billing cycle is required"],
    },
    maxProperties: {
      type: Number,
      required: [true, "Max properties is required"],
      min: [1, "At least one property should be allowed"],
    },
    maxLeads: {
      type: Number,
      required: [true, "Max leads is required"],
      min: [1, "At least one lead should be allowed"],
    },
    tokensPerLead: {
      type: Number,
      required: [true, "Tokens per lead is required"],
      min: [1, "At least one token per lead should be allowed"],
    },
    features: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    trialDays: {
      type: Number,
      required: [true, "Trial days are required"],
      min: [0, "Trial days cannot be negative"],
    },
  },
  { timestamps: true }
);

const SubscriptionPlan =
  models.SubscriptionPlan || model<ISubscriptionPlan>("SubscriptionPlan", SubscriptionPlanSchema);

export default SubscriptionPlan;
