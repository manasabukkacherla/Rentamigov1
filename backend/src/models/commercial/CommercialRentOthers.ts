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

export interface ICommercialRentOthers extends Document {
  propertyId: string;
  propertyName: string;
  commercialType: string[];
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  landmark: string;
  coordinates: {
    latitude: string;
    longitude: string;
  };
  isCornerProperty: boolean;
  
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
    propertyAge: string;
    propertyCondition: string;
    electricitySupply: {
      powerLoad: number;
      backup: boolean;
    };
  };
  rent: {
    expectedRent: number;
    isNegotiable: boolean;
    rentType: 'inclusive' | 'exclusive';
  };
  securityDeposit: {
    amount: number;
  };
  maintenanceAmount?: {
    amount: number;
    frequency: 'monthly' | 'quarterly' | 'half-yearly' | 'yearly';
  };
  otherCharges: {
    water: {
      type: 'inclusive' | 'exclusive';
      amount?: number;
    };
    electricity: {
      type: 'inclusive' | 'exclusive';
      amount?: number;
    };
    gas: {
      type: 'inclusive' | 'exclusive';
      amount?: number;
    };
    others: {
      type: 'inclusive' | 'exclusive';
      amount?: number;
    };
  };
  brokerage: {
    required: string;
    amount?: number;
  };
  availability: {
    type: 'immediate' | 'specific';
    date?: Date;
  };
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
  metaData: {
    userId: Schema.Types.ObjectId | null;
    userName: string;
    createdAt: Date;
  }
}

const CommercialRentOthersSchema: Schema = new Schema({
  propertyId: { type: String, required: true },
  propertyName: { type: String, required: true },
  commercialType: { type: [String]  , required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true }
  },
  landmark: { type: String },
  coordinates: {
    latitude: { type: String ,required:true},
    longitude: { type: String ,required:true}
  },
  isCornerProperty: { type: Boolean, default: false },
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
    propertyAge: { type: String, required: true },
    propertyCondition: { type: String },
    electricitySupply: {
      powerLoad: { type: Number },
      backup: { type: Boolean, default: false }
    }
  },
  rent: {
    expectedRent: { type: Number, required: true },
    isNegotiable: { type: Boolean, default: false },
    rentType: { type: String, enum: ['inclusive', 'exclusive'], required: true }
  },
  securityDeposit: {
    amount: { type: Number }
  },
  maintenanceAmount: {
    amount: { type: Number },
    frequency: { type: String, enum: ['monthly', 'quarterly', 'half-yearly', 'yearly'] }
  },
  otherCharges: {
    water: {
      type: { type: String, enum: ['inclusive', 'exclusive'] },
      amount: { type: Number }
    },
    electricity: {
      type: { type: String, enum: ['inclusive', 'exclusive'] },
      amount: { type: Number }
    },
    gas: {
      type: { type: String, enum: ['inclusive', 'exclusive'] },
      amount: { type: Number }
    },
    others: {
      type: { type: String, enum: ['inclusive', 'exclusive'] },
      amount: { type: Number }
    }
  },
  brokerage: {
    required: { type: String },
    amount: { type: Number }
  },
  availability: {
    type: { type: String, enum: ['immediate', 'specific'], required: true },
    date: { type: Date }
  },
  contactDetails: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
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
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userName:{type:String,default:"Not Specified"},
    createdAt: { type: Date, default: Date.now }
  }
});

export default mongoose.model<ICommercialRentOthers>('CommercialRentOthers', CommercialRentOthersSchema); 