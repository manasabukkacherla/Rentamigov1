import mongoose, { Document, Schema } from "mongoose";

interface IBasicInformation {
  title: string;
  address: {
    flatNo: number;
    showFlatNo: boolean;
    floor: number;
    apartmentName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    location: {
      latitude: string;
      longitude: string;
    }
  };
}

interface ParkingDetails {
  twoWheeler: number;
  fourWheeler: number;
}

interface ExtraRooms {
  servant: boolean;
  puja: boolean;
  store: boolean;
  others: boolean;
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
  lights: number;
  ceilingFan: number;
  geysers: number;
  chimney: boolean;
  callingBell: boolean;
  wardrobes: number;
  lofts: number;
  kitchenCabinets: number;
  clothHanger: number;
  pipedGasConnection: boolean;
  gasStoveWithCylinder: boolean;
  ironingStand: boolean;
  bathtub: boolean;
  shower: boolean;
  sofa: boolean;
  coffeeTable: boolean;
  tvUnit: boolean;
  diningTableWithChairs: number;
  cotWithMattress: number;
  sideTable: number;
  studyTableWithChair: number;
  television: boolean;
  refrigerator: boolean;
  washingMachine: boolean;
  dishwasher: boolean;
  waterPurifier: boolean;
  microwaveOven: boolean;
  inductionCooktop: boolean;
  gasStove: boolean;
  airConditioner: number;
  desertCooler: number;
  ironBox: boolean;
  exhaustFan: number;
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

interface LeaseAmount {
  amount: number;
  type: string;
  duration: number;
  durationUnit: string;
}

interface TenureDetails {
  minimumTenure: number;
  minimumUnit: string;
  maximumTenure: number;
  maximumUnit: string;
  lockInPeriod: number;
  lockInUnit: string;
  noticePeriod: number;
  noticePeriodUnit: string;
}

interface ChargeDetails {
  amount: number;
  type: string;
}

interface OtherCharges {
  water: ChargeDetails;
  electricity: ChargeDetails;
  gas: ChargeDetails;
  others: ChargeDetails;
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

interface Availability {
  type: string;
  date: string;
}

interface Media {
  photos: {
    exterior: string[];
    interior: string[];
    floorPlan: string[];
    washrooms: string[];
    lifts: string[];
    emergencyExits: string[];
    bedrooms: string[];
    halls: string[];
    storerooms: string[];
    kitchen: string[];
  };
  videoTour?: string;
  documents: string[];
}

interface IMetadata {
  createdBy: Schema.Types.ObjectId | string;
  createdAt: Date;
  propertyType: 'Residential';
  propertyName: 'Apartment';
  intent: 'Lease';
  status: 'Available' | 'Leased' | 'Under Maintenance';
}

interface IResidentialLeaseApartment extends Document {
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
  availability: Availability;
  media: Media;
  metadata: IMetadata;
}

const ResidentialLeaseApartmentSchema = new Schema<IResidentialLeaseApartment>({
  propertyId: { type: String, required: false, unique: false },
  basicInformation: {
    title: { type: String },
    address: {
      flatNo: { type: Number },
      showFlatNo: { type: Boolean },
      floor: { type: Number },
      apartmentName: { type: String },
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
      location: {
        latitude: { type: String },
        longitude: { type: String }
      }
    }
  },
  propertySize: { type: Number },
  propertyDetails: {
    bedrooms: { type: Number },
    washrooms: { type: Number },
    balconies: { type: Number },
    hasParking: { type: Boolean },
    parkingDetails: {
      twoWheeler: { type: Number },
      fourWheeler: { type: Number }
    },
    extraRooms: {
      servant: { type: Boolean },
      puja: { type: Boolean },
      store: { type: Boolean },
      others: { type: Boolean }
    },
    utilityArea: { type: String },
    furnishingStatus: { type: String },
    totalFloors: { type: Number },
    propertyOnFloor: { type: Number },
    facing: { type: String },
    propertyAge: { type: String },
    superBuiltUpAreaSqft: { type: Number },
    superBuiltUpAreaSqmt: { type: Number },
    builtUpAreaSqft: { type: Number },
    builtUpAreaSqmt: { type: Number },
    carpetAreaSqft: { type: Number },
    carpetAreaSqmt: { type: Number },
    electricityAvailability: { type: String },
    waterAvailability: {
      borewell: { type: Boolean },
      governmentSupply: { type: Boolean },
      tankerSupply: { type: Boolean }
    }
  },
  restrictions: {
    foodPreference: { type: String },
    petsAllowed: { type: String },
    tenantType: { type: String }
  },
  flatAmenities: {
    lights: { type: Number },
    ceilingFan: { type: Number },
    geysers: { type: Number },
    chimney: { type: Boolean },
    callingBell: { type: Boolean },
    wardrobes: { type: Number },
    lofts: { type: Number },
    kitchenCabinets: { type: Number },
    clothHanger: { type: Number },
    pipedGasConnection: { type: Boolean },
    gasStoveWithCylinder: { type: Boolean },
    ironingStand: { type: Boolean },
    bathtub: { type: Boolean },
    shower: { type: Boolean },
    sofa: { type: Boolean },
    coffeeTable: { type: Boolean },
    tvUnit: { type: Boolean },
    diningTableWithChairs: { type: Number },
    cotWithMattress: { type: Number },
    sideTable: { type: Number },
    studyTableWithChair: { type: Number },
    television: { type: Boolean },
    refrigerator: { type: Boolean },
    washingMachine: { type: Boolean },
    dishwasher: { type: Boolean },
    waterPurifier: { type: Boolean },
    microwaveOven: { type: Boolean },
    inductionCooktop: { type: Boolean },
    gasStove: { type: Boolean },
    airConditioner: { type: Number },
    desertCooler: { type: Number },
    ironBox: { type: Boolean },
    exhaustFan: { type: Number }
  },
  societyAmenities: {
    powerutility: [{ type: String }],
    parkingtranspotation: [{ type: String }],
    recreationalsportsfacilities: [{ type: String }],
    childrenfamilyamenities: [{ type: String }],
    healthwellnessfacilities: [{ type: String }],
    shoppingconviencestores: [{ type: String }],
    ecofriendlysustainable: [{ type: String }],
    communityculturalspaces: [{ type: String }],
    smarthometechnology: [{ type: String }],
    otheritems: [{ type: String }]
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
  },
  availability: {
    type: { type: String },
    date: { type: String }
  },
  media: {
    photos: {
      exterior: [{ type: String, required: false }],
      interior: [{ type: String, required: false }],
      floorPlan: [{ type: String, required: false }],
      washrooms: [{ type: String, required: false }],
      lifts: [{ type: String, required: false }],
      emergencyExits: [{ type: String, required: false }],
      bedrooms: [{ type: String, required: false }],
      halls: [{ type: String, required: false }],
      storerooms: [{ type: String, required: false }],
      kitchen: [{ type: String, required: false }]
    },
    videoTour: { type: String, required: false },
    documents: [{ type: String, required: false }]
  },
  metadata: {
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    propertyType: { type: String, default: 'Residential' },
    propertyName: { type: String, default:'Apartment' },
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

export default mongoose.models.ResidentialLeaseApartment || mongoose.model<IResidentialLeaseApartment>('ResidentialLeaseApartment', ResidentialLeaseApartmentSchema);