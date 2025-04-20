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

export interface ICommercialRentAgriculture extends Document {
  propertyId: string;
  propertyName: string;
  landType: string[];
  powerSupply: boolean;
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
  Agriculturelanddetails: {
    totalArea: number;
    soilType: string;
    irrigation: boolean;
    fencing: boolean;
    cropSuitability: string;
    waterSource: string;
    legalClearances: boolean;
  };
  propertyDetails:{
    area: IArea;
    floor: IFloor;
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
    maintenanceType: 'inclusive' | 'exclusive';
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
    };
    videoTour?: string;
    documents: string[];
  };
  metaData : {
    createdBy: Types.ObjectId;
    createdAt: Date;
  }
}

const CommercialRentAgricultureSchema: Schema = new Schema({
  propertyId: { type: String, required: true },
  propertyName: { type: String, required: true },
  landType: { type: [String], required: true },
  powerSupply: { type: Boolean, default: false },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true }
  },
  landmark: { type: String },
  coordinates: {
    latitude: { type: String },
    longitude: { type: String }
  },
  isCornerProperty: { type: Boolean, default: false },
    Agriculturelanddetails: {
    totalArea: { type: Number, required: true },
    soilType: { type: String },
    irrigation: { type: Boolean, default: false },
    fencing: { type: Boolean, default: false },
    cropSuitability: { type: String },
    waterSource: { type: String },
    legalClearances: { type: Boolean, default: false }
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
    facingDirection: { type: String },
    furnishingStatus: { type: String },
    propertyAmenities: { type: [String] },
    wholeSpaceAmenities: { type: [String] },
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
    maintenanceType: { type: String, enum: ['inclusive', 'exclusive'], required: true }
  },
  securityDeposit: {
    amount: { type: Number }
  },
  maintenanceAmount: {
    amount: { type: Number },
    frequency: { type: String, enum: ['monthly', 'quarterly', 'half-yearly', 'yearly'] },
    securityDeposit: {
      amount: { type: Number }
    }
  },
  otherCharges: {
    water: {
      type: { type: String, enum: ['inclusive', 'exclusive'], required: true },
      amount: { 
        type: Number,
        
      }
    },
    electricity: {
      type: { type: String, enum: ['inclusive', 'exclusive'], required: true },
      amount: { 
        type: Number,
        
      }
    },
    gas: {
      type: { type: String, enum: ['inclusive', 'exclusive'], required: true },
      amount: { 
        type: Number,
        
      }
    },
    others: {
      type: { type: String, enum: ['inclusive', 'exclusive'], required: true },
      amount: { 
        type: Number,
        
      }
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
      emergencyExits: { type: [String], default: [] }
    },
    videoTour: { type: String },
    documents: { type: [String], default: [] }
  },
  metaData : {
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
  }
});

export default mongoose.model<ICommercialRentAgriculture>('CommercialRentAgriculture', CommercialRentAgricultureSchema); 