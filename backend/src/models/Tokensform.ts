// models/TokenPackage.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ITokenPackage extends Document {
  name: string;
  tokens: number;
  price: number;
  bonusTokens: number;
  minPurchase: number;
  tokensPerLead: number;
  validityDays: number;
  features: string[];
  description: string;
}

const TokenPackageSchema: Schema = new Schema({
  name: { type: String, required: true },
  tokens: { type: Number, required: true },
  price: { type: Number, required: true },
  bonusTokens: { type: Number, default: 0 },
  minPurchase: { type: Number, required: true },
  tokensPerLead: { type: Number, required: true },
  validityDays: { type: Number, required: true },
  features: { type: [String], default: [] },
  description: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<ITokenPackage>('TokenPackage', TokenPackageSchema);