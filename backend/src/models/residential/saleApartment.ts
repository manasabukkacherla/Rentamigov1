import mongoose, { Schema, Document, Types } from 'mongoose';
import { NumberListInstance } from 'twilio/lib/rest/pricing/v2/number';

interface IBasicInformation {
  propertyId: string;
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
interface priceDetails {
  propertyPrice: number;
  pricetype: string;
}
interface registration {
  chargestype: string;
  registrationAmount?: number;
  stampDutyAmount?: number;
}
interface brokerage {
  required: string;
  amount?: number;
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

interface IContactInformation {
  name: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  bestTimeToContact?: string;
}

interface IResidentialSaleApartment extends Document {
  propertyId: string;
  basicInformation: IBasicInformation;
  propertySize: number;
  propertyDetails: propertyDetails;
  priceDetails: priceDetails;
  registration: registration;
  brokerage: brokerage;
  restrictions: {
    foodPreference: string;
    petsAllowed: string;
    tenantType: string;
  }
  flatAmenities: flatamenities;
  societyAmenities: societyAmenities;
  availability: availability;
  media: IMedia;
  metadata: IMetadata;
}

const ResidentailSaleApartmentSchema = new Schema<IResidentialSaleApartment>({
  propertyId: { type: String, unique: true },
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
        latitude: { type: Number },
        longitude: { type: Number },
      },
    },
  },
  propertySize: { type: Number },
  propertyDetails: {
    bedrooms: { type: Number },
    washrooms: { type: Number },
    balconies: { type: Number },
    hasParking: { type: Boolean },
    parkingDetails: {
      twoWheeler: { type: Number },
      fourWheeler: { type: Number },
    },
    extraRooms: {
      servant: { type: Boolean },
      puja: { type: Boolean },
      store: { type: Boolean },
      others: { type: Boolean },
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
      tankerSupply: { type: Boolean },
    },
  },
  restrictions: {
    foodPreference: { type: String },
    petsAllowed: { type: String },
    tenantType: { type: String },
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
    exhaustFan: { type: Number },
  },
  societyAmenities: {
    powerutility: { type: [String] },
    parkingtranspotation: { type: [String] },
    recreationalsportsfacilities: { type: [String] },
    childrenfamilyamenities: { type: [String] },
    healthwellnessfacilities: { type: [String] },
    shoppingconviencestores: { type: [String] },
    ecofriendlysustainable: { type: [String] },
    communityculturalspaces: { type: [String] },
    smarthometechnology: { type: [String] },
    otheritems: { type: [String] },
  },
  priceDetails: {
    propertyPrice: { type: Number },
    pricetype: { type: String },
  },
  registration: {
    chargestype: { type: String },
    registrationAmount: { type: Number },
    stampDutyAmount: { type: Number },
  },
  brokerage: {
    required: { type: String },
    amount: { type: Number },
  },
  availability: {
    type: { type: String },
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
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    propertyType: { type: String, default: 'Residential' },
    intent: { type: String, default: 'Sale' },
    propertyName: { type: String, default: 'Appartment' },
    status: { type: String, default: 'Available' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    updatedAt: { type: Date, default: Date.now },

  }
}, {
  timestamps: true
});

const ResidentialSaleApartment = mongoose.model<IResidentialSaleApartment>('ResidentialSaleApartment', ResidentailSaleApartmentSchema);

export default ResidentialSaleApartment;
