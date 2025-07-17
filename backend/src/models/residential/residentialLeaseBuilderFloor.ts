import mongoose, { Document, Schema } from "mongoose";

interface IBasicInformation {
  propertyId?: string;
  title: string;
  // builderName: string;
  floorNumber: number;
  totalFloors: number;
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

interface IPropertyDetails {
  propertysize: number;
  bedrooms: number;
  washrooms: number;
  bathrooms: number;
  balconies: number;
  parkingdetails: string;
  ExtraRooms: string[];
  utility: string;
  Furnishingstatus: string;
  totalfloors: number;
  floorNumber: number;
  propertyfacing: string;
  propertyage: string;
  superareasqft: number;
  superareasqmt: number;
  builtupareasqft: number;
  builtupareasqmt: number;
  carpetareasqft: number;
  carpetareasqmt: number;
  electricityavailability: string;
  wateravailability: string[];
  servantRoom: boolean;
  studyRoom: boolean;
  pooja: boolean;
}

interface IFloorAmenities {
  lights: number;
  geysers: number;
  lofts: number;
  clothHanger: number;
  cotWithMattress: number;
  airConditioner: number;
  exhaustFan: number;
  ceilingFan: number;
  wardrobes: number;
  kitchenCabinets: number;
  diningTableWithChairs: number;
  sideTable: number;
  desertCooler: number;
}

interface IAvailableItems {
  availableitems: string[];
  securityandsafety: string[];
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

interface ILeaseDetails {
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

interface IAvailability {
  type: 'immediate' | 'specific';
  date?: string;
}

interface IMedia {
  photos: {
    exterior: string[];
    interior: string[];
    floorPlan: string[];
    washrooms: string[];
    bedrooms: string[];
    halls: string[];
    storerooms: string[];
    kitchen: string[];
    servantRoom: string[];
    studyRoom: string[];
    pooja: string[];
    lifts: string[];
    emergencyExits: string[];
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

interface IMetadata {
  createdBy: Schema.Types.ObjectId | string;
  createdAt: Date;
}

interface ILeaseBuilderFloor extends Document {
  propertyId?: string;
  basicInformation: IBasicInformation;
  propertyDetails: IPropertyDetails;
  availableitems: IAvailableItems;
  floorAmenities: IFloorAmenities;
  leaseDetails: ILeaseDetails;
  availability: IAvailability;
  media: IMedia;
  metadata: IMetadata;
}

const LeaseBuilderFloorSchema = new Schema<ILeaseBuilderFloor>({
  propertyId: { type: String, required: false, unique: false },
  basicInformation: {
    title: { type: String, required: false },
    // builderName: { type: String, required: false },
    floorNumber: { type: Number, required: false },
    totalFloors: { type: Number, required: false },
    address: {
      street: { type: String, required: false },
      city: { type: String, required: false },
      state: { type: String, required: false },
      zipCode: { type: String, required: false },
      location: {
        latitude: { type: String },
        longitude: { type: String },
        locationLabel: { type: String }
      }
    }
  },
  propertyDetails: {
    propertysize: { type: Number, required: false },
    bedrooms: { type: Number, required: false },
    washrooms: { type: Number, required: false },
    bathrooms: { type: Number, required: false },
    balconies: { type: Number, required: false },
    parkingdetails: { type: String },
    ExtraRooms: [{ type: String }],
    utility: { type: String },
    Furnishingstatus: { type: String },
    totalfloors: { type: Number },
    floorNumber: { type: Number },
    propertyfacing: { type: String },
    propertyage: { type: String },
    superareasqft: { type: Number },
    superareasqmt: { type: Number },
    builtupareasqft: { type: Number },
    builtupareasqmt: { type: Number },
    carpetareasqft: { type: Number },
    carpetareasqmt: { type: Number },
    electricityavailability: { type: String },
    wateravailability: [{ type: String }],
    servantRoom: { type: Boolean },
    studyRoom: { type: Boolean },
    pooja: { type: Boolean }
  },
  availableitems: {
    availableitems: [{ type: String }],
    securityandsafety: [{ type: String }],
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
  floorAmenities: {
    lights: { type: Number },
    geysers: { type: Number },
    lofts: { type: Number },
    clothHanger: { type: Number },
    cotWithMattress: { type: Number },
    airConditioner: { type: Number },
    exhaustFan: { type: Number },
    ceilingFan: { type: Number },
    wardrobes: { type: Number },
    kitchenCabinets: { type: Number },
    diningTableWithChairs: { type: Number },
    sideTable: { type: Number },
    desertCooler: { type: Number }
  },
  leaseDetails: {
    monthlyRent: { type: Number, required: false },
    securityDeposit: { type: Number, required: false },
    maintenanceCharges: {
      amount: { type: Number },
      type: { type: String, enum: ['monthly', 'quarterly', 'yearly'] }
    },
    leaseDuration: {
      minimumDuration: { type: Number },
      maximumDuration: { type: Number },
      durationUnit: { type: String, enum: ['months', 'years'] }
    },
    rentNegotiable: { type: Boolean },
    additionalCharges: {
      waterCharges: {
        type: { type: String, enum: ['inclusive', 'exclusive'] },
        amount: { type: Number }
      },
      electricityCharges: {
        type: { type: String, enum: ['inclusive', 'exclusive'] },
        amount: { type: Number }
      },
      gasCharges: {
        type: { type: String, enum: ['inclusive', 'exclusive'] },
        amount: { type: Number }
      },
      otherCharges: {
        type: { type: String, enum: ['inclusive', 'exclusive'] },
        amount: { type: Number }
      }
    },
    brokerage: {
      type: { type: String, enum: ['yes', 'no'] },
      amount: { type: Number }
    }
  },
  availability: {
    type: { type: String, enum: ['immediate', 'specific'], required: false },
    date: { type: String }
  },
  media: {
    photos: {
      exterior: [{ type: String }],
      interior: [{ type: String }],
      floorPlan: [{ type: String }],
      washrooms: [{ type: String }],
      bedrooms: [{ type: String }],
      halls: [{ type: String }],
      storerooms: [{ type: String }],
      kitchen: [{ type: String }],
      servantRoom: [{ type: String }],
      studyRoom: [{ type: String }],
      pooja: [{ type: String }],
      lifts: [{ type: String }],
      emergencyExits: [{ type: String }]
    },
    mediaItems: [{
      id: { type: String },
      type: { type: String, enum: ['photo', 'video'] },
      url: { type: String },
      title: { type: String },
      tags: [{ type: String }],
      roomType: { type: String },
      category: { type: String }
    }],
    videoTour: { type: String },
    documents: [{ type: String }]
  },
  metadata: {
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    createdAt: { type: Date, default: Date.now }
  }
});

export default mongoose.model<ILeaseBuilderFloor>('LeaseBuilderFloor', LeaseBuilderFloorSchema); 