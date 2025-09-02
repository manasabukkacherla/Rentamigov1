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

interface ICommercialrentShop extends Document {
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
const CommercialrentShopSchema = new Schema<ICommercialrentShop>({
  propertyId: { type: String, required: true, unique: true },
  basicInformation: {
    title: { type: String, required: true },
    Type: [{ type: String }],
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
  shopDetails: {
    frontageWidth: { type: Number, required: true },
    heightOfShop: { type: Number, required: true },
    displayWindow: { type: Boolean, default: false },
    attachedStorageRoom: { type: Boolean, default: false },
    averageFootTraffic: { type: String, enum: ['low', 'medium', 'high'] },
    customerParking: { type: Boolean, default: false },
    previousBusiness: { type: String }
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
        amount: { type: Number },
        frequency: { type: String },
    },
    otherCharges: {
        water: {
            amount: { type: Number },
            type: { type: String, required: true},
        },
        electricity: {
            amount: { type: Number },
            type: { type: String, required: true},
        },
        gas: {
            amount: { type: Number },
            type: { type: String, required: true},
        },
        others: {
            amount: { type: Number },
            type: { type: String, required: true},
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
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    propertyType: { type: String, default: 'Commercial' },
    intent: { type: String,default: 'Rent' },
    propertyName: { type: String,  default: 'Shop' },
    status: { type: String, default: 'Available' }
  }
}, {
  timestamps: true
});

// Indexes
// CommercialrentShopSchema.index({ propertyId: 1 }, { unique: true }); // Removed duplicate index
// CommercialrentShopSchema.index({ 'basicInformation.city': 1 });
// CommercialrentShopSchema.index({ 'basicInformation.state': 1 });
CommercialrentShopSchema.index({ 'metadata.createdAt': -1 });

// Export model and interfaces
// export { ICommercialrentShop, IBasicInformation, IAvailability, IContactInformation, IMedia, IMetadata };
export default model<ICommercialrentShop>('CommercialrentShop', CommercialrentShopSchema);