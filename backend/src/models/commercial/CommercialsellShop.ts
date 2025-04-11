import { Schema, model, Document, Types } from 'mongoose';

// Interfaces
interface IArea {
  totalArea: number;
  carpetArea: number;
  builtUpArea: number;
}

interface IBasicInformation {
  title: string;
  shopType: string[];
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  landmark: string;
  location: {
    latitude: number;
    longitude: number;
  };
  isCornerProperty: boolean;
}

interface IPricingDetails {
  propertyPrice: number;
  pricetype: "fixed" | "negotiable";
  area: number;
  totalprice: number;
  pricePerSqft: number;
}

interface IAvailability {
  availableFrom?: string;
  availableImmediately: boolean;
  leaseDuration: string;
  noticePeriod: string;
  petsAllowed: boolean;
  operatingHours: {
    restricted: boolean;
    restrictions: string;
  };
}

interface IContactInformation {
  name: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  bestTimeToContact?: string;
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

interface IMetadata {
  createdBy: Types.ObjectId;
  createdAt: Date;
}

interface IFloor {
  floorNumber: number;
  totalFloors: number;
}

interface ICommercialShop extends Document {
  propertyId: string;
  
  basicInformation: IBasicInformation;
  propertyDetails: {
    area: IArea;
    floor: IFloor;
    facingDirection: string;
    furnishingStatus: string;
    propertyAmenities: string[];
    wholeSpaceAmenities: string[];
    electricitySupply: {
      powerLoad: number;
      backup: boolean;
    };
    waterAvailability: string[];
    propertyAge: number;
    propertyCondition: string;
  };
  shopDetails: {
    frontageWidth: number;
    heightOfShop: number;
    displayWindow: boolean;
    attachedStorageRoom: boolean;
    averageFootTraffic: string;
    customerParking: boolean;
    previousBusiness: string;
  };
  pricingDetails: IPricingDetails;
  registration: {
    chargestype: "inclusive" | "exclusive";
    registrationAmount?: number;
    stampDutyAmount?: number;
  }
  brokerage: {
    required: string;
    amount: number;
  };
  availability: IAvailability;
  contactInformation: IContactInformation;
  media: IMedia;
  metadata: IMetadata;
}

// Schema
const CommercialShopSchema = new Schema<ICommercialShop>({
  propertyId: { type: String, required: true, unique: true },
  basicInformation: {
    title: { type: String, required: true },
    shopType: [{ type: String, required: true }],
    address: { 
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
    },
    landmark: { type: String, required: true },
    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    isCornerProperty: { type: Boolean }
  },
  propertyDetails: {
    area: {
      totalArea: { type: Number, required: true },
      carpetArea: { type: Number, required: true },
      builtUpArea: { type: Number, required: true }
    },
    floor: {
      floorNumber: { type: Number, required: true },
      totalFloors: { type: Number, required: true }
    },
    facingDirection: { type: String },
    furnishingStatus: { type: String },
    propertyAmenities: [{ type: String }],
    wholeSpaceAmenities: [{ type: String }],
    electricitySupply: {
      powerLoad: { type: Number },
      backup: { type: Boolean, default: false }
    },
    waterAvailability: [{ type: String }],
    propertyAge: { type: Number },
    propertyCondition: { type: String }
  },
  shopDetails: {
    frontageWidth: { type: Number, required: true },
    heightOfShop: { type: Number, required: true },
    displayWindow: { type: Boolean, default: false },
    attachedStorageRoom: { type: Boolean, default: false },
    averageFootTraffic: { type: String, enum: ['low', 'medium', 'high'] },
    customerParking: { type: Boolean, default: false },
    previousBusiness: { type: String }
  },
  pricingDetails: {
    propertyPrice: { type: Number, required: true },
    pricetype: { type: String, enum: ['fixed', 'negotiable'], required: true },
    area: { type: Number, required: true },
    totalprice: { type: Number, required: true },
    pricePerSqft: { type: Number, required: true }
  },
  registration: {
    chargestype: { type: String, enum: ['inclusive', 'exclusive'], required: true },
    registrationAmount: { type: Number, required: false },
    stampDutyAmount: { type: Number, required: false },
    brokeragedetails: { type: Boolean, default: false },
    brokerageAmount: { type: Number, required: false }
  },
  brokerage: {
    required: { type: String, enum: ['yes', 'no'], required: true },
    amount: { type: Number, required: false }
  },
  availability: {
    availableFrom: { type: String },
    availableImmediately: { type: Boolean, required: true },
    leaseDuration: { type: String, required: true },
    noticePeriod: { type: String, required: true },
    petsAllowed: { type: Boolean, default: false },
    operatingHours: {
      restricted: { type: Boolean, required: true },
      restrictions: { type: String }
    }
  },
  contactInformation: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    alternatePhone: { type: String },
    bestTimeToContact: { type: String }
  },
  media: {
    photos: {
      exterior: [{ type: String }], 
      interior: [{ type: String }], 
      floorPlan: [{ type: String }], 
      washrooms: [{ type: String }],
      lifts: [{ type: String }],
      emergencyExits: [{ type: String }] 
    },
    videoTour: { type: String }, 
    documents: [{ type: String }] 
  },
  metadata: {
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
  }
}, {
  timestamps: true
});

// Indexes
CommercialShopSchema.index({ propertyId: 1 }, { unique: true });
CommercialShopSchema.index({ 'basicInformation.city': 1 });
CommercialShopSchema.index({ 'basicInformation.state': 1 });
CommercialShopSchema.index({ 'pricingDetails.propertyPrice': 1 });
CommercialShopSchema.index({ 'propertyDetails.area.totalArea': 1 });
CommercialShopSchema.index({ 'metadata.createdAt': -1 });

// Export model and interfaces
export { ICommercialShop, IBasicInformation, IArea, IPricingDetails, IAvailability, IContactInformation, IMedia, IMetadata };
export default model<ICommercialShop>('CommercialsellShop', CommercialShopSchema); 