import mongoose, { Schema, Document } from 'mongoose';

interface IArea {
  totalArea: number;
  builtUpArea: number;
  carpetArea: number;
}

interface IFloor {
  floorNumber: number;
  totalFloors: number;
}

export interface ICommercialLeaseCoveredSpace extends Document {
  propertyId: string;
  basicInformation: {
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
  };
  coveredSpaceDetails: {
    totalArea: number;
    sqaurefeet: string;
    coveredarea: number;
    roadwidth: number;
    roadfeet: string;
    ceilingheight: number;
    ceilingfeet: string;
    noofopenslides: number;
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
    propertyAge: string;
    propertyCondition: string;
  };
  leaseTerms: {
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
      electricityCharges: { type: 'inclusive' | 'exclusive'; amount?: number };
      waterCharges: { type: 'inclusive' | 'exclusive'; amount?: number };
      gasCharges: { type: 'inclusive' | 'exclusive'; amount?: number };
      otherCharges: { type: 'inclusive' | 'exclusive'; amount?: number };
    };
    brokerage: { required: 'yes' | 'no'; amount?: number };
    availability: {
      availableFrom: Date;
      availableImmediately: boolean;
      leaseDuration: string;
      noticePeriod: string;
      petsAllowed: boolean;
      operatingHours: boolean;
    };
  };
  contactInformation: {
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
    propertyName: string;
    intent: string;
    status: string;
  };
}

const CommercialLeaseCoveredSpace = new Schema({
  propertyId: { type: String, required: false, unique: false },
  basicInformation: {
    title: { type: String, required: false },
    type: { type: [String], required: false },
    address: {
      street: { type: String, required: false },
      city: { type: String, required: false },
      state: { type: String, required: false },
      zipCode: { type: String, required: false }
    },
    landmark: { type: String },
    location: {
      latitude: { type: String, required: false },
      longitude: { type: String, required: false }
    },
    isCornerProperty: { type: Boolean, default: false }
  },
  coveredSpaceDetails: {
    totalArea: { type: Number, required: false },
    sqaurefeet: { type: String, required: false },
    coveredarea: { type: Number, required: false },
    roadwidth: { type: Number },
    roadfeet: { type: String },
    ceilingheight: { type: Number },
    ceilingfeet: { type: String },
    noofopenslides: { type: Number }
  },
  propertyDetails: {
    area: {
      totalArea: { type: Number },
      builtUpArea: { type: Number },
      carpetArea: { type: Number }
    },
    floor: {
      floorNumber: { type: Number },
      totalFloors: { type: Number }
    },
    facingDirection: { type: String },
    furnishingStatus: { type: String },
    propertyAmenities: { type: [String] },
    wholeSpaceAmenities: { type: [String] },
    electricitySupply: {
      powerLoad: { type: Number },
      backup: { type: Boolean, default: false }
    },
    waterAvailability: { type: String },
    propertyAge: { type: String },
    propertyCondition: { type: String }
  },
  leaseTerms: {
    leaseAmount: {
      amount: { type: Number },
      type: { type: String, enum: ['Fixed', 'Negotiable'] },
      duration: { type: Number },
      durationUnit: { type: String }
    },
    leaseTenure: {
      minimumTenure: { type: Number },
      minimumUnit: { type: String },
      maximumTenure: { type: Number },
      maximumUnit: { type: String },
      lockInPeriod: { type: Number },
      lockInUnit: { type: String },
      noticePeriod: { type: Number },
      noticePeriodUnit: { type: String }
    },
    maintenanceAmount: {
      amount: { type: Number },
      frequency: { type: String, enum: ['Monthly', 'Quarterly', 'Yearly', 'Half-Yearly'] }
    },
    otherCharges: {
      electricityCharges: {
        type: { type: String, enum: ['inclusive', 'exclusive'] },
        amount: { type: Number }
      },
      waterCharges: {
        type: { type: String, enum: ['inclusive', 'exclusive'] },
        amount: { type: Number }
      },
      gasCharges: {
        type: { type: String, enum: ['inclusive', 'exclusive'] },
        amount: { type: Number }
      },
      otherCharges: {
        type: { type: String, enum: ['inclusive', 'exclusive'] },
        amount: { type: Number }
      }
    },
    brokerage: {
      required: { type: String, enum: ['yes', 'no'] },
      amount: { type: Number }
    },
    availability: {
      availableFrom: { type: Date },
      availableImmediately: { type: Boolean, default: false },
      leaseDuration: { type: String },
      noticePeriod: { type: String },
      petsAllowed: { type: Boolean, default: false },
      operatingHours: { type: Boolean, default: false }
    }
  },
  contactInformation: {
    name: { type: String },
    email: { type: String },
    phone: { type: String },
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
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    createdAt: { type: Date, default: Date.now },
    propertyType: { type: String, default: 'Commercial' },
    intent: { type: String, default: 'Lease' },
    propertyName: { type: String, default: 'Covered Space' },
    status: { type: String, default: 'Available' }
  }
});

export default mongoose.model<ICommercialLeaseCoveredSpace>('CommercialLeaseCoveredSpace', CommercialLeaseCoveredSpace);
