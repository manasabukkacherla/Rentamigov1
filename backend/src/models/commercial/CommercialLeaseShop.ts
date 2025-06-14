import { Schema, model, Document, Types } from 'mongoose';

interface IBasicInformation {
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
  propertyId: { type: String, required: false, unique: false },
  basicInformation: {
    title: { type: String, required: false },
    type: [{ type: [String], required: false }],
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
    isCornerProperty: { type: Boolean }
  },
  shopDetails: {
    frontageWidth: { type: Number, required: false },
    heightOfShop: { type: Number, required: false },
    displayWindow: { type: Boolean, default: false },
    attachedStorageRoom: { type: Boolean, default: false },
    averageFootTraffic: { type: String, enum: ['low', 'medium', 'high'] },
    customerParking: { type: Boolean, default: false },
    previousBusiness: { type: String }
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
    waterAvailability: { type: String, required: false },
    propertyAge: { type: Number, required: false },
    propertyCondition: { type: String, required: false },
  },    
  leaseTerms: {
    leaseDetails: {
        leaseAmount: { 
            amount: { type: Number, required: false },
            type: { type: String, required: false },
            duration: { type: Number, required: false },
            durationUnit: { type: String, required: false },
        },
    },
    tenureDetails: {
        minimumTenure: {type: String, required: false },
        minimumUnit: {type: String, required: false },
        maximumTenure: {type: String, required: false },
        maximumUnit: {type: String, required: false },
        lockInPeriod: {type: String, required: false },
        lockInUnit: {type: String, required: false },
        noticePeriod: {type: String, required: false },
        noticePeriodUnit: {type: String, required: false },
    },
    maintenanceAmount: {
        amount: { type: Number ,required: false},
        frequency: { type: String ,required: false},
    },
    otherCharges: {
        water: {
            amount: { type: Number },
            type: { type: String, required: false},
        },
        electricity: {
            amount: { type: Number },
            type: { type: String, required: false},
        },
        gas: {
            amount: { type: Number },
            type: { type: String, required: false},
        },
        others: {
            amount: { type: Number },
            type: { type: String, required: false},
        }
    },
    brokerage: {
        required: { type: String, required: false },
        amount: { type: Number }
    },
    availability: {
        date: { type: Date, required: false },
        availableImmediately: { type: Boolean, required: false },
        preferredSaleDuration: { type: String, required: false },
        noticePeriod: { type: String, required: false },
        isPetsAllowed: { type: Boolean, required: false },
        operatingHours: {
            restricted: { type: Boolean, required: false },
            restrictions: { type: String, required: false }  
        }
    }
  },
  contactInformation: {
    name: { type: String, required: false },
    email: { type: String, required: false },
    phone: { type: String, required: false },
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
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    createdAt: { type: Date, default: Date.now },
    propertyType: { type: String, default: 'Commercial' },
    intent: { type: String,default: 'Lease' },
    propertyName: { type: String,  default: 'Shop' },
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