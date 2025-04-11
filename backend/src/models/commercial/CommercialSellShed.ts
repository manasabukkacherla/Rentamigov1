import { Schema, model, Document, Types } from 'mongoose';

// Interfaces
interface IArea {
  totalArea: number;
  carpetArea: number;
  builtUpArea: number;
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
  maintenanceCharges: {
    amount: number;
    frequency: "monthly" | "quarterly" | "yearly";
  };
  expectedRoi: number;
  inclusivePrices: string[];
  bookingAmount: number;
  annualDuesPayable: number;
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

interface ICommercialShed extends Document {
  propertyId: string;
  basicInformation: IBasicInformation;
  shedDetails: {
    frontageWidth: number;
    heightOfShed: number;
    displayWindow: boolean;
    attachedStorageRoom: boolean;
    averageFootTraffic: string[];
    customerParking: boolean;
    previousBusiness: string;
    ceilingHeight: number;
  };
  propertyDetails: {
    area: IArea;
    floor: IFloor;
    facingDirection: string;
    furnishingStatus: string;
    propertyAge: number;
    propertyCondition: string;
    constructionType: string;
    electricitySupply: {
      powerLoad: number;
      backup: boolean;
    };
    propertyAmenities: string[];
    wholeSpaceAmenities: string[];
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
const CommercialShedSchema = new Schema<ICommercialShed>({
  propertyId: { type: String, required: true, unique: true },
  basicInformation: {
    title: { type: String, required: true },
    shedType: [{ type: String, required: true }],
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
  shedDetails: {
    frontageWidth: { type: Number, required: true },
    heightOfShed: { type: Number, required: true },
    displayWindow: { type: Boolean, default: false },
    attachedStorageRoom: { type: Boolean, default: false },
    averageFootTraffic: [{ type: String }],
    customerParking: { type: Boolean, default: false },
    previousBusiness: { type: String },
    ceilingHeight: { type: Number, required: true }
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
    propertyAge: { type: Number },
    propertyCondition: { type: String },
    constructionType: { type: String },
    electricitySupply: {
      powerLoad: { type: Number },
      backup: { type: Boolean, default: false }
    },
    propertyAmenities: [{ type: String }],
    wholeSpaceAmenities: [{ type: String }]
  },
  pricingDetails: {
    propertyPrice: { type: Number, required: true },
    pricetype: { type: String, enum: ['fixed', 'negotiable'], required: true },
    area: { type: Number, required: true },
    totalprice: { type: Number, required: true },
    pricePerSqft: { type: Number, required: true },
    maintenanceCharges: {
      amount: { type: Number },
      frequency: { 
        type: String,
        enum: ['monthly', 'quarterly', 'yearly']
      }
    },
    expectedRoi: { type: Number },
    inclusivePrices: [{ type: String }],
    bookingAmount: { type: Number },
    annualDuesPayable: { type: Number }
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
    createdAt: { type: Date, default: Date.now }
  }
}, {
  timestamps: true
});

// Indexes
CommercialShedSchema.index({ propertyId: 1 }, { unique: true });
CommercialShedSchema.index({ 'basicInformation.city': 1 });
CommercialShedSchema.index({ 'basicInformation.state': 1 });
CommercialShedSchema.index({ 'pricingDetails.propertyPrice': 1 });
CommercialShedSchema.index({ 'propertyDetails.area.totalArea': 1 });
CommercialShedSchema.index({ 'metadata.createdAt': -1 });

// Export model and interfaces
export { ICommercialShed, IBasicInformation, IArea, IPricingDetails, IAvailability, IContactInformation, IMedia, IMetadata };
export default model<ICommercialShed>('CommercialSellShed', CommercialShedSchema); 