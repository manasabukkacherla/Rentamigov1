import { Schema, model, Document } from 'mongoose';
import mongoose from 'mongoose';

// Interfaces
export interface IArea {
  totalArea: number;
  carpetArea: number;
  builtUpArea: number;
}

export interface IFloor {
  floorNumber: number;
  totalFloors: number;
}

export interface IBasicInformation {
  title: string;
  type: string[];
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

export interface IContactInformation {
  name: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  bestTimeToContact?: string;
}

export interface IMedia {
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

export interface IMetadata {
  createdBy: Schema.Types.ObjectId | null;
  createdAt: Date;
  propertyType: string;
  propertyName: string;
  intent: string;
  status: string;
}

export interface ILeaseTerms {
  leaseAmount: {
    amount: number;
    type?: 'Fixed' | 'Negotiable';
    duration: number;
    durationUnit: string;
  };
  leaseTenure: {
    minimumTenure: number;
    minimumUnit: string;
    maximumTenure: number;
    maximumUnit: string;
    lockInPeriod: number;
    lockInUnit: string;
    noticePeriod: number;
    noticePeriodUnit: string;
  };
  maintenanceAmount: {
    amount: number;
    frequency: 'Monthly' | 'Quarterly' | 'Yearly' | 'Half-Yearly';
  };
  otherCharges: {
    electricityCharges: {
      type: 'inclusive' | 'exclusive';
      amount?: number;
    };
    waterCharges: {
      type: 'inclusive' | 'exclusive';
      amount?: number;
    };
    gasCharges: {
      type: 'inclusive' | 'exclusive';
      amount?: number;
    };
    otherCharges: {
      type: 'inclusive' | 'exclusive';
      amount?: number;
    };
  };
  brokerage: {
    required: 'yes' | 'no';
    amount?: number;
  };
  availability: {
    availableFrom: Date;
    availableImmediately: boolean;
    leaseDuration: string;
    noticePeriod: string;
    petsAllowed: boolean;
    operatingHours: {
      restricted: boolean;
      restrictions: string;
    };
  };
}

export interface ICommercialLeaseShed extends Document {
  propertyId: string;
  basicInformation: IBasicInformation;
  shedDetails: {
    totalArea: number;
    carpetArea: number;
    height: number;
    entranceWidth: number;
    additionalDetails: string;
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
    propertyAge: number;
    propertyCondition: string;
  };
  leaseTerms: ILeaseTerms;
  contactInformation: IContactInformation;
  media: IMedia;
  metadata: IMetadata;
}

// Schema
const CommercialLeaseShedSchema = new Schema<ICommercialLeaseShed>({
  propertyId: { type: String, required: false, unique: false },
  basicInformation: {
    title: { type: String, required: false },
    type: [{ type: String, required: false }],
    address: {
      street: { type: String, required: false },
      city: { type: String, required: false },
      state: { type: String, required: false },
      zipCode: { type: String, required: false },
    },
    landmark: { type: String, required: false },
    location: {
      latitude: { type: String, required: false },
      longitude: { type: String, required: false },
    },
    isCornerProperty: { type: Boolean, default: false },
  },
  shedDetails: {
    totalArea: { type: Number, required: false },
    carpetArea: { type: Number, required: false },
    height: { type: Number, required: false },
    entranceWidth: { type: Number, required: false },
    additionalDetails: { type: String },
  },
  propertyDetails: {
    area: {
      totalArea: { type: Number, required: false },
      builtUpArea: { type: Number, required: false },
      carpetArea: { type: Number, required: false },
    },
    floor: {
      floorNumber: { type: Number, required: false },
      totalFloors: { type: Number, required: false },
    },
    facingDirection: { type: String, required: false },
    furnishingStatus: { type: String, required: false },
    propertyAmenities: [{ type: String }],
    wholeSpaceAmenities: [{ type: String }],
    electricitySupply: {
      powerLoad: { type: Number, required: false },
      backup: { type: Boolean, default: false },
    },
    propertyAge: { type: Number, required: false },
    propertyCondition: { type: String, required: false },
  },
  leaseTerms: {
    leaseAmount: {
      amount: { type: Number, required: false },
      type: { type: String, enum: ['Fixed', 'Negotiable'], default: 'Fixed' },
      duration: { type: Number, required: false },
      durationUnit: { type: String, required: false },
    },
    leaseTenure: {
      minimumTenure: { type: Number, required: false },
      minimumUnit: { type: String, required: false },
      maximumTenure: { type: Number, required: false },
      maximumUnit: { type: String, required: false },
      lockInPeriod: { type: Number, required: false },
      lockInUnit: { type: String, required: false },
      noticePeriod: { type: Number, required: false },
      noticePeriodUnit: { type: String, required: false },
    },
    maintenanceAmount: {
      amount: { type: Number, required: false },
      frequency: { type: String, enum: ['Monthly', 'Quarterly', 'Yearly', 'Half-Yearly'], required: false },
    },
    otherCharges: {
      electricityCharges: {
        type: { type: String, enum: ['inclusive', 'exclusive'], required: false },
        amount: { type: Number },
      },
      waterCharges: {
        type: { type: String, enum: ['inclusive', 'exclusive'], required: false },
        amount: { type: Number },
      },
      gasCharges: {
        type: { type: String, enum: ['inclusive', 'exclusive'], required: false },
        amount: { type: Number },
      },
      otherCharges: {
        type: { type: String, enum: ['inclusive', 'exclusive'], required: false },
        amount: { type: Number },
      },
    },
    brokerage: {
      required: { type: String, enum: ['yes', 'no'], required: false },
      amount: { type: Number },
    },
    availability: {
      availableFrom: { type: Date, required: false },
      availableImmediately: { type: Boolean, default: false },
      leaseDuration: { type: String, required: false },
      noticePeriod: { type: String, required: false },
      petsAllowed: { type: Boolean, default: false },
      operatingHours: {
        restricted: { type: Boolean, default: false },
        restrictions: { type: String },
      },
    },
  },
  contactInformation: {
    name: { type: String, required: false },
    email: { type: String, required: false },
    phone: { type: String, required: false },
    alternatePhone: { type: String },
    bestTimeToContact: { type: String },
  },
  media: {
    photos: {
      exterior: [{ type: String }],
      interior: [{ type: String }],
      floorPlan: [{ type: String }],
      washrooms: [{ type: String }],
      lifts: [{ type: String }],
      emergencyExits: [{ type: String }],
    },
    videoTour: { type: String },
    documents: [{ type: String }],
  },
  metadata: {
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    createdAt: { type: Date, default: Date.now },
    propertyType: { type: String, default: 'Commercial' },
    intent: { type: String, default: 'Lease' },
    propertyName: { type: String, default: 'Shed' },
    status: { type: String, default: 'Available' },
  },
}, { timestamps: false });

// Indexes
CommercialLeaseShedSchema.index({ 'basicInformation.city': 1 });
CommercialLeaseShedSchema.index({ 'basicInformation.state': 1 });
CommercialLeaseShedSchema.index({ 'metadata.createdAt': -1 });

// Create and export the model
const CommercialLeaseShed = model<ICommercialLeaseShed>('CommercialLeaseShed', CommercialLeaseShedSchema);
export default CommercialLeaseShed;
