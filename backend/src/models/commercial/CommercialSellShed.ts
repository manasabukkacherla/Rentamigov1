import { Schema, model, Document, Types } from 'mongoose';

// Interfaces
interface IArea {
  totalArea: number;
  builtUpArea: number;
  carpetArea: number;
}

interface IBasicInformation {
  propertyName: string;
  shedType: string[];
  address: {
    address: string;
    landmark: string;
    city: string;
    state: string;
    zipCode: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  isCornerProperty: boolean;
}

interface IShedDetails {
  frontageWidth: number;
  heightOfShed: number;
  displayWindow: boolean;
  attachedStorageRoom: boolean;
  averageFootTraffics: string[];
  customerParking: boolean;
  previousBusiness: string;
  ceilingHeight: number;
}

interface IPropertyDetails {
  area: IArea;
  floor: {
    floorNumber: number;
    totalFloors: number;
  };
  facingDirection: string;
  furnishing: string;
  propertyAge: number;
  propertyCondition: string;
  constructionType: string;
  powerLoad: number;
  backuppower: boolean;
  propertyAmenities: string[];
  wholespaceAmenities: string[];
}

interface IPricingDetails {
  price: number;
  priceType: 'fixed' | 'negotiable';
  maintenanceCharges: {
    amount: number;
    frequency: 'monthly' | 'quarterly' | 'yearly';
  };
  expectedRoi: number;
  inclusivePrices: string[];
  bookingAmount: number;
  annualDuesPayable: number;
}

interface IRegistration {
  chargesType: 'inclusive' | 'exclusive';
  registrationCharges: number;
  stampDutyCharges: number;
  brokerageDetails: {
    hasBrokerage: boolean;
    amount?: number;
    percentage?: number;
  };
}

interface IAvailability {
  aavailableFrom?: Date;
  availabilityStatus: 'available' | 'unavailable' | 'rented';
  preferredleaseduration: string;
  noticeperiod: string;
  ispetsallowed: boolean;
  operatinghoursrestrictions: boolean;
}

interface IContactInformation {
  name: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  preferredContactTime?: string;
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

interface ICommercialShed extends Document {
  propertyId: string;
  basicInformation: IBasicInformation;
  shedDetails: IShedDetails;
  propertyDetails: IPropertyDetails;
  pricingDetails: IPricingDetails;
  registration: IRegistration;
  availability: IAvailability;
  contactInformation: IContactInformation;
  media: IMedia;
  metadata: IMetadata;
}

// Schema
const CommercialShedSchema = new Schema<ICommercialShed>({
  propertyId: { type: String, required: true, unique: true },
  basicInformation: {
    propertyName: { type: String, required: true },
    shedType: [{ type: String, required: true }],
    address: {
      address: { type: String, required: true },
      landmark: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true }
    },
    coordinates: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true }
    },
    isCornerProperty: { type: Boolean, default: false }
  },
  shedDetails: {
    frontageWidth: { type: Number, required: true },
    heightOfShed: { type: Number, required: true },
    displayWindow: { type: Boolean, default: false },
    attachedStorageRoom: { type: Boolean, default: false },
    averageFootTraffics: [{ type: String }],
    customerParking: { type: Boolean, default: false },
    previousBusiness: { type: String },
    ceilingHeight: { type: Number, required: true }
  },
  propertyDetails: {
    area: {
      totalArea: { type: Number, required: true },
      builtUpArea: { type: Number, required: true },
      carpetArea: { type: Number, required: true }
    },
    floor: {
      floorNumber: { type: Number, required: true },
      totalFloors: { type: Number, required: true }
    },
    facingDirection: { type: String },
    furnishing: { type: String },
    propertyAge: { type: Number },
    propertyCondition: { type: String },
    constructionType: { type: String },
    powerLoad: { type: Number },
    backuppower: { type: Boolean, default: false },
    propertyAmenities: [{ type: String }],
    wholespaceAmenities: [{ type: String }]
  },
  pricingDetails: {
    price: { type: Number, required: true },
    priceType: { type: String, enum: ['fixed', 'negotiable'], required: true },
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
    chargesType: { type: String, enum: ['inclusive', 'exclusive'], required: true },
    registrationCharges: { type: Number, required: true },
    stampDutyCharges: { type: Number, required: true },
    brokerageDetails: {
      hasBrokerage: { type: Boolean, default: false },
      amount: { type: Number },
      percentage: { type: Number }
    }
  },
  availability: {
    aavailableFrom: { type: Date },
    availabilityStatus: { 
      type: String, 
      required: true,
      enum: ['available', 'unavailable', 'rented']
    },
    preferredleaseduration: { type: String },
    noticeperiod: { type: String },
    ispetsallowed: { type: Boolean, default: false },
    operatinghoursrestrictions: { type: Boolean, default: false }
  },
  contactInformation: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    alternatePhone: { type: String },
    preferredContactTime: { type: String }
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
CommercialShedSchema.index({ 'pricingDetails.price': 1 });
CommercialShedSchema.index({ 'propertyDetails.area.totalArea': 1 });
CommercialShedSchema.index({ 'metadata.createdAt': -1 });

// Export model and interfaces
export {
  ICommercialShed,
  IBasicInformation,
  IShedDetails,
  IPropertyDetails,
  IPricingDetails,
  IRegistration,
  IAvailability,
  IContactInformation,
  IMedia,
  IMetadata
};

export default model<ICommercialShed>('CommercialSellShed', CommercialShedSchema); 