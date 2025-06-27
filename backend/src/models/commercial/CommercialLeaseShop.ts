import { Schema, model, Document, Types } from 'mongoose';

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
    exterior: String[];
    interior: String[];
    floorPlan: String[];
    washrooms: String[];
    lifts: String[];
    emergencyExits: String[];
  };
  videoTour?: String;
  documents: String[];
}

interface IMetadata {
  createdBy: Schema.Types.ObjectId | null;
  createdAt: Date;
  propertyType: string;
  propertyName: string;
  intent: string;
  status: string;
}

interface ILeaseTerms {
  leaseDetails: {
    leaseAmount: {
      amount: number,
      type: string,
      duration: number,
      durationUnit: string,
    },
  },
  tenureDetails: {
    minimumTenure: number;
    minimumUnit: string;
    maximumTenure: number;
    maximumUnit: string;
    lockInPeriod: number;
    lockInUnit: string;
    noticePeriod: number;
    noticePeriodUnit: string;
  },
  maintenanceAmount: {
    amount: number,
    frequency: string,
  },
  otherCharges: {
    water: {
      amount?: number,
      type: string,
    },
    electricity: {
      amount?: number,
      type: string,
    },
    gas: {
      amount?: number,
      type: string,
    },
    others: {
      amount?: number,
      type: string,
    }
  },
  brokerage: {
    required: string,
    amount?: number,
  },
  availability: {
    date: Date,
    availableImmediately: Boolean,
    preferredSaleDuration: String,
    noticePeriod: String,
    isPetsAllowed: Boolean,
    operatingHours: {
      restricted: Boolean,
      restrictions: String
    }
  },

}

interface ICommercialLeaseShop extends Document {
  propertyId: string;

  basicInformation: IBasicInformation;
  shopDetails: {
    frontageWidth: number;
    heightOfShop: number;
    displayWindow: boolean;
    attachedStorageRoom: boolean;
    averageFootTraffic: string;
    customerParking: boolean;
    previousBusiness: string;
  };
  propertyDetails: {
    area: {
      totalArea: number;
      builtUpArea: number;
      carpetArea: number;
    };
    floor: {
      floorNumber: number;
      totalFloors: number;
    };
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
  leaseTerms: ILeaseTerms;
  contactInformation: IContactInformation;
  media: IMedia;
  metadata: IMetadata;
}

// Schema
const CommercialLeaseShopSchema = new Schema<ICommercialLeaseShop>({
  propertyId: { type: String, unique: true },
  basicInformation: {
    title: { type: String },
    Type: [{ type: String }],
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
    },
    landmark: { type: String },
    location: {
      latitude: { type: String },
      longitude: { type: String },
    },
    isCornerProperty: { type: Boolean }
  },
  shopDetails: {
    frontageWidth: { type: Number },
    heightOfShop: { type: Number },
    displayWindow: { type: Boolean, default: false },
    attachedStorageRoom: { type: Boolean, default: false },
    averageFootTraffic: { type: String, enum: ['low', 'medium', 'high', ''] },
    customerParking: { type: Boolean, default: false },
    previousBusiness: { type: String }
  },
  propertyDetails: {
    area: {
      totalArea: { type: Number },
      builtUpArea: { type: Number },
      carpetArea: { type: Number },
    },
    floor: {
      floorNumber: { type: Number },
      totalFloors: { type: Number },
    },
    facingDirection: { type: String },
    furnishingStatus: { type: String },
    propertyAmenities: [{ type: String }],
    wholeSpaceAmenities: [{ type: String }],
    electricitySupply: {
      powerLoad: { type: Number },
      backup: { type: Boolean, default: false },
    },
    waterAvailability: { type: String },
    propertyAge: { type: String },
    propertyCondition: { type: String },
  },
  leaseTerms: {
    leaseDetails: {
      leaseAmount: {
        amount: { type: Number },
        type: { type: String },
        duration: { type: Number },
        durationUnit: { type: String },
      },
    },
    tenureDetails: {
      minimumTenure: { type: String },
      minimumUnit: { type: String },
      maximumTenure: { type: String },
      maximumUnit: { type: String },
      lockInPeriod: { type: String },
      lockInUnit: { type: String },
      noticePeriod: { type: String },
      noticePeriodUnit: { type: String },
    },
    maintenanceAmount: {
      amount: { type: Number },
      frequency: { type: String },
    },
    otherCharges: {
      water: {
        amount: { type: Number },
        type: { type: String },
      },
      electricity: {
        amount: { type: Number },
        type: { type: String },
      },
      gas: {
        amount: { type: Number },
        type: { type: String },
      },
      others: {
        amount: { type: Number },
        type: { type: String },
      }
    },
    brokerage: {
      required: { type: String },
      amount: { type: Number }
    },
    availability: {
      date: { type: Date },
      availableImmediately: { type: Boolean },
      preferredSaleDuration: { type: String },
      noticePeriod: { type: String },
      isPetsAllowed: { type: Boolean },
      operatingHours: {
        restricted: { type: Boolean },
        restrictions: { type: String }
      }
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
    intent: { type: String, default: 'Lease' },
    propertyName: { type: String, default: 'Shop' },
    status: { type: String, default: 'Available' }
  }
}, {
  timestamps: false
});

// Indexes
CommercialLeaseShopSchema.index({ 'basicInformation.city': 1 });
CommercialLeaseShopSchema.index({ 'basicInformation.state': 1 });
CommercialLeaseShopSchema.index({ 'metadata.createdAt': -1 });

// Export model and interfaces
export { ICommercialLeaseShop, IBasicInformation, IContactInformation, IMedia, IMetadata };
export default model<ICommercialLeaseShop>('CommercialLeaseShop', CommercialLeaseShopSchema);