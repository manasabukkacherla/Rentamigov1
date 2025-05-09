import mongoose, { Schema, Document } from 'mongoose';

export interface IPgMain extends Document {
  propertyId: string;
  pgDetails: {
    name: string;
    accommodationType: "boys" | "girls" | "both boys and girls";
    address: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
  roomConfiguration: {
    totalRooms: number;
    sharingTypes: string[];
    customShare?: string;
    roomSize?: number;
    singleRoomAmenities?: string[];
    doubleShareRoomAmenities?: string[];
    tripleShareRoomAmenities?: string[];
    fourShareRoomAmenities?: string[];
    fiveShareRoomAmenities?: string[];
    customShareRoomAmenities?: string[];
  };
  commonAreaAmenitiesAndServices: string[];
  otherFeaturesAndRestrictions: {
    otherFeatures: string[];
    restrictions: string[];
  };
  foodServices: {
    available: boolean;
    includeSnacks?: boolean;
    weekMeals?: {
      [key: string]: {
        breakfast: { name: string; time: string };
        lunch: { name: string; time: string };
        dinner: { name: string; time: string };
      };
    };
    mealTimesState?: {
      breakfast?: string;
      lunch?: string;
      dinner?: string;
    };
  };
  pricing: {
    rent: number;
    deposit?: number;
    maintenance?: number;
    includedUtilities?: string[];
    terms?: string;
    roomSharePricing?: {
      singleShare?: {
        monthlyRent?: string;
        advancePaymentMonths?: string;
        lockInPeriod?: string;
        noticePeriod?: string;
      };
      doubleShare?: {
        monthlyRent?: string;
        advancePaymentMonths?: string;
        lockInPeriod?: string;
        noticePeriod?: string;
      };
      tripleShare?: {
        monthlyRent?: string;
        advancePaymentMonths?: string;
        lockInPeriod?: string;
        noticePeriod?: string;
      };
      fourShare?: {
        monthlyRent?: string;
        advancePaymentMonths?: string;
        lockInPeriod?: string;
        noticePeriod?: string;
      };
      fiveShare?: {
        monthlyRent?: string;
        advancePaymentMonths?: string;
        lockInPeriod?: string;
        noticePeriod?: string;
      };
      multiShare?: {
        monthlyRent?: string;
        advancePaymentMonths?: string;
        lockInPeriod?: string;
        noticePeriod?: string;
        numberOfPersons?: string;
      };
    };
  };
  media: {
    photos: string[]; // URLs or base64
    videos?: string[];
    mediaItems?: Array<{
      id?: string;
      type?: 'photo' | 'video';
      url?: string;
      title?: string;
      tags?: string[];
      roomType?: string;
    }>;
  };
  metadata: {
    userId: mongoose.Schema.Types.ObjectId;  // Directly define as ObjectId reference to User model
    userName: string;
    createdAt: Date;
  };
}

const PgMainSchema: Schema = new Schema(
  {
    propertyId: { type: String, required: true, unique: true },
    pgDetails: {
      name: { type: String, default: '' },
      accommodationType: { type: String, enum: ["boys", "girls", "both boys and girls"], default: "both boys and girls" },
      address: { type: String, default: '' },
    },
    location: {
      latitude: { type: Number, default: 0 },
      longitude: { type: Number, default: 0 },
    },
    roomConfiguration: {
      totalRooms: { type: Number, default: 0 },
      sharingTypes: { type: [String], default: [] },
      customShare: { type: String },
      roomSize: { type: Number },
      singleRoomAmenities: { type: [String], default: [] },
      doubleShareRoomAmenities: { type: [String], default: [] },
      tripleShareRoomAmenities: { type: [String], default: [] },
      fourShareRoomAmenities: { type: [String], default: [] },
      fiveShareRoomAmenities: { type: [String], default: [] },
      customShareRoomAmenities: { type: [String], default: [] },
    },
    commonAreaAmenitiesAndServices: { type: [String], default: [] },
    otherFeaturesAndRestrictions: {
      otherFeatures: { type: [String], default: [] },
      restrictions: { type: [String], default: [] },
    },
    foodServices: {
      available: { type: Boolean, default: false },
      includeSnacks: { type: Boolean, default: false },
      weekMeals: { type: Schema.Types.Mixed, default: {} },
      mealTimesState: { type: Schema.Types.Mixed, default: {} },
    },
    pricing: {
      rent: { type: Number, default: 0 },
      deposit: { type: Number },
      maintenance: { type: Number },
      includedUtilities: { type: [String], default: [] },
      terms: { type: String },
      roomSharePricing: {
        singleShare: {
          monthlyRent: { type: String },
          advancePaymentMonths: { type: String },
          lockInPeriod: { type: String },
          noticePeriod: { type: String },
        },
        doubleShare: {
          monthlyRent: { type: String },
          advancePaymentMonths: { type: String },
          lockInPeriod: { type: String },
          noticePeriod: { type: String },
        },
        tripleShare: {
          monthlyRent: { type: String },
          advancePaymentMonths: { type: String },
          lockInPeriod: { type: String },
          noticePeriod: { type: String },
        },
        fourShare: {
          monthlyRent: { type: String },
          advancePaymentMonths: { type: String },
          lockInPeriod: { type: String },
          noticePeriod: { type: String },
        },
        fiveShare: {
          monthlyRent: { type: String },
          advancePaymentMonths: { type: String },
          lockInPeriod: { type: String },
          noticePeriod: { type: String },
        },
        multiShare: {
          monthlyRent: { type: String },
          advancePaymentMonths: { type: String },
          lockInPeriod: { type: String },
          noticePeriod: { type: String },
          numberOfPersons: { type: String },
        },
      },
    },
    media: {
      photos: { type: [String], default: [] }, // Base64 encoded strings or URLs
      videos: { type: [String], default: [] }, // Base64 encoded strings or URLs
      mediaItems: [
        {
          id: { type: String },
          type: { type: String, enum: ["photo", "video"] },
          url: { type: String }, // Base64 encoded string or URL
          title: { type: String },
          tags: { type: [String], default: [] },
          roomType: { type: String },
        }
      ],
    },
    metadata: {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      userName: { type: String, default: 'Not Specified' },
      createdAt: { type: Date, default: Date.now },
    }
  },
  { timestamps: true }
);

export default mongoose.model<IPgMain>('PgMain', PgMainSchema);
