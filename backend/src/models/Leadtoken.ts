import { Schema, model, models, Document } from 'mongoose';

// Define the interface
export interface ILeadToken extends Document {
  propertyName: string;
  propertyId: string;
  status: 'active' | 'inactive';
  tokenPerLead: number;
  verified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the schema
const LeadTokenSchema = new Schema<ILeadToken>(
  {
    propertyName: {
      type: String,
      required: [true, 'Property name is required'],
      trim: true,
    },
    propertyId: {
      type: String,
      required: [true, 'Property ID is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    tokenPerLead: {
      type: Number,
      required: [true, 'Token per lead is required'],
      min: [0, 'Token per lead must be a positive number'],
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Create or reuse model
const LeadToken = models.LeadToken || model<ILeadToken>('LeadToken', LeadTokenSchema);

export default LeadToken;
