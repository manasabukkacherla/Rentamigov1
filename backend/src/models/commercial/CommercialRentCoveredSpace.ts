import { Schema, model, Document } from 'mongoose';

// Interfaces
interface IArea {
  totalArea: number;
  builtUpArea: number;
  carpetArea: number;
}

interface IBasicInformation {
  title: string;
  spaceType: string[];
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

interface ISpaceDetails {
  totalArea: number;
  areaUnit: string;
  coveredArea: number;
  openArea: number;
  roadWidth: {
    value: number;
    unit: string;
  };
  ceilingHeight: {
    value: number;
    unit: string;
  };
  noOfOpenSides: string;
}

interface IFloor {
  floorNumber: number;
  totalFloors: number;
}

interface IRentalTerms {
  rentDetails: {
    expectedRent: number;
    isNegotiable: boolean;
    rentType: string;
  };
  securityDeposit: {
    amount: number;
  };
  maintenanceAmount: {
    amount: number;
    frequency: string;
  };
  otherCharges: {
    water: {
      amount?: number;
      type: string;
    };
    electricity: {
      amount?: number;
      type: string;
    };
    gas: {
      amount?: number;
      type: string;
    };
    others: {
      amount?: number;
      type: string;
    };
  };
  brokerage: {
    required: string;
    amount?: number;
  };
  availability: {
    type: string;
    availableFrom: string;
    availableImmediately: boolean;
  };
}

interface IContactInformation {
  name: string;
  email: string;
  phone: string;
  preferredContactMethod: string;
  responseTime: string;
  alternatePhone: string;
  bestTimeToContact: string;
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
  videoTour: string | null;
  documents: string[];
}

interface IMetadata {
  createdBy: Schema.Types.ObjectId;
  createdAt: Date;
}

interface ICommercialRentCoveredSpace extends Document {
  propertyId: string;
  basicInformation: IBasicInformation;
  spaceDetails: ISpaceDetails;
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
  rentalTerms: IRentalTerms;
  contactInformation: IContactInformation;
  media: IMedia;
  metadata: IMetadata;
}

// Schema
const CommercialRentCoveredSpaceSchema = new Schema<ICommercialRentCoveredSpace>({
  propertyId: { type: String, required: true, unique: true },
  basicInformation: {
    title: { type: String, required: true },
    spaceType: [{ type: String, required: true }],
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
    isCornerProperty: { type: Boolean },
  },
  spaceDetails: {
    totalArea: { type: Number, required: true },
    areaUnit: { type: String, required: true },
    coveredArea: { type: Number, required: true },
    openArea: { type: Number, required: true },
    roadWidth: {
      value: { type: Number, required: true },
      unit: { type: String, required: true },
    },
    ceilingHeight: {
      value: { type: Number, required: true },
      unit: { type: String, required: true },
    },
    noOfOpenSides: { type: String, required: true },
  },
  propertyDetails: {
    area: {
      totalArea: { type: Number, required: true },
      builtUpArea: { type: Number, required: true },
      carpetArea: { type: Number, required: true },
    },
    floor: {
      floorNumber: { type: Number, required: true },
      totalFloors: { type: Number, required: true },
    },
    facingDirection: { type: String, required: true },
    furnishingStatus: { type: String, required: true },
    propertyAmenities: [{ type: String }],
    wholeSpaceAmenities: [{ type: String }],
    electricitySupply: {
      powerLoad: { type: Number, required: true },
      backup: { type: Boolean, default: false },
    },
    waterAvailability: { type: String, required: true },
    propertyAge: { type: Number, required: true },
    propertyCondition: { type: String, required: true },
  },
  rentalTerms: {
    rentDetails: {
      expectedRent: { type: Number, required: true },
      isNegotiable: { type: Boolean, default: false },
      rentType: { type: String, required: true },
    },
    securityDeposit: {
      amount: { type: Number, required: true },
    },
    maintenanceAmount: {
      amount: { type: Number, required: true },
      frequency: { type: String, required: true },
    },
    otherCharges: {
      water: {
        amount: { type: Number },
        type: { type: String, required: true },
      },
      electricity: {
        amount: { type: Number },
        type: { type: String, required: true },
      },
      gas: {
        amount: { type: Number },
        type: { type: String, required: true },
      },
      others: {
        amount: { type: Number },
        type: { type: String, required: true },
      },
    },
    brokerage: {
      required: { type: String, required: true },
      amount: { type: Number },
    },
    availability: {
      type: { type: String, required: true },
      availableFrom: { type: String, required: true },
      availableImmediately: { type: Boolean, required: true },
    },
  },
  contactInformation: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    preferredContactMethod: { type: String },
    responseTime: { type: String },
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
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
  },
}, {
  timestamps: true,
});

// Indexes
CommercialRentCoveredSpaceSchema.index({ propertyId: 1 }, { unique: true });
CommercialRentCoveredSpaceSchema.index({ 'spaceDetails.totalArea': 1 });
CommercialRentCoveredSpaceSchema.index({ 'propertyDetails.area.totalArea': 1 });

// Export model and interfaces
export {
  ICommercialRentCoveredSpace,
  IBasicInformation,
  ISpaceDetails,
  IArea,
  IFloor,
  IRentalTerms,
  IContactInformation,
  IMedia,
  IMetadata,
};

export default model<ICommercialRentCoveredSpace>('CommercialRentCoveredSpace', CommercialRentCoveredSpaceSchema); 