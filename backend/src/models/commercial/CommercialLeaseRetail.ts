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
  propertyName: string;
  intent: string;
  status: string;
}

interface ILeaseTerms {
  leaseTerms: {
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
          operatingHours: Boolean,
            
      },
    },
  
}

interface ICommercialLeaseRetailStore extends Document {
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
  leaseTerms: ILeaseTerms;
  contactInformation: IContactInformation;
  media: IMedia;
  metadata: IMetadata;
}

// Schema
const CommercialLeaseRetailStoreSchema = new Schema<ICommercialLeaseRetailStore>({
  propertyId: { type: String, unique: true },
  basicInformation: {
    title: { type: String},
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
  retailStoreDetails: {
    location: { type: String },
    anchorStores: { type: Boolean, default: false },
    footfallData: { type: String },
    signageAllowed: { type: Boolean, default: false },
    sharedWashrooms: { type: Boolean, default: false },
    fireExit: { type: Boolean, default: false }
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
        leaseAmount:{
        amount: { type: Number },
        type: { type: String },
        duration: { type: Number },
        durationUnit: { type: String },
      },        
    },
    tenureDetails: {
        minimumTenure: {type: String },
        minimumUnit: {type: String },
        lockInPeriod: {type: String },
        lockInUnit: {type: String },
        noticePeriod: {type: String },
        noticePeriodUnit: {type: String },
    },
    maintenanceAmount: {
        amount: { type: Number },
        frequency: { type: String },
    },
    otherCharges: {
        water: {
            amount: { type: Number },
            type: { type: String},
        },
        electricity: {
            amount: { type: Number },
            type: { type: String},
        },
        gas: {
            amount: { type: Number },
            type: { type: String},
        },
        others: {
            amount: { type: Number },
            type: { type: String},
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
        operatingHours: { type: Boolean },
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
    intent: { type: String,default: 'Lease' },
    propertyName: { type: String,  default: 'Retail' },
    status: { type: String, default: 'Available' }
  }
}, {
  timestamps: true
});

// Indexes
// CommercialLeaseRetailStoreSchema.index({ propertyId: 1 }, { unique: true }); // Removed duplicate index
CommercialLeaseRetailStoreSchema.index({ 'basicInformation.city': 1 });
CommercialLeaseRetailStoreSchema.index({ 'basicInformation.state': 1 });
CommercialLeaseRetailStoreSchema.index({ 'metadata.createdAt': -1 });

// Export model and interfaces
export { ICommercialLeaseRetailStore, IBasicInformation, IArea, IFloor, ILeaseTerms, IContactInformation, IMedia, IMetadata };
export default model<ICommercialLeaseRetailStore>('CommercialLeaseRetail', CommercialLeaseRetailStoreSchema);