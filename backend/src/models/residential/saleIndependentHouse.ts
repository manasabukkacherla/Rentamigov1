import mongoose, { Schema, Document, Types } from 'mongoose';
import { NumberListInstance } from 'twilio/lib/rest/pricing/v2/number';

interface IBasicInformation {
  propertyId: string;
  propertyName: string;
  address: {
    houseNo: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    pinCode: string;
    location: {
      latitude: number;
      longitude: number;
    };
  };
}

interface propertyDetails {
  bedrooms: number;
  washrooms: number;
  balconies: number;
  hasParking: boolean;
  parkingDetails: {
    twoWheeler: number;
    fourWheeler: number;
  },
  extraRooms: {
    servant: boolean;
    puja: boolean;
    store: boolean;
    others: boolean;
  },
  utilityArea: string;
  furnishingStatus: string;
  // flooring: '',
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
  }
};

interface flatamenities {
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

interface societyAmenities {
  powerutility: string[];
  parkingtranspotation: string[];
  recreationalsportsfacilities: string[];
  childrenfamilyamenities: string[];
  healthwellnessfacilities: string[];
  shoppingconviencestores: string[];
  ecofriendlysustainable: string[];
  communityculturalspaces: string[]
  smarthometechnology: string[]
  otheritems: string[];
}

interface IMetadata {
  createdBy: Schema.Types.ObjectId | string;
  createdAt: Date;
}

interface availability {
  type: string;
  date?: string;
}

interface IMedia {
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


interface IResidentialSaleIndependentHouse extends Document {
  propertyId: string;
  basicInformation: IBasicInformation;
  propertySize: number;
  propertyDetails: propertyDetails;
  restrictions?: {
    foodPreference?: string;
    petsAllowed?: string;
    tenantType?: string;
  }
  flatAmenities: flatamenities;
  societyAmenities: societyAmenities;
  availability: availability;
  media: IMedia;
  metadata: IMetadata;
}

const ResidentailsaleIndependentHouseSchema = new Schema<IResidentialSaleIndependentHouse>({
  propertyId: { type: String, required: true, unique: true },
  basicInformation: {
    propertyName: { type: String, required: true },
    address: {
      houseNo: { type: String },
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
      pinCode: { type: String },
      location: {
        latitude: { type: String },
        longitude: { type: String },
      },
    },
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
    foodPreference: { type: String },
    petsAllowed: { type: String },
    tenantType: { type: String },
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
  availability: {
    type: { type: String, required: true },
    date: { type: String },
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
    videoTour: { type: String },
    documents: [{ type: String, required: false }]
  },
  metadata: {
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
  }
}, {
  timestamps: true
}
);

const ResidentialSaleIndependentHouse = mongoose.model<IResidentialSaleIndependentHouse>('ResidentialSaleIndependentHouse', ResidentailsaleIndependentHouseSchema);

export default ResidentialSaleIndependentHouse;