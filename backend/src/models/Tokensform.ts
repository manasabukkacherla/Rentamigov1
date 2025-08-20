// models/TokenPackage.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ITokenPackage extends Document {
  pricePerToken: number;
}

const TokenPackageSchema: Schema = new Schema({
  pricePerToken: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model<ITokenPackage>('TokenPackage', TokenPackageSchema);
