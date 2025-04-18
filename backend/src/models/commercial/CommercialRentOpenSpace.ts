import { Schema, model, Document, Types } from 'mongoose';

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
  squareFeet: number;
  coveredArea: number;
  openArea: number;
//   propertyPrice: number;
  roadWidth: {
    value: number; 
    unit: "feet" | "meters";
  };
  ceilingHeight: {
    value: number; 
    unit: "feet" | "meters";
  };
  noOfOpenSides: string;
}

interface IAvailability {
  availableFrom?: string;
  availableImmediately: boolean;
//   leaseDuration: string;
//   noticePeriod: string;
//   petsAllowed: boolean;
//   operatingHours: {
//     restricted: boolean;
//     restrictions: string;
//   };
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


interface IRentalTerms {
    rentDetails: {
        expectedRent: number;
        isNegotiable: boolean;
        rentType: string;
    }
    securityDeposit: {
        amount: number;
    }
    maintenanceAmount: {
        amount: number;
        frequency: string;
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
    brokerage: {
        required: string;
        amount?: number;
    }
    availability: {
        type: string;
        date?: string;
    }
}


interface IFloor {
  floorNumber: number;
  totalFloors: number;
}

interface ICommercialRentOpenSpace extends Document {
  propertyId: string;
  basicInformation: IBasicInformation;
  warehouseDetails: {
    totalArea: number;
    ceilingHeight: number;
    numberOfDocks: number;
    dockHeight: number;
    floorLoadCapacity: number;
    securityFeatures: string[];
    additionalFeatures: string[];
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
    propertyAge: number;
    propertyCondition: string;
  };
//   pricingDetails: IPricingDetails;
//   registration: {
//     chargestype: "inclusive" | "exclusive";
//     registrationAmount?: number;
//     stampDutyAmount?: number;
//   };
 
  rentalTerms: IRentalTerms;
  availability: IAvailability;
  contactInformation: IContactInformation;
  media: IMedia;
  metadata: IMetadata;

}

// Schema
const CommercialRentOpenSpaceSchema = new Schema<ICommercialRentOpenSpace>({
  propertyId: { type: String, required: true, unique: true },
  basicInformation: {
    title: { type: String, required: true },
    warehouseType: [{ type: String, required: true }],
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
  warehouseDetails: {
    ceilingHeight: { type: Number, required: true },
    totalArea: { type: Number, required: true },
    dockHeight: { type: Number, required: true },
    numberOfDocks: { type: Number, default: 0 },
    floorLoadCapacity: { type: Number, required: true },
    securityFeatures: [{ type: String }],
    additionalFeatures: [{ type: String }]
  },
  propertyDetails: {
    area: {
      totalArea: { type: Number, required: true },
      carpetArea: { type: Number, required: true },
      builtUpArea: { type: Number, required: true }
    },
    floor: {
      floorNumber: { type: Number, required: true },
      totalFloors: { type: Number, required: true }
    },
    facingDirection: { type: String },
    furnishingStatus: { type: String },
    propertyAmenities: [{ type: String }],
    wholeSpaceAmenities: [{ type: String }],
    electricitySupply: {
      powerLoad: { type: Number },
      backup: { type: Boolean, default: false }
    },
    waterAvailability: [{ type: String }],
    propertyAge: { type: Number },
    propertyCondition: { type: String }
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
        amount: { type: Number },
    },
    availability: {
        type: { type: String, required: true },
        date: { type: String },
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
    createdAt: { type: Date, default: Date.now }
  }
}, {
  timestamps: true
});

// Indexes
CommercialRentOpenSpaceSchema.index({ propertyId: 1 }, { unique: true });
CommercialRentOpenSpaceSchema.index({ 'basicInformation.city': 1 });
CommercialRentOpenSpaceSchema.index({ 'basicInformation.state': 1 });
CommercialRentOpenSpaceSchema.index({ 'pricingDetails.propertyPrice': 1 });
CommercialRentOpenSpaceSchema.index({ 'propertyDetails.area.totalArea': 1 });
CommercialRentOpenSpaceSchema.index({ 'metadata.createdAt': -1 });

// Export model and interfaces
export { ICommercialRentOpenSpace, IBasicInformation, IArea, IAvailability, IContactInformation, IMedia, IMetadata };
export default model<ICommercialRentOpenSpace>('CommercialRentOpenSpace', CommercialRentOpenSpaceSchema); 