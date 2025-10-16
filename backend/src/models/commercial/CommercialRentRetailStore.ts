import { Schema, model, Document, Types } from 'mongoose';

interface IArea {
  totalArea: number;
  carpetArea: number;
  builtUpArea: number;
}

interface IFloor {
  floorNumber: number;
  totalFloors: number;
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

interface IRentalTerms {
  rentDetails: {
    expectedRent: number;
    isNegotiable: boolean;
    rentType: string;
  }
  securityDeposit: {
    amount: number;
  }
  maintenanceAmount?: {
    amount?: number;
    frequency?: string;
  }
  otherCharges: {
    water: {
      amount?: number;
      type: string;
    }
    electricity: {
      amount?: number;
      type: string;
    }
    gas: {
      amount?: number;
      type: string;
    }
    others: {
      amount?: number;
      type: string;
    }
  }
}

export interface ICommercialRentRetailStore extends Document {
  propertyId: string;

  basicInformation: IBasicInformation;
  retailStoreDetails: {
    location: string,
    anchorStores: boolean,
    footfallData: string,
    signageAllowed: boolean,
    sharedWashrooms: boolean,
    fireExit: boolean
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
  rentalTerms: IRentalTerms;
  brokerage: {
    required: string;
    amount?: number;
  }
  availability: {
    type: string;
    date?: string;
  }
  contactInformation: IContactInformation;
  media: IMedia;
  metadata: IMetadata;
}

// Schema
const CommercialRentRetailStoreSchema = new Schema<ICommercialRentRetailStore>({
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
  retailStoreDetails: {
    location: { type: String, required: true },
    anchorStores: { type: Boolean, default: false },
    footfallData: { type: String, required: true },
    signageAllowed: { type: Boolean, default: false },
    sharedWashrooms: { type: Boolean, default: false },
    fireExit: { type: Boolean, default: false }
  },
  propertyDetails: {
    area: {
      totalArea: { type: Number, required: true },
      carpetArea: { type: Number, required: true },
      builtUpArea: { type: Number, required: true },
    },
    floor: {
      floorNumber: { type: Number, required: true },
      totalFloors: { type: Number, required: true },
    },
    facingDirection: { type: String, required: true },
    furnishingStatus: { type: String, required: true },
    propertyAmenities: { type: [String], required: true },
    wholeSpaceAmenities: { type: [String], required: true },
    electricitySupply: {
      powerLoad: { type: Number, required: true },
      backup: { type: Boolean, required: true },
    },
    waterAvailability: { type: String },
    propertyAge: { type: String },
    propertyCondition: { type: String },
  },
  rentalTerms: {
    rentDetails: {
      expectedRent: { type: Number },
      isNegotiable: { type: Boolean, default: false },
      rentType: { type: String },
    },
    securityDeposit: {
      amount: { type: Number, required: true },
    },
    maintenanceAmount: {
      amount: { type: Number },
      frequency: { type: String },
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
      }
    },
  },
  brokerage: {
    required: { type: String, required: true },
    amount: { type: Number },
  },
  availability: {
    type: { type: String, required: true },
    date: { type: String },
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
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    propertyType: { type: String, default: 'Commercial' },
    intent: { type: String, default: 'Rent' },
    propertyName: { type: String, default: 'Retail Store' },
    status: { type: String, default: 'Available' }
  }
}, {
  timestamps: true
});

// Indexes
// CommercialRentRetailStoreSchema.index({ propertyId: 1 }, { unique: true }); // Removed duplicate index
CommercialRentRetailStoreSchema.index({ 'basicInformation.city': 1 });
CommercialRentRetailStoreSchema.index({ 'basicInformation.state': 1 });
CommercialRentRetailStoreSchema.index({ 'metadata.createdAt': -1 });

// Export model and interfaces
// export { ICommercialrentShop, IBasicInformation, IAvailability, IContactInformation, IMedia, IMetadata };
export default model<ICommercialRentRetailStore>('CommercialRentRetailStore', CommercialRentRetailStoreSchema);