import mongoose, { Schema, Document, Types, model } from 'mongoose';
import { NumberListInstance } from 'twilio/lib/rest/pricing/v2/number';

interface IBasicInformation {
  propertyId?: string;
  title: string;
  propertyType: string;
  plotNumber: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    location?: {
      latitude: string;
      longitude: string;
      locationLabel?: string;
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

interface leaseDetails {
  monthlyRent: number;
  securityDeposit: number;
  maintenanceCharges: {
    amount: number;
    type: 'monthly' | 'quarterly' | 'yearly';
  };
  leaseDuration: {
    minimumDuration: number;
    maximumDuration: number;
    durationUnit: 'months' | 'years';
  };
  rentNegotiable: boolean;
  additionalCharges: {
    waterCharges: {
      type: 'inclusive' | 'exclusive';
      amount?: number;
    };
    electricityCharges: {
      type: 'inclusive' | 'exclusive';
      amount?: number;
    };
    gasCharges: {
      type: 'inclusive' | 'exclusive';
      amount?: number;
    };
    otherCharges: {
      type: 'inclusive' | 'exclusive';
      amount?: number;
    };
  };
  brokerage: {
    type: 'yes' | 'no';
    amount?: number;
  };
}

interface IMetadata {
  createdBy: Schema.Types.ObjectId | string;
  createdAt: Date;
}

interface availability {
  availablefrom: string;
  date?: string;
}

interface IMedia {
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
    servantQuarters: string[];
  };
  mediaItems?: Array<{
    id?: string;
    type?: 'photo' | 'video';
    url?: string;
    title?: string;
    tags?: string[];
    roomType?: string;
    category?: string;
  }>;
  videoTour?: string;
  documents: string[];
}

interface IResidentialLeaseIndependentHouse extends Document {
  propertyId: string;
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
  leaseDetails: leaseDetails;
  media: IMedia;
  metadata: IMetadata;
  availability: availability;
}

const ResidentialLeaseIndependentHouseSchema = new Schema<IResidentialLeaseIndependentHouse>({
  propertyId: { type: String, required: true, unique: true },
  basicInformation: {
    propertyName: { type: String },
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
  leaseDetails: {
    monthlyRent: { type: Number },
    securityDeposit: { type: Number },
    maintenanceCharges: {
      amount: { type: Number },
      type: { type: String },
    },
    leaseDuration: {
      minimumDuration: { type: Number },
      maximumDuration: { type: Number },
      durationUnit: { type: String },
    },
    rentNegotiable: { type: Boolean },
    additionalCharges: {
      waterCharges: {
        type: { type: String },
        amount: { type: Number },
      },
      electricityCharges: {
        type: { type: String },
        amount: { type: Number },
      },
      gasCharges: {
        type: { type: String },
        amount: { type: Number },
      },
      otherCharges: {
        type: { type: String },
        amount: { type: Number },
      },
    },
    brokerage: {
      type: { type: String },
      amount: { type: Number },
    },
  },
  availability: {
    availablefrom: { type: String },
    date: { type: String },
  },
  media: {
    photos: {
      exterior: [{ type: String, required: false }],
      interior: [{ type: String, required: false }],
      floorPlan: [{ type: String, required: false }],
      washrooms: [{ type: String, required: false }],
      garden: [{ type: String, required: false }],
      basement: [{ type: String, required: false }],
      bedrooms: [{ type: String, required: false }],
      halls: [{ type: String, required: false }],
      storerooms: [{ type: String, required: false }],
      kitchen: [{ type: String, required: false }],
      servantQuarters: [{ type: String, required: false }]
    },
    mediaItems: [{
      id: String,
      type: String,
      url: String,
      title: String,
      tags: [String],
      roomType: String,
      category: String
    }],
    videoTour: { type: String, required: false, default: '' },
    documents: [{ type: String, required: false }]
  },
  metadata: {
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
  }
}, {
  timestamps: false
});

// Check if the model exists before compiling it
export default mongoose.models.ResidentialLeaseIndependentHouse || mongoose.model<IResidentialLeaseIndependentHouse>('ResidentialLeaseIndependentHouse', ResidentialLeaseIndependentHouseSchema);
