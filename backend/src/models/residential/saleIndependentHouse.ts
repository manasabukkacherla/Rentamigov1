import mongoose, { Schema, Document, Types } from 'mongoose';
import { NumberListInstance } from 'twilio/lib/rest/pricing/v2/number';

interface IBasicInformation {
  propertyId: string;
  title: string;
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
  propertyType: string;
  intent: string;
  propertyName: string;
  status: string;
  updatedBy: Schema.Types.ObjectId | string;
  updatedAt: Date;
}
interface priceDetails {
  propertyPrice: number;
  pricetype: string;
}
interface registration {
  chargestype: string;
  registrationAmount: number;
  stampDutyAmount: number;
}
interface brokerage {
  required: string;
  amount: number;
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


interface IResidentialSaleIndependentHouse extends Document {
  propertyId: string;
  basicInformation: IBasicInformation;
  propertySize: number;
  propertyDetails: propertyDetails;
  priceDetails: priceDetails;
  registration: registration;
  brokerage: brokerage;
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
  propertyId: { type: String, required: false, unique: false },
  basicInformation: {
    title: { type: String, required: false },
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
  propertySize: { type: Number, required: false },
  propertyDetails: {
    bedrooms: { type: Number, required: false },
    washrooms: { type: Number, required: false },
    balconies: { type: Number, required: false },
    hasParking: { type: Boolean, required: false },
    parkingDetails: {
      twoWheeler: { type: Number, required: false },
      fourWheeler: { type: Number, required: false },
    },
    extraRooms: {
      servant: { type: Boolean, required: false },
      puja: { type: Boolean, required: false },
      store: { type: Boolean, required: false },
      others: { type: Boolean, required: false },
    },
    utilityArea: { type: String, required: false },
    furnishingStatus: { type: String, required: false },
    totalFloors: { type: Number, required: false },
    propertyOnFloor: { type: Number, required: false },
    facing: { type: String, required: false },
    propertyAge: { type: String, required: false },
    superBuiltUpAreaSqft: { type: Number, required: false },
    superBuiltUpAreaSqmt: { type: Number, required: false },
    builtUpAreaSqft: { type: Number, required: false },
    builtUpAreaSqmt: { type: Number, required: false },
    carpetAreaSqft: { type: Number, required: false },
    carpetAreaSqmt: { type: Number, required: false },
    electricityAvailability: { type: String, required: false },
    waterAvailability: {
      borewell: { type: Boolean, required: false },
      governmentSupply: { type: Boolean, required: false },
      tankerSupply: { type: Boolean, required: false },
    },
  },
  restrictions: {
    foodPreference: { type: String },
    petsAllowed: { type: String },
    tenantType: { type: String },
  },
  flatAmenities: {
    lights: { type: Number, required: false },
    ceilingFan: { type: Number, required: false },
    geysers: { type: Number, required: false },
    chimney: { type: Boolean, required: false },
    callingBell: { type: Boolean, required: false },
    wardrobes: { type: Number, required: false },
    lofts: { type: Number, required: false },
    kitchenCabinets: { type: Number, required: false },
    clothHanger: { type: Number, required: false },
    pipedGasConnection: { type: Boolean, required: false },
    gasStoveWithCylinder: { type: Boolean, required: false },
    ironingStand: { type: Boolean, required: false },
    bathtub: { type: Boolean, required: false },
    shower: { type: Boolean, required: false },
    sofa: { type: Boolean, required: false },
    coffeeTable: { type: Boolean, required: false },
    tvUnit: { type: Boolean, required: false },
    diningTableWithChairs: { type: Number, required: false },
    cotWithMattress: { type: Number, required: false },
    sideTable: { type: Number, required: false },
    studyTableWithChair: { type: Number, required: false },
    television: { type: Boolean, required: false },
    refrigerator: { type: Boolean, required: false },
    washingMachine: { type: Boolean, required: false },
    dishwasher: { type: Boolean, required: false },
    waterPurifier: { type: Boolean, required: false },
    microwaveOven: { type: Boolean, required: false },
    inductionCooktop: { type: Boolean, required: false },
    gasStove: { type: Boolean, required: false },
    airConditioner: { type: Number, required: false },
    desertCooler: { type: Number, required: false },
    ironBox: { type: Boolean, required: false },
    exhaustFan: { type: Number, required: false },
  },
  societyAmenities: {
    powerutility: { type: [String], required: false },
    parkingtranspotation: { type: [String], required: false },
    recreationalsportsfacilities: { type: [String], required: false },
    childrenfamilyamenities: { type: [String], required: false },
    healthwellnessfacilities: { type: [String], required: false },
    shoppingconviencestores: { type: [String], required: false },
    ecofriendlysustainable: { type: [String], required: false },
    communityculturalspaces: { type: [String], required: false },
    smarthometechnology: { type: [String], required: false },
    otheritems: { type: [String], required: false },
  },
  priceDetails: {
    propertyPrice: { type: Number, required: false },
    pricetype: { type: String, required: false },
  },
  registration: {
    chargestype: { type: String, required: false },
    registrationAmount: { type: Number, required: false },
    stampDutyAmount: { type: Number, required: false },
  },
  brokerage: {
    required: { type: String, required: false },
    amount: { type: Number, required: false },
  },
  availability: {
    type: { type: String, required: false },
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
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    createdAt: { type: Date, default: Date.now },
    propertyType: { type: String, default: 'Residential' },
    intent: { type: String, default: 'Sale' },
    propertyName: { type: String, default: 'Independent House' },
    status: { type: String, default: 'Available' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    updatedAt: { type: Date, default: Date.now },

  }
}, {
  timestamps: false
}
);

const ResidentialSaleIndependentHouse = mongoose.model<IResidentialSaleIndependentHouse>('ResidentialSaleIndependentHouse', ResidentailsaleIndependentHouseSchema);

export default ResidentialSaleIndependentHouse;