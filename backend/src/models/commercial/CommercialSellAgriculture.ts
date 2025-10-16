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

export interface ICommercialSellAgriculture extends Document {
  propertyId?: string;
  basicInformation: {
    title: string;
    Type: string[];
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
    landmark: string;
    location: 
    { latitude: string; 
      longitude: string 
    };
    isCornerProperty: boolean;
  };
  
  Agriculturelanddetails: {
    totalArea: number;
    powersupply?: boolean;
    soilType: string;
    irrigation: boolean;
    fencing: boolean;
    cropSuitability: string;
    waterSource: string;
    legalClearances: boolean;
  };
  price: {
    expectedPrice: number;
    isNegotiable: boolean;
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
      exterior?: string[];
      interior?: string[];
      floorPlan?: string[];
      washrooms?: string[];
      lifts?: string[];
      emergencyExits?: string[];
    };
    videoTour?: string;
    documents: string[];
  };
  metadata: {
    createdBy: Schema.Types.ObjectId | null;
    createdAt: Date;
    propertyType: string;
    intent: string;
    propertyName: string;
    status: string;
  }
}

const CommercialSellAgricultureSchema: Schema = new Schema({
  propertyId: { type: String, default: () => `CSA-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}` },
  basicInformation: {
    title: { type: String, default: "Unnamed Property" },
    Type: [{ type: String, required: true }],
    address:{
      street: { type: String, default: "Not Specified" },
      city: { type: String, default: "Not Specified" },
      state: { type: String, default: "Not Specified" },
      zipCode: { type: String, default: "00000" }
    },
  landmark: { type: String },
  location: {
    latitude: { type: String ,required:true},
    longitude: { type: String ,required:true}
  },
  isCornerProperty: { type: Boolean, default: false },
},
  Agriculturelanddetails: {
    totalArea: { type: Number, default: 0 },
    powersupply: { type: Boolean, default: false },
    soilType: { type: String },
    irrigation: { type: Boolean, default: false },
    fencing: { type: Boolean, default: false },
    cropSuitability: { type: String },
    waterSource: { type: String },
    legalClearances: { type: Boolean, default: false }
  },
  price: {
    expectedPrice: { type: Number, default: 0 },
    isNegotiable: { type: Boolean, default: false }
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
      emergencyExits: { type: [String], default: [] }
    },
    videoTour: { type: String },
    documents: { type: [String], default: [] }
  },
  metadata: {
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    propertyType: { type: String, default: 'Commercial' },
    intent: { type: String,default: 'Sell' },
    propertyName: { type: String,  default: 'Agriculture' },
    status: { type: String, default: 'Available' }
  }
});

export default mongoose.model<ICommercialSellAgriculture>('CommercialSellAgriculture', CommercialSellAgricultureSchema); 