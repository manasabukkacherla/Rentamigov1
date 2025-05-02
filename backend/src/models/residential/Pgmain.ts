import mongoose, { Schema, Document } from 'mongoose';

export interface IPgMain extends Document {
  pgDetails: {
    name: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    ownerName: string;
    contactNumber: string;
    email: string;
  };
  roomConfiguration: {
    totalRooms: number;
    sharingTypes: string[];
    customShare?: string;
    roomSize?: number;
    attachedWashroom?: boolean;
    balcony?: boolean;
    acAvailable?: boolean;
    nonAcAvailable?: boolean;
  };
  commonAreaAmenitiesAndServices: string[];
  otherFeaturesAndRestrictions: {
    rules: string[];
    restrictions: string[];
  };
  foodServices: {
    available: boolean;
    type?: string;
    details?: string;
  };
  pricing: {
    rent: number;
    deposit?: number;
    maintenance?: number;
    includedUtilities?: string[];
    terms?: string;
  };
  media: {
    photos: string[]; // URLs or base64
    videos?: string[];
  };
  metadata: {
    userId: any;
    userName: string;
    createdAt: Date;
  };
}

const PgMainSchema: Schema = new Schema(
  {
    pgDetails: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      ownerName: { type: String, required: true },
      contactNumber: { type: String, required: true },
      email: { type: String, required: true },
    },
    roomConfiguration: {
      totalRooms: { type: Number, required: true },
      sharingTypes: { type: [String], required: true },
      customShare: { type: String },
      roomSize: { type: Number },
      attachedWashroom: { type: Boolean },
      balcony: { type: Boolean },
      acAvailable: { type: Boolean },
      nonAcAvailable: { type: Boolean },
    },
    commonAreaAmenitiesAndServices: { type: [String], default: [] },
    otherFeaturesAndRestrictions: {
      rules: { type: [String], default: [] },
      restrictions: { type: [String], default: [] },
    },
    foodServices: {
      available: { type: Boolean, required: true },
      type: { type: String },
      details: { type: String },
    },
    pricing: {
      rent: { type: Number, required: true },
      deposit: { type: Number },
      maintenance: { type: Number },
      includedUtilities: { type: [String], default: [] },
      terms: { type: String },
    },
    media: {
      photos: { type: [String], default: [] },
      videos: { type: [String], default: [] },
    },
    metadata: {
      userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      userName: { type: String, default: 'Not Specified' },
      createdAt: { type: Date, default: Date.now },
    },
  },
  { timestamps: true }
);

export default mongoose.model<IPgMain>('PgMain', PgMainSchema);
