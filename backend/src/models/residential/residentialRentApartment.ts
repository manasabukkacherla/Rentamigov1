import mongoose, { Schema, Document, Types } from 'mongoose';
import { NumberListInstance } from 'twilio/lib/rest/pricing/v2/number';

interface IBasicInformation {
  propertyId: string;
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

interface IPhotoDetail {
  id: string;
  url: string;
  title: string;
  category: string;
  tags?: string[];
}

interface IMedia {
  photos: {
    exterior: IPhotoDetail[];
    interior: IPhotoDetail[];
    floorPlan: IPhotoDetail[];
    washrooms: IPhotoDetail[];
    lifts: IPhotoDetail[];
    emergencyExits: IPhotoDetail[];
    bedrooms: IPhotoDetail[];
    halls: IPhotoDetail[];
    storerooms: IPhotoDetail[];
    kitchen: IPhotoDetail[];
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

interface IResidentialRentApartment extends Document {
  propertyId: string;
  basicInformation: IBasicInformation;
  propertySize: number;
  propertyDetails: propertyDetails;
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

const ResidentailRentApartmentSchema = new Schema<IResidentialRentApartment>({
  propertyId: { type: String, required: false, unique: false },
  basicInformation: {
    propertyName: { type: String, required: false },
    address: {
      flatNo: { type: Number, required: false },
      showFlatNo: { type: Boolean, required: false },
      floor: { type: Number, required: false },
      apartmentName: { type: String, required: false },
      street: { type: String, required: false },
      city: { type: String, required: false },
      state: { type: String, required: false },
      zipCode: { type: String, required: false },
      location: {
        latitude: { type: Number, required: false },
        longitude: { type: Number, required: false },
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

    foodPreference: { type: String, required:false },

    petsAllowed: { type: String, required: false },
    tenantType: { type: String, required: false },
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
  availability: {
    type: { type: String, required: false },
    date: { type: String },
  },
  media: {
    photos: {
      exterior: [{ id: { type: String, required: true }, url: { type: String, required: true }, title: { type: String }, category: { type: String }, tags: [{ type: String }] }],
      interior: [{ id: { type: String, required: true }, url: { type: String, required: true }, title: { type: String }, category: { type: String }, tags: [{ type: String }] }],
      floorPlan: [{ id: { type: String, required: true }, url: { type: String, required: true }, title: { type: String }, category: { type: String }, tags: [{ type: String }] }],
      washrooms: [{ id: { type: String, required: true }, url: { type: String, required: true }, title: { type: String }, category: { type: String }, tags: [{ type: String }] }],
      lifts: [{ id: { type: String, required: true }, url: { type: String, required: true }, title: { type: String }, category: { type: String }, tags: [{ type: String }] }],
      emergencyExits: [{ id: { type: String, required: true }, url: { type: String, required: true }, title: { type: String }, category: { type: String }, tags: [{ type: String }] }],
      bedrooms: [{ id: { type: String, required: true }, url: { type: String, required: true }, title: { type: String }, category: { type: String }, tags: [{ type: String }] }],
      halls: [{ id: { type: String, required: true }, url: { type: String, required: true }, title: { type: String }, category: { type: String }, tags: [{ type: String }] }],
      storerooms: [{ id: { type: String, required: true }, url: { type: String, required: true }, title: { type: String }, category: { type: String }, tags: [{ type: String }] }],
      kitchen: [{ id: { type: String, required: true }, url: { type: String, required: true }, title: { type: String }, category: { type: String }, tags: [{ type: String }] }]
    },
    videoTour: { type: String, required: false, default: '' },
    documents: [{ type: String, required: false }]
  },
  metadata: {
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    createdAt: { type: Date, default: Date.now },
  }
}, {
  timestamps: false
}
);

const ResidentialRentApartment = mongoose.model<IResidentialRentApartment>('ResidentialRentApartment', ResidentailRentApartmentSchema);

export default ResidentialRentApartment;
