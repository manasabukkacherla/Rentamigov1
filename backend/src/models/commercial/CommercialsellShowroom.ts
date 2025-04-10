import { Schema, model, Document, Types } from 'mongoose';

// Interfaces
interface IArea {
  superBuiltUpArea: number;
  builtUpArea: number;
  carpetArea: number;
}

interface IBasicInformation {
  propertyName: string;
  showroomType: string;
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

interface IShowroomDetails {
  totalSpace: number;
  frontageWidth: number;
  ceilingHeight: number;
  displayRacks: boolean;
  glassFrontage: boolean;
  lightingType: string;
  acInstallation: boolean;
  nearbyCompetitors: string;
}

interface IPropertyDetails {
  area: IArea;
  floor: {
    floorNumber: number;
    totalFloors: number;
  };
  facingDirection: string;
  furnishingStatus: string;
  propertyAmenities: string[];
  wholeSpaceAmenities: string[];
  electricitySupply: number;
  backupPower: boolean;
  waterAvailability: string[];
  propertyAge: number;
  propertyCondition: string;
}

interface IPricingDetails {
  price: number;
  priceType: "fixed" | "negotiable";
  area: number;
  totalPrice: number;
  registrationCharges: {
    chargesType: "inclusive" | "exclusive";
    registrationAmount: number;
    stampDutyAmount: number;
  };
  brokerage: {
    hasBrokerage: boolean;
    brokerageAmount?: number;
  };
}

interface IAvailability {
  availableFrom?: Date;
  availabilityStatus: string;
  preferredLeaseDuration: string;
  noticePeriod: string;
  operatingHoursRestrictions: boolean;
  isPetsAllowed: boolean;
  operatingHours: boolean
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
  updatedAt: Date;
}

interface ICommercialShowroom extends Document {
  propertyId: string;
  basicInformation: IBasicInformation;
  showroomDetails: IShowroomDetails;
  propertyDetails: IPropertyDetails;
  pricingDetails: IPricingDetails;
  availability: IAvailability;
  contactInformation: IContactInformation;
  media: IMedia;
  metadata: IMetadata;
}

// Schema
const CommercialShowroomSchema = new Schema<ICommercialShowroom>({
  propertyId: { type: String, required: true, unique: true },
  basicInformation: {
    propertyName: { type: String, required: true },
    showroomType: [{ type: String, required: true }],
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
  showroomDetails: {
    frontageWidth: { type: Number, required: true },
    ceilingHeight: { type: Number, required: true },
    displayWindow: { type: Boolean, default: false },
    attachedStorage: { type: Boolean, default: false },
    averageFootTraffic: { type: String, enum: ['low', 'medium', 'high'] },
    customerParking: { type: Boolean, default: false },
    previousBusiness: { type: String }
  },
  propertyDetails: {
    area: {
      superBuiltUpArea: { type: Number, required: true },
      builtUpArea: { type: Number, required: true },
      carpetArea: { type: Number, required: true }
    },
    floor: {
      floorNumber: { type: Number, required: true },
      totalFloors: { type: Number, required: true }
    },
    facingDirection: { type: String },
    furnishingStatus: { type: String },
    propertyAmenities: [{ type: String }],
    wholeSpaceAmenities: [{ type: String }],
    electricitySupply: { type: Number },
    backupPower: { type: Boolean, default: false },
    waterAvailability: [{ type: String }],
    propertyAge: { type: Number },
    propertyCondition: { type: String }
  },
  pricingDetails: {
    price: { type: Number, required: true },
    priceType: { type: String, enum: ['fixed', 'negotiable'], required: true },
    area: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    registrationCharges: {
      chargesType: { type: String, enum: ['inclusive', 'exclusive'], required: true },
      registrationAmount: { type: Number, required: true },
      stampDutyAmount: { type: Number, required: true }
    },
    brokerage: {
      hasBrokerage: { type: Boolean, default: false },
      brokerageAmount: { type: Number }
    }
  },
  availability: {
    availableFrom: { type: Date },
    availabilityStatus: { type: String, required: true },
    preferredLeaseDuration: { type: String, required: true },
    noticePeriod: { type: String, required: true },
    operatingHoursRestrictions: { type: Boolean, default: false }
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
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }
}, {
  timestamps: true
});

// Indexes
CommercialShowroomSchema.index({ propertyId: 1 }, { unique: true });
CommercialShowroomSchema.index({ 'basicInformation.city': 1 });
CommercialShowroomSchema.index({ 'basicInformation.state': 1 });
CommercialShowroomSchema.index({ 'pricingDetails.price': 1 });
CommercialShowroomSchema.index({ 'propertyDetails.area.superBuiltUpArea': 1 });
CommercialShowroomSchema.index({ 'metadata.createdAt': -1 });

// Pre-save hook to update metadata
CommercialShowroomSchema.pre('save', function(next) {
  this.metadata.updatedAt = new Date();
  next();
});

// Export model and interfaces
export { 
  ICommercialShowroom,
  IBasicInformation,
  IShowroomDetails,
  IPropertyDetails,
  IPricingDetails,
  IAvailability,
  IContactInformation,
  IMedia,
  IMetadata
};
export default model<ICommercialShowroom>('CommercialsellShowroom', CommercialShowroomSchema); 