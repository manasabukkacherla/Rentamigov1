import mongoose, { Schema, Document } from "mongoose";

interface IBasicInformation {
  title: string;
  propertyAddress: {
    houseName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    pinCode: string;
    location: {
      latitude: string;
      longitude: string;
    };
  };
}

interface ExtraRooms {
  servant: boolean;
  puja: boolean;
  store: boolean;
  others: boolean;
}

interface ParkingDetails {
  twoWheeler: number;
  fourWheeler: number;
}

interface WaterAvailability {
  borewell: boolean;
  governmentSupply: boolean;
  tankerSupply: boolean;
}

interface PropertyDetails {
  bedrooms: number;
  washrooms: number;
  balconies: number;
  hasParking: boolean;
  parkingDetails: ParkingDetails;
  extraRooms: ExtraRooms;
  utilityArea: string;
  furnishingStatus: string;
  flooring: string;
  totalFloors: number;
  propertyOnFloor: number;
  facing: string;
  propertyAge: string;
  superBuiltUpAreaSqft: number;
  superBuiltUpAreaSqmt: number;
  builtUpAreaSqft: number;
  builtUpAreaSqmt: number;
  carpetAreaSqft: number;
  carpetAreaSqmt: number;
  electricityAvailability: string;
  waterAvailability: WaterAvailability;
}

interface FlatAmenities {
  [key: string]: number | boolean;
}

interface SocietyAmenities {
  powerutility: string[];
  parkingtranspotation: string[];
  recreationalsportsfacilities: string[];
  childrenfamilyamenities: string[];
  healthwellnessfacilities: string[];
  shoppingconviencestores: string[];
  ecofriendlysustainable: string[];
  communityculturalspaces: string[];
  smarthometechnology: string[];
  otheritems: string[];
}

interface LeaseTerms {
  leaseDetails: {
    leaseAmount: {
      amount: number;
      type: string;
      duration: number;
      durationUnit: string;
    };
  };
  tenureDetails: {
    minimumTenure: number;
    minimumUnit: string;
    maximumTenure: number;
    maximumUnit: string;
    lockInPeriod: number;
    lockInUnit: string;
    noticePeriod: number;
    noticePeriodUnit: string;
  };
  maintenanceAmount: {
    amount: number;
    frequency: string;
  };
  otherCharges: {
    water: {
      amount: number;
      type: string;
    };
    electricity: {
      amount: number;
      type: string;
    };
    gas: {
      amount: number;
      type: string;
    };
    others: {
      amount: number;
      type: string;
    };
  };
  brokerage: {
    required: string;
    amount?: number;
  };
}

interface IMetadata {
  createdBy: Schema.Types.ObjectId | string;
  createdAt: Date;
  propertyType: string;
  propertyName: string;
  intent: string;
  status: string;
}

interface availability {
  type: string;
  date?: string;
}

interface Media {
  photos: {
    exterior: string[];
    interior: string[];
    floorPlan: string[];
    washrooms: string[];
    garden: string[];
    basement: string[];
    bedrooms: string[];
    halls: string[];
    storerooms: string[];
    kitchen: string[];
    servantQuarters?: string[];
  };
  videoTour?: string;
  documents: string[];
}


interface IResidentialLeaseIndependentHouse extends Document {
  propertyId?: string;
  basicInformation: IBasicInformation;
  propertySize: number;
  propertyDetails: PropertyDetails;
  restrictions: {
    foodPreference: string;
    petsAllowed: string;
    tenantType: string;
  };
  flatAmenities: FlatAmenities;
  societyAmenities: SocietyAmenities;
  leaseTerms: LeaseTerms;
  availability: availability;
  media: Media;
  metadata?: IMetadata;
}

const ResidentialLeaseIndependentHouseSchema = new Schema<IResidentialLeaseIndependentHouse>({
  propertyId: { type: String },
  basicInformation: {
    title: { type: String },
    propertyAddress: {
      houseName: { type: String },
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
      pinCode: { type: String },
      location: {
        latitude: { type: String },
        longitude: { type: String }
      }
    }
  },
  propertySize: { type: Number },
  propertyDetails: {
    bedrooms: Number,
    washrooms: Number,
    balconies: Number,
    hasParking: Boolean,
    parkingDetails: {
      twoWheeler: Number,
      fourWheeler: Number
    },
    extraRooms: {
      servant: Boolean,
      puja: Boolean,
      store: Boolean,
      others: Boolean
    },
    utilityArea: String,
    furnishingStatus: String,
    flooring: String,
    totalFloors: Number,
    propertyOnFloor: Number,
    facing: String,
    propertyAge: String,
    superBuiltUpAreaSqft: Number,
    superBuiltUpAreaSqmt: Number,
    builtUpAreaSqft: Number,
    builtUpAreaSqmt: Number,
    carpetAreaSqft: Number,
    carpetAreaSqmt: Number,
    electricityAvailability: String,
    waterAvailability: {
      borewell: Boolean,
      governmentSupply: Boolean,
      tankerSupply: Boolean
    }
  },
  restrictions: {
    foodPreference: String,
    petsAllowed: String,
    tenantType: String
  },
  flatAmenities: { type: Schema.Types.Mixed },
  societyAmenities: {
    powerutility: [String],
    parkingtranspotation: [String],
    recreationalsportsfacilities: [String],
    childrenfamilyamenities: [String],
    healthwellnessfacilities: [String],
    shoppingconviencestores: [String],
    ecofriendlysustainable: [String],
    communityculturalspaces: [String],
    smarthometechnology: [String],
    otheritems: [String]
  },
  leaseTerms: {
    leaseDetails: {
      leaseAmount: {
        amount: { type: Number },
        type: { type: String },
        duration: { type: Number },
        durationUnit: { type: String }
      }
    },
    tenureDetails: {
      minimumTenure: { type: Number },
      minimumUnit: { type: String },
      maximumTenure: { type: Number },
      maximumUnit: { type: String },
      lockInPeriod: { type: Number },
      lockInUnit: { type: String },
      noticePeriod: { type: Number },
      noticePeriodUnit: { type: String }
    },
    maintenanceAmount: {
      amount: { type: Number },
      frequency: { type: String }
    },
    otherCharges: {
      water: {
        amount: { type: Number },
        type: { type: String }
      },
      electricity: {
        amount: { type: Number },
        type: { type: String }
      },
      gas: {
        amount: { type: Number },
        type: { type: String }
      },
      others: {
        amount: { type: Number },
        type: { type: String }
      }
    },
    brokerage: {
      required: { type: String },
      amount: { type: Number }
    }
  }
  
  
  ,
  availability: {
    type: { type: String },
    date: { type: String }
  },
  media: {
    photos: {
      exterior: [String],
      interior: [String],
      floorPlan: [String],
      washrooms: [String],
      garden: [String],
      basement: [String],
      bedrooms: [String],
      halls: [String],
      storerooms: [String],
      kitchen: [String],
      servantQuarters: [String]
    },
    videoTour: { type: String },
    documents: [String]
  },
  metadata: {
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    propertyType: { type: String, default: 'Residential' },
    propertyName: { type: String, default:'Independent House' },
    intent: { type: String, default: 'Lease' },
    status: { 
      type: String, 
      enum: ['Available', 'Leased', 'Under Maintenance'], 
      default: 'Available' 
    }
  }
}, {
  timestamps: false
});

export default mongoose.models.ResidentialLeaseIndependentHouse ||
  mongoose.model<IResidentialLeaseIndependentHouse>(
    'ResidentialLeaseIndependentHouse',
    ResidentialLeaseIndependentHouseSchema
  );
