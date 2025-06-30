import mongoose, { Schema, Document, Types } from 'mongoose';

// Interfaces
interface IArea {
  superBuiltUpAreaSqft?: number;
  builtUpAreaSqft?: number;
  carpetAreaSqft?: number;
}

interface IBasicInformation {
  title: string;
  Type: string[];
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

interface IRegistration {
  chargestype: 'inclusive' | 'exclusive';
  registrationAmount?: number;
  stampDutyAmount?: number;
}

interface IBrokerage {
  required: string;
  amount?: number;
}

interface IContactInformation {
  name: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  bestTimeToContact?: string;
}

interface IMetadata {
  createdBy: Schema.Types.ObjectId | null;
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

interface IAvailability {
  type: 'immediate' | 'specific';
  date?: Date;
  preferredSaleDuration?: string;
  noticePeriod?: string;
  isPetsAllowed: boolean;
  operatingHours: boolean;
}

interface IMedia {
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
}

 interface ICommercialSellShed extends Document {
  propertyId?: string;
  basicInformation: IBasicInformation;
  shedDetails: {
    totalArea: number;
    builtUpArea: number;
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
    propertyAge: string;
    propertyCondition: string;
    propertyAmenities: string[];
    wholeSpaceAmenities: string[];
    waterAvailability: string[];
    electricitySupply: {
      powerLoad: number;
      backup: boolean;
    };
  };
  pricingDetails: IPricingDetails;
  registration: IRegistration;
  brokerage: IBrokerage;
  availability: IAvailability;
  contactDetails: IContactInformation;
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
  basicInformation: {
    title: { type: String, default: "Unnamed Property" },
    Type: { type: [String], default: [] },
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
  shedDetails: {
    totalArea: { type: Number, required: true },
    builtUpArea: { type: Number},
    carpetArea: { type: Number, required: true },
    entranceWidth: { type: Number, required: true },
    ceilingHeight: { 
      type: Schema.Types.Mixed,
      validate: {
        validator: function (v: any) {
          return typeof v === 'number' || (typeof v === 'object' && v.hasOwnProperty('value') && v.hasOwnProperty('unit'));
        },
        message: 'ceilingHeight must be either a number or an object with value and unit properties'
      }
    },
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
    propertyAge: { type: String },
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
    propertyPrice: { type: Number, required: true },
    pricetype: { type: String, enum: ['fixed', 'negotiable'], default: 'fixed' }
  },
  registration: {
    chargestype: { type: String, enum: ['inclusive', 'exclusive'], default: 'inclusive' },
    registrationAmount: { type: Number },
    stampDutyAmount: { type: Number }
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
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    propertyType: { type: String, default: 'Commercial' },
    intent: { type: String, default: 'Sell' },
    propertyName: { type: String, default: 'Shed' },
    status: { type: String, default: 'Available' }
  }
});

// Indexes
CommercialSellShedSchema.index({ propertyId: 1 }, { unique: true });
CommercialSellShedSchema.index({ 'address.city': 1 });
CommercialSellShedSchema.index({ 'address.state': 1 });
CommercialSellShedSchema.index({ 'propertyDetails.area.superBuiltUpAreaSqft': 1 });
CommercialSellShedSchema.index({ 'metaData.createdAt': -1 });

// Export model and interfaces
export type { ICommercialSellShed, IBasicInformation, IArea, IPricingDetails, IAvailability, IContactInformation, IMedia, IMetadata };
export default mongoose.model<ICommercialSellShed>('CommercialSellShed', CommercialSellShedSchema);
