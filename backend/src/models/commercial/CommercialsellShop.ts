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
  address: string;
  landmark: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  isCornerProperty: boolean;
}

interface IPricingDetails {
  propertyPrice: number;
  pricetype: "fixed" | "negotiable";
  area: number;
  totalprice: number;
  propertyareacalculations: number;
}

interface IAvailability {
  availableFrom?: Date;
  availabilityStatus: string;
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
    electricitysupply: number;
    backuppower: boolean;
    wateravailability: string[];
    propertyage: number;
    propertycondition: string;
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
    registrationcharges: number;
    stampdutycharges: number;
    brokeragedetails: boolean;
  }
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
    address: { type: String, required: true },
    landmark: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
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
    electricitysupply: { type: Number },
    backuppower: { type: Boolean, default: false },
    wateravailability: [{ type: String }],
    propertyage: { type: Number },
    propertycondition: { type: String }
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
    propertyareacalculations: { type: Number, required: true }
  },
  registration: {
    chargestype: { type: String, enum: ['inclusive', 'exclusive'], required: true },
    registrationcharges: { type: Number, required: true },
    stampdutycharges: { type: Number, required: true },
    brokeragedetails: { type: Boolean, default: false }
  },
  availability: {
    availableFrom: { type: Date },
    availabilityStatus: { type: String, required: true },
    preferredleaseduration: { type: String, required: true },
    noticeperiod: { type: String, required: true },
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
CommercialShopSchema.index({ propertyId: 1 }, { unique: true });
CommercialShopSchema.index({ 'basicInformation.city': 1 });
CommercialShopSchema.index({ 'basicInformation.state': 1 });
CommercialShopSchema.index({ 'pricingDetails.propertyPrice': 1 });
CommercialShopSchema.index({ 'propertyDetails.area.totalArea': 1 });
CommercialShopSchema.index({ 'metadata.createdAt': -1 });

// Export model and interfaces
export { ICommercialShop, IBasicInformation, IArea, IPricingDetails, IAvailability, IContactInformation, IMedia, IMetadata };
export default model<ICommercialShop>('CommercialsellShop', CommercialShopSchema); 