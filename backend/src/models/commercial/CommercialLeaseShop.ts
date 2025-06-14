import { Schema, model, Document, Types } from 'mongoose';

interface IBasicInformation {
  title: string;
  shopType: string[];
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
    leaseTerms: {
        leaseDetails: {
            leaseAmount:{
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
    propertyAge: number;
    propertyCondition: string;
  };
  leaseTerms: ILeaseTerms;
  contactInformation: IContactInformation;
  media: IMedia;
  metadata: IMetadata;
}

// Schema
const CommercialLeaseShopSchema = new Schema<ICommercialLeaseShop>({
  propertyId: { type: String, required: true, unique: true },
  basicInformation: {
    title: { type: String, required: true },
    shopType: [{ type: String, required: true }],
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
        leaseAmount: { 
            amount: { type: Number, required: true },
            type: { type: String, required: true },
            duration: { type: Number, required: true },
            durationUnit: { type: String, required: true },
        },
    },
    tenureDetails: {
        minimumTenure: {type: String, required: true },
        minimumUnit: {type: String, required: true },
        maximumTenure: {type: String, required: true },
        maximumUnit: {type: String, required: true },
        lockInPeriod: {type: String, required: true },
        lockInUnit: {type: String, required: true },
        noticePeriod: {type: String, required: true },
        noticePeriodUnit: {type: String, required: true },
    },
    maintenanceAmount: {
        amount: { type: Number ,required: true},
        frequency: { type: String ,required: true},
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
        required: { type: String, required: true },
        amount: { type: Number }
    },
    availability: {
        date: { type: Date, required: true },
        availableImmediately: { type: Boolean, required: true },
        preferredSaleDuration: { type: String, required: true },
        noticePeriod: { type: String, required: true },
        isPetsAllowed: { type: Boolean, required: true },
        operatingHours: {
            restricted: { type: Boolean, required: true },
            restrictions: { type: String, required: true }  
        }
    }
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
    intent: { type: String,default: 'Lease' },
    propertyName: { type: String,  default: 'Shop' },
    status: { type: String, default: 'Available' }
  }
}, {
  timestamps: true
});

// Indexes
CommercialLeaseShopSchema.index({ 'basicInformation.city': 1 });
CommercialLeaseShopSchema.index({ 'basicInformation.state': 1 });
CommercialLeaseShopSchema.index({ 'metadata.createdAt': -1 });

// Export model and interfaces
export { ICommercialLeaseShop, IBasicInformation, IContactInformation, IMedia, IMetadata };
export default model<ICommercialLeaseShop>('CommercialLeaseShop', CommercialLeaseShopSchema);