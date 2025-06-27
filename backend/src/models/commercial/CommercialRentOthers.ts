import mongoose, { Schema, Document, Types } from 'mongoose';

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

export interface ICommercialRentOthers extends Document {
  propertyId: string;
  basicInformation: IBasicInformation;
  
  propertyDetails: {
    area: IArea;
    floor: IFloor;
    otherDetails: {
      propertyTypeDescription: string;
      specialFeatures: string;
      usageRecommendation: string;
      additionalRequirements: string;
    };
    facingDirection: string;
    furnishingStatus: string;
    propertyAmenities: string[];
    wholeSpaceAmenities: string[];
    waterAvailability: string;
    propertyAge: string;
    propertyCondition: string;
    electricitySupply: {
      powerLoad: number;
      backup: boolean;
    };
  };
  otherDetails: {
    propertyTypeDescription: string,
    specialFeatures: string,
    usageRecommendation: string,
    additionalRequirements: string
  },
  rentalTerms: IRentalTerms;
  brokerage: {
    required: string;
    amount?: number;
  };
  availability: {
    type: 'immediate' | 'specific';
    date?: Date;
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
      exterior: string[];
      interior: string[];
      floorPlan: string[];
      washrooms: string[];
      lifts: string[];
      emergencyExits: string[];
      others: string[];
    };
    videoTour?: string;
    documents: string[];
  };
  metaData: {
    createdBy: Schema.Types.ObjectId | null;
    createdAt: Date;
    propertyType: string;
    intent: string;
    propertyName: string;
    status: string;
  }
}

const CommercialRentOthersSchema: Schema = new Schema({
  propertyId: { type: String, required: true },
  basicInformation: {
    title: { type: String, required: true },
    Type: { type: [String]  , required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true }
    },
    landmark: { type: String },
    location: {
      latitude: { type: String ,required:true},
      longitude: { type: String ,required:true}
    },
    isCornerProperty: { type: Boolean, default: false },
  },
  propertyDetails: {
    area: {
      totalArea: { type: Number },
      carpetArea: { type: Number },
      builtUpArea: { type: Number }
    },
    floor: {
      floorNumber: { type: Number },
      totalFloors: { type: Number }
    },
    otherDetails: {
      propertyTypeDescription: { type: String },
      specialFeatures: { type: String },
      usageRecommendation: { type: String },
      additionalRequirements: { type: String }
    },
    facingDirection: { type: String },
    furnishingStatus: { type: String },
    propertyAmenities: { type: [String], default: [] },
    wholeSpaceAmenities: { type: [String], default: [] },
    waterAvailability: { type: String },
    propertyAge: { type: String, required: true },
    propertyCondition: { type: String },
    electricitySupply: {
      powerLoad: { type: Number },
      backup: { type: Boolean, default: false }
    }
  },
  rentalTerms:  {
    rentDetails: {
      expectedRent: { type: Number, required: true },
      isNegotiable: { type: Boolean, default: false },
      rentType: { type: String, enum: ['inclusive', 'exclusive'], required: true }
    },
    securityDeposit: {
      amount: { type: Number }
    },
    maintenanceAmount: {
      amount: { type: Number },
      frequency: { type: String, enum: ['monthly', 'quarterly', 'half-yearly', 'yearly'] }
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
  otherDetails: {
    propertyTypeDescription: { type: String },
    specialFeatures: { type: String },
    usageRecommendation: { type: String },
    additionalRequirements: { type: String }
  },
  brokerage: {
    required: { type: String },
    amount: { type: Number }
  },
  availability: {
    type: { type: String, enum: ['immediate', 'specific'], required: true },
    date: { type: Date }
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
      exterior: { type: [String], default: [] },
      interior: { type: [String], default: [] },
      floorPlan: { type: [String], default: [] },
      washrooms: { type: [String], default: [] },
      lifts: { type: [String], default: [] },
      emergencyExits: { type: [String], default: [] },
      others: { type: [String], default: [] }
    },
    videoTour: { type: String },
    documents: { type: [String], default: [] }
  },
  metaData: {
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    propertyType: { type: String, default: 'Commercial' },
    intent: { type: String,default: 'Rent' },
    propertyName: { type: String,  default: 'Others' },
    status: { type: String, default: 'Available' } 
  }
});

export default mongoose.model<ICommercialRentOthers>('CommercialRentOthers', CommercialRentOthersSchema); 