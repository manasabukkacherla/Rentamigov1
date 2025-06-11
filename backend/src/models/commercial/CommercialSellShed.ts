import mongoose, { Schema, Document, Types } from 'mongoose';

// Interfaces
interface IArea {
  superBuiltUpAreaSqft?: number;
  builtUpAreaSqft?: number;
  carpetAreaSqft?: number;
}

interface IBasicInformation {
  title: string;
  shedType: string[];
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

interface IPricingDetails {
  propertyPrice: number;
  pricetype: "fixed" | "negotiable";
}

// interface IAvailability {
//   type: 'immediate' | 'specific';
//   date?: Date;
//   preferredSaleDuration?: string;
//   noticePeriod: string;
//   isPetsAllowed: boolean;
//   operatingHours: boolean;
// }

interface IContactInformation {
  name: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  bestTimeToContact?: string;
}

interface IMetadata {
  createdBy: Types.ObjectId;
  createdAt: Date;
  propertyType: string;
  intent: string;
  propertyName: string;
  status: string;
}

interface IFloor {
  floorNumber: number;
  totalFloors: number;
}

export interface ICommercialSellShed extends Document {
  propertyId?: string;
  propertyName: string;
  shopType: string[];
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
  shedDetails: {
    totalArea: number;
    
    carpetArea: number;
    entranceWidth: number;
    ceilingHeight: number;
    additionalDetails: string;
    
  };
  propertyDetails: {
    area: IArea;
    facingDetails: IFloor;
    facingDirection: string;
    furnishingStatus: string;
    propertyAge: number;
    propertyCondition: string;
      propertyAmenities: string[];
      wholeSpaceAmenities: string[];
    waterAvailability: string[];
    electricitySupply: {
      powerLoad: number;
      backup: boolean;
    };
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
    preferredSaleDuration?: string;
    noticePeriod?: string;
    isPetsAllowed: boolean;
    operatingHours: boolean;
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
  metaData: IMetadata;
}

// Schema
const CommercialSellShedSchema: Schema = new Schema({
  propertyId: { type: String, default: () => `CSS-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}` },
  propertyName: { type: String, default: "Unnamed Property" },
  shopType: { type: [String], default: [] },
  address: {
    street: { type: String, default: "Not Specified" },
    city: { type: String, default: "Not Specified" },
    state: { type: String, default: "Not Specified" },
    zipCode: { type: String, default: "00000" }
  },
  landmark: { type: String },
  coordinates: {
    latitude: { type: String,required:true },
    longitude: { type: String,required:true }
  },
  isCornerProperty: { type: Boolean, default: false },
  shedDetails: {
      totalArea: { type: Number },
      carpetArea: { type: Number },
      entranceWidth: { type: Number },
      ceilingHeight: { type: Number },
      additionalDetails: { type: String }
  },
  propertyDetails: {
    area: {
      superBuiltUpAreaSqft: { type: Number },
      builtUpAreaSqft: { type: Number },
      carpetAreaSqft: { type: Number }
    },
    facingDetails: {
      floorNumber: { type: Number },
      totalFloors: { type: Number }
    },
    facingDirection: { type: String },
    furnishingStatus: { type: String },
    propertyAge: { type: Number },
    propertyCondition: { type: String },
    propertyAmenities: { type: [String], default: [] },
    wholeSpaceAmenities: { type: [String], default: [] },
    waterAvailability: { type: [String], default: [] },
    electricitySupply: {
      powerLoad: { type: Number },
      backup: { type: Boolean, default: false }
    }
  },
  pricingDetails: {
    propertyPrice: { type: Number },
    pricetype: { type: String, enum: ['fixed', 'negotiable'], default: 'fixed' }
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
    preferredSaleDuration: { type: String },
    noticePeriod: { type: String },
    isPetsAllowed: { type: Boolean, default: false },
    operatingHours: {
      restricted: { type: Boolean, default: false },
      restrictions: { type: String, default: '' }
    }
  },
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
      emergencyExits: { type: [String], default: [] }
    },
    videoTour: { type: String },
    documents: { type: [String], default: [] }
  },
  metaData: {
    creadtedBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    createdAt: { type: Date, default: Date.now },
    propertyType: { type: String, default: 'Commercial' },
    intent: { type: String,default: 'Sell' },
    propertyName: { type: String,  default: 'Shed' },
    status: { type: String, default: 'Available' }
  }
});

// Indexes
CommercialSellShedSchema.index({ propertyId: 1 }, { unique: true });
CommercialSellShedSchema.index({ 'address.city': 1 });
CommercialSellShedSchema.index({ 'address.state': 1 });
CommercialSellShedSchema.index({ price: 1 });
CommercialSellShedSchema.index({ 'propertyDetails.area.superBuiltUpAreaSqft': 1 });
CommercialSellShedSchema.index({ 'metaData.createdAt': -1 });

// Export model and interfaces
export type { IBasicInformation, IArea, IPricingDetails,IContactInformation, IMetadata };
export default mongoose.model<ICommercialSellShed>('CommercialSellShed', CommercialSellShedSchema);