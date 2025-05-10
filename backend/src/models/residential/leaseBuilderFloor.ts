import mongoose, { Schema, Document, model } from 'mongoose';

// Schema Interfaces for the Property and Lease Details

interface IBasicInformation {
    // propertyId: string;
  propertyName: string;
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
    };
  };
}

interface PropertyDetails {
  bedrooms: number;
  washrooms: number;
  balconies: number;
  hasParking: boolean;
  parkingDetails: {
    twoWheeler: number;
    fourWheeler: number;
  };
  extraRooms: {
    servant: boolean;
    puja: boolean;
    store: boolean;
    others: boolean;
  };
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
  waterAvailability: {
    borewell: boolean;
    governmentSupply: boolean;
    tankerSupply: boolean;
  };
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

interface IMedia {
  photos: {
    exterior: (File | string)[];
    interior: (File | string)[];
    floorPlan: (File | string)[];
    washrooms: (File | string)[];
    lifts: (File | string)[];
    emergencyExits: (File | string)[];
    bedrooms: (File | string)[];
    halls: (File | string)[];
    storerooms: (File | string)[];
    kitchen: (File | string)[];
  };
  videoTour?: File | string;
  documents: (File | string)[];
}

interface Restrictions {
  foodPreference: string;
  petsAllowed: string;
  tenantType: string;
}

interface ILeaseTerms {
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

interface IAvailability {
  type: string;
  date?: string;
}

interface IMetadata {
  createdBy: string;
  createdAt: string;
}

export interface ILeaseBuilderFloor extends Document {
  propertyId: string;
  basicInformation: IBasicInformation;
  propertySize: number;
  propertyDetails: PropertyDetails;
  restrictions: Restrictions;
  flatAmenities: FlatAmenities;
  societyAmenities: SocietyAmenities;
  leaseTerms: ILeaseTerms;
  availability: IAvailability;
  media: IMedia;
  metadata: IMetadata;
}

const LeaseBuilderFloorSchema = new Schema<ILeaseBuilderFloor>({
  propertyId: { type: String, required: true, unique: true },
  basicInformation: {
    propertyName: { type: String, required: true },
    address: {
      flatNo: { type: Number, required: true },
      showFlatNo: { type: Boolean, required: true },
      floor: { type: Number, required: true },
      apartmentName: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      location: {
        latitude: { type: String, required: true },
        longitude: { type: String, required: true },
      }
    }
  },
  propertySize: { type: Number, required: true },
  propertyDetails: {
    bedrooms: { type: Number, required: true },
    washrooms: { type: Number, required: true },
    balconies: { type: Number, required: true },
    hasParking: { type: Boolean, required: true },
    parkingDetails: {
      twoWheeler: { type: Number, required: true },
      fourWheeler: { type: Number, required: true },
    },
    extraRooms: {
      servant: { type: Boolean, required: true },
      puja: { type: Boolean, required: true },
      store: { type: Boolean, required: true },
      others: { type: Boolean, required: true },
    },
    utilityArea: { type: String, required: true },
    furnishingStatus: { type: String, required: true },
    totalFloors: { type: Number, required: true },
    propertyOnFloor: { type: Number, required: true },
    facing: { type: String, required: true },
    propertyAge: { type: String, required: true },
    superBuiltUpAreaSqft: { type: Number, required: true },
    superBuiltUpAreaSqmt: { type: Number, required: true },
    builtUpAreaSqft: { type: Number, required: true },
    builtUpAreaSqmt: { type: Number, required: true },
    carpetAreaSqft: { type: Number, required: true },
    carpetAreaSqmt: { type: Number, required: true },
    electricityAvailability: { type: String, required: true },
    waterAvailability: {
      borewell: { type: Boolean, required: true },
      governmentSupply: { type: Boolean, required: true },
      tankerSupply: { type: Boolean, required: true },
    },
  },
  restrictions: {
    foodPreference: { type: String, required: true },
    petsAllowed: { type: String, required: true },
    tenantType: { type: String, required: true },
  },
  flatAmenities: {
    lights: { type: Number, required: true },
    ceilingFan: { type: Number, required: true },
    geysers: { type: Number, required: true },
    chimney: { type: Boolean, required: true },
    callingBell: { type: Boolean, required: true },
    wardrobes: { type: Number, required: true },
    lofts: { type: Number, required: true },
    kitchenCabinets: { type: Number, required: true },
    clothHanger: { type: Number, required: true },
    pipedGasConnection: { type: Boolean, required: true },
    gasStoveWithCylinder: { type: Boolean, required: true },
    ironingStand: { type: Boolean, required: true },
    bathtub: { type: Boolean, required: true },
    shower: { type: Boolean, required: true },
    sofa: { type: Boolean, required: true },
    coffeeTable: { type: Boolean, required: true },
    tvUnit: { type: Boolean, required: true },
    diningTableWithChairs: { type: Number, required: true },
    cotWithMattress: { type: Number, required: true },
    sideTable: { type: Number, required: true },
    studyTableWithChair: { type: Number, required: true },
    television: { type: Boolean, required: true },
    refrigerator: { type: Boolean, required: true },
    washingMachine: { type: Boolean, required: true },
    dishwasher: { type: Boolean, required: true },
    waterPurifier: { type: Boolean, required: true },
    microwaveOven: { type: Boolean, required: true },
    inductionCooktop: { type: Boolean, required: true },
    gasStove: { type: Boolean, required: true },
    airConditioner: { type: Number, required: true },
    desertCooler: { type: Number, required: true },
    ironBox: { type: Boolean, required: true },
    exhaustFan: { type: Number, required: true },
  },
  societyAmenities: {
    powerutility: { type: [String], required: true },
    parkingtranspotation: { type: [String], required: true },
    recreationalsportsfacilities: { type: [String], required: true },
    childrenfamilyamenities: { type: [String], required: true },
    healthwellnessfacilities: { type: [String], required: true },
    shoppingconviencestores: { type: [String], required: true },
    ecofriendlysustainable: { type: [String], required: true },
    communityculturalspaces: { type: [String], required: true },
    smarthometechnology: { type: [String], required: true },
    otheritems: { type: [String], required: true },
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
      minimumTenure: { type: Number, required: true },
      minimumUnit: { type: String, required: true },
      maximumTenure: { type: Number, required: true },
      maximumUnit: { type: String, required: true },
      lockInPeriod: { type: Number, required: true },
      lockInUnit: { type: String, required: true },
      noticePeriod: { type: Number, required: true },
      noticePeriodUnit: { type: String, required: true },
    },
    maintenanceAmount: {
      amount: { type: Number, required: true },
      frequency: { type: String, required: true },
    },
    otherCharges: {
      water: {
        amount: { type: Number, required: true },
        type: { type: String, required: true },
      },
      electricity: {
        amount: { type: Number, required: true },
        type: { type: String, required: true },
      },
      gas: {
        amount: { type: Number, required: true },
        type: { type: String, required: true },
      },
      others: {
        amount: { type: Number, required: true },
        type: { type: String, required: true },
      },
    },
    brokerage: {
      required: { type: String, required: true },
      amount: { type: Number },
    },
  },
  availability: {
    type: { type: String, required: true },
    date: { type: String },
  },
  media: {
    photos: {
      exterior: { type: [String], required: true },
      interior: { type: [String], required: true },
      floorPlan: { type: [String], required: true },
      washrooms: { type: [String], required: true },
      lifts: { type: [String], required: true },
      emergencyExits: { type: [String], required: true },
      bedrooms: { type: [String], required: true },
      halls: { type: [String], required: true },
      storerooms: { type: [String], required: true },
      kitchen: { type: [String], required: true },
    },
    videoTour: { type: String },
    documents: { type: [String], required: true },
  },
  metadata: {
    createdBy: { type: String, required: true },
    createdAt: { type: String, required: true },
  },
}, { timestamps: true });

// Create or get model
const LeaseBuilderFloor = model<ILeaseBuilderFloor>('residentialLeaseBuilderFloor', LeaseBuilderFloorSchema);
export default LeaseBuilderFloor;
