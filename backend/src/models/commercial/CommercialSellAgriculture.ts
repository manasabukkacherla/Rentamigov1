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
  propertyName: string;
  landType?: string[];
  watersource?: string;
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
  propertyDetails?: {
    area?: IArea;
    floor?: IFloor;
    facingDirection?: string;
    furnishingStatus?: string;
    propertyAmenities?: string[];
    wholeSpaceAmenities?: string[];
    waterAvailability?: string;
    propertyAge?: number;
    propertyCondition?: string;
    electricitySupply?: {
      powerLoad?: number;
      backup?: boolean;
    };
  };
  price: {
    expectedPrice: number;
    isNegotiable: boolean;
  };
  registrationCharges?: {
    included?: boolean;
    amount?: number;
    stampDuty?: number;
  };
  brokerage?: {
    required?: string;
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
  metaData: {
    userId: Schema.Types.ObjectId | null;
    userName: string;
    createdAt: Date;
  }
}

const CommercialSellAgricultureSchema: Schema = new Schema({
  propertyId: { type: String, default: () => `CSA-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}` },
  propertyName: { type: String, default: "Unnamed Property" },
  landType: { type: [String], default: ["Agricultural"] },
  powerSupply: { type: Boolean, default: false },
  address: {
    street: { type: String, default: "Not Specified" },
    city: { type: String, default: "Not Specified" },
    state: { type: String, default: "Not Specified" },
    zipCode: { type: String, default: "00000" }
  },
  landmark: { type: String },
  coordinates: {
    latitude: { type: String ,required:true},
    longitude: { type: String ,required:true}
  },
  isCornerProperty: { type: Boolean, default: false },
  Agriculturelanddetails: {
    totalArea: { type: Number, default: 0 },
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
      emergencyExits: { type: [String], default: [] }
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

export default mongoose.model<ICommercialSellAgriculture>('CommercialSellAgriculture', CommercialSellAgricultureSchema); 