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
  retailStoreType: string[];
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
  createdBy: Types.ObjectId;
  createdAt: Date;
}

interface ILeaseTerms {
    leaseTerms: {
        leaseDetails: {
            leaseAmount:number,
            leaseDuration: {
                duration: number,
                years: string,
            },
            leaseType: string,
        },
        tenureDetails: {
            minimumTenure: {
                duration: number,
                years: string,
            },
            maximumTenure: {
                duration: number,
                years: string,
            },
            lockInPeriod: {
                duration: number,
                years: string,
            },
            noticePeriod: { 
                duration: number,
                years: string,
            },
        },
        maintenanceAmount: {
            amount: number,
            frequency: string,
        },
        otherCharges: {
            water: {
                amount: number,
                type: string,
            },
            electricity: {
                amount: number,
                type: string,
            },
            gas: {
                amount: number,
                type: string,
            },
            others: {
                amount: number,
                type: string,
            }
        },
        brokerage: {
            required: string,
            amount: number,
        },
        availability: {
            immediate: Boolean,
            specificDate: Date,
            availableImmediately: Boolean,
            leaseDuration: String,
            noticePeriod: String,
            petsAllowed: Boolean,
            operatingHours: {
                restricted: Boolean,
                restrictions: String
            }
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
    waterAvailability: string[];
    propertyAge: number;
    propertyCondition: string;
  };
  leaseTerms: ILeaseTerms;
  contactInformation: IContactInformation;
  media: IMedia;
  metadata: IMetadata;
}

// Schema
const CommercialLeaseRetailStoreSchema = new Schema<ICommercialLeaseRetailStore>({
  propertyId: { type: String, required: true, unique: true },
  basicInformation: {
    title: { type: String, required: true },
    storeType: [{ type: String, required: true }],
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
    isCornerProperty: { type: Boolean }
  },
  retailStoreDetails: {
    locationType: { type: String, required: true },
    anchorStores: { type: Boolean, default: false },
    footfallData: { type: String, required: true },
    signageAllowed: { type: Boolean, default: false },
    sharedWashrooms: { type: Boolean, default: false },
    fireExit: { type: Boolean, default: false }
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
  
  leaseTerms: {
    leaseDetails: {
        leaseAmount: { type: Number, required: true },
        leaseDuration: {
            duration: { type: Number, required: true },
            years: { type: String, required: true },
        },
        leaseType: { type: String, required: true },
    },
    tenureDetails: {
        minimumTenure: {
            duration: { type: Number, required: true },
            years: { type: String, required: true },
        },
        maximumTenure: {
            duration: { type: Number, required: true },
            years: { type: String, required: true },
        },
        lockInPeriod: {
            duration: { type: Number, required: true },
            years: { type: String, required: true },
        },
        noticePeriod: { 
            duration: { type: Number, required: true },
            years: { type: String, required: true },
        },
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
    brokerage: {
        required: { type: String, enum: ['yes', 'no'], required: true },
        amount: { type: Number }
    },
    availability: {
        immediate: { type: Boolean, default: false },
        specificDate: { type: Date },
        availableImmediately: { type: Boolean, default: false },
        leaseDuration: { type: String },
        noticePeriod: { type: String },
        petsAllowed: { type: Boolean, default: false },
        operatingHours: {
            restricted: { type: Boolean, default: false },
            restrictions: { type: String }
        }
    },
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
    createdAt: { type: Date, default: Date.now }
  }
}, {
  timestamps: true
});

// Indexes
CommercialLeaseRetailStoreSchema.index({ propertyId: 1 }, { unique: true });
CommercialLeaseRetailStoreSchema.index({ 'basicInformation.city': 1 });
CommercialLeaseRetailStoreSchema.index({ 'basicInformation.state': 1 });
CommercialLeaseRetailStoreSchema.index({ 'metadata.createdAt': -1 });

// Export model and interfaces
// export { ICommercialrentShop, IBasicInformation, IAvailability, IContactInformation, IMedia, IMetadata };
export default model<ICommercialLeaseRetailStore>('CommercialLeaseRetail', CommercialLeaseRetailStoreSchema);