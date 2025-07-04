import { Schema, model, Document, Types } from 'mongoose';

// Interfaces
interface IArea {
  totalArea: number;
  carpetArea: number;
  builtUpArea: number;
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

interface ICommercialWarehouse extends Document {
  propertyId: string;
  basicInformation: IBasicInformation;
  warehouseDetails: {
    ceilingHeight: number;
    totalArea: number;
    docks: {
      count: number;
      height: number;
    }
    dockHeight: number;
    numberOfDocks: number;
    floorLoadCapacity: number;
    fireSafety: boolean;
    securityPersonnel: boolean;
    access24x7: boolean;
    truckParking: boolean;
  };
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
    waterAvailability: string;
    propertyAge: number;
    propertyCondition: string;
  };
  pricingDetails: IPricingDetails;
  registration: {
    chargestype: "inclusive" | "exclusive";
    registrationAmount?: number;
    stampDutyAmount?: number;
  };
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
const CommercialWarehouseSchema = new Schema<ICommercialWarehouse>({
  propertyId: { type: String, required: true, unique: true },
  basicInformation: {
    title: { type: String, required: true },
    Type: [{ type: String, required: true }],
    address: { 
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
    },
    landmark: { type: String, required: true },
    location: {
      latitude: { type: String, required: true },
      longitude: { type: String, required: true },
    },
    isCornerProperty: { type: Boolean }
  },
  warehouseDetails: {
    ceilingHeight: { type: Number, required: true },
    totalArea: { type: Number, required: true },
    docks: {
      count: { type: Number, required: true },
      height: { type: Number, required: true },
    },
    floorLoadCapacity: { type: Number, required: true },
    fireSafety: { type: Boolean, default: false },
    securityPersonnel: { type: Boolean, default: false },
    access24x7: { type: Boolean, default: false },
    truckParking: { type: Boolean, default: false },
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
    waterAvailability: { type: String },
    propertyAge: { type: String },
    propertyCondition: { type: String }
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
    registrationAmount: { type: Number },
    stampDutyAmount: { type: Number }
  },
  brokerage: {
    required: { type: String, enum: ['yes', 'no'], required: true },
    amount: { type: Number }
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
    createdAt: { type: Date, default: Date.now },
    propertyType: { type: String, default: 'Commercial' },
    intent: { type: String,default: 'Sell' },
    propertyName: { type: String,  default: 'Warehouse' },
    status: { type: String, default: 'Available' }
  }
}, {
  timestamps: true
});

// Indexes
// CommercialWarehouseSchema.index({ propertyId: 1 }, { unique: true }); // Removed duplicate index
CommercialWarehouseSchema.index({ 'basicInformation.city': 1 });
CommercialWarehouseSchema.index({ 'basicInformation.state': 1 });
CommercialWarehouseSchema.index({ 'pricingDetails.propertyPrice': 1 });
CommercialWarehouseSchema.index({ 'propertyDetails.area.totalArea': 1 });
CommercialWarehouseSchema.index({ 'metadata.createdAt': -1 });

// Export model and interfaces
export { ICommercialWarehouse, IBasicInformation, IArea, IPricingDetails, IAvailability, IContactInformation, IMedia, IMetadata };
export default model<ICommercialWarehouse>('CommercialSellWarehouse', CommercialWarehouseSchema); 