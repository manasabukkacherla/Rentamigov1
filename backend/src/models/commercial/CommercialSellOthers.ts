import mongoose, { Schema, Document, Types } from 'mongoose';

interface IArea {
  totalArea: number;
  carpetArea: number;
  builtUpArea: number;
}

interface IFloor {
  floorNumber: number;
  totalFloors: number;
}

export interface ICommercialSellOthers extends Document {
  basicInformation: {
    propertyId?: string;
    title: string;
    type: string[];
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
    landmark: string;
    location: {
      latitude: string;
      longitude: string;
    };
    isCornerProperty: boolean;
  }


  propertyDetails: {
    area: IArea;
    floor: IFloor;
    otherDetails: {
      propertyTypeDescription: string;
      specialFeatures: string;
      usageRecommendation: string;
      additionalRequirements: string;
    };
    facingDirection: string;
    furnishingStatus: string;
    propertyAmenities: string[];
    wholeSpaceAmenities: string[];
    waterAvailability: string;
    propertyAge: number;
    propertyCondition: string;
    electricitySupply: {
      powerLoad: number;
      backup: boolean;
    };
  };
  price: {
    expectedPrice: number;
    isNegotiable: boolean;
  };
  registrationCharges: {
    included: boolean;
    amount?: number;
    stampDuty?: number;
  };
  brokerage: {
    required: string;
    amount?: number;
  };
  availability: {
    type: 'immediate' | 'specific';
    date?: Date;
    preferredLeaseDuration?: string;
    noticePeriod?: string;
  };
  petsAllowed: boolean;
  operatingHoursRestrictions: boolean;
  contactDetails: {
    name: string;
    email: string;
    phone: string;
    alternatePhone?: string;
    bestTimeToContact?: string;
  };
  media: {
    photos: {
      exterior: string[];
      interior: string[];
      floorPlan: string[];
      washrooms: string[];
      lifts: string[];
      emergencyExits: string[];
      others: string[];
    };
    videoTour?: string;
    documents: string[];
  };
  metaData?: {
    createdBy: Schema.Types.ObjectId | null;
    createdAt: Date;
    propertyType: string;
    intent: string;
    propertyName: string;
    status: string;
  };
}

const CommercialSellOthersSchema: Schema = new Schema({
  basicInformation: {
    propertyId: { type: String, default: () => `CSO-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}` },
    title: { type: String, default: "Unnamed Property" },
    type: { type: [String], default: ["Other"] },
    address: {
      street: { type: String, default: "Not Specified" },
      city: { type: String, default: "Not Specified" },
      state: { type: String, default: "Not Specified" },
      zipCode: { type: String, default: "00000" }
    },
    landmark: { type: String },
    location: {
      latitude: { type: String, required: true },
      longitude: { type: String, required: true }
    },
    isCornerProperty: { type: Boolean, default: false },
  },
  propertyDetails: {
    area: {
      totalArea: { type: Number },
      carpetArea: { type: Number },
      builtUpArea: { type: Number }
    },
    floor: {
      floorNumber: { type: Number },
      totalFloors: { type: Number }
    },
    otherDetails: {
      propertyTypeDescription: { type: String },
      specialFeatures: { type: String },
      usageRecommendation: { type: String },
      additionalRequirements: { type: String }
    },
    facingDirection: { type: String },
    furnishingStatus: { type: String },
    propertyAmenities: { type: [String], default: [] },
    wholeSpaceAmenities: { type: [String], default: [] },
    waterAvailability: { type: String },
    propertyAge: { type: Number },
    propertyCondition: { type: String },
    electricitySupply: {
      powerLoad: { type: Number },
      backup: { type: Boolean, default: false }
    }
  },
  price: {
    expectedPrice: { type: Number, default: 0 },
    isNegotiable: { type: Boolean, default: false }
  },
  registrationCharges: {
    included: { type: Boolean, default: false },
    amount: { type: Number },
    stampDuty: { type: Number }
  },
  brokerage: {
    required: { type: String },
    amount: { type: Number }
  },
  availability: {
    type: { type: String, enum: ['immediate', 'specific'], default: 'immediate' },
    date: { type: Date },
    preferredLeaseDuration: { type: String },
    noticePeriod: { type: String }
  },
  petsAllowed: { type: Boolean, default: false },
  operatingHoursRestrictions: { type: Boolean, default: false },
  contactDetails: {
    name: { type: String, default: "Not Specified" },
    email: { type: String, default: "not.specified@example.com" },
    phone: { type: String, default: "0000000000" },
    alternatePhone: { type: String },
    bestTimeToContact: { type: String }
  },
  media: {
    photos: {
      exterior: { type: [String], default: [] },
      interior: { type: [String], default: [] },
      floorPlan: { type: [String], default: [] },
      washrooms: { type: [String], default: [] },
      lifts: { type: [String], default: [] },
      emergencyExits: { type: [String], default: [] },
      others: { type: [String], default: [] }
    },
    videoTour: { type: String },
    documents: { type: [String], default: [] }
  },
  metaData: {
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    createdAt: { type: Date, default: Date.now },
    propertyType: { type: String, default: 'Commercial' },
    intent: { type: String, default: 'Sell' },
    propertyName: { type: String, default: 'Others' },
    status: { type: String, default: 'Available' }
  }
});

export default mongoose.model<ICommercialSellOthers>('CommercialSellOthers', CommercialSellOthersSchema); 