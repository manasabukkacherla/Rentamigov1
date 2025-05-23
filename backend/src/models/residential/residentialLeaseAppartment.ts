import mongoose, { Document, Schema } from "mongoose";

interface IBasicInformation {
  propertyId?: string;
  title: string;
  showflat: boolean;
  apartmentType: string;
  flatno: number;
  floor: number;
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

interface propertyDetails {
  propertysize: number;
  bedrooms: number;
  washrooms: number;
  bathrooms: number;
  balconies: number;
  parkingdetails: 'yes' | 'No';
  ExtraRooms: string[];
  utility: 'Yes' | 'No';
  Furnishingstatus: 'Unfurnished' | 'Semi-Furnished' | 'Fully-Furnished';
  totalfloors: number;
  propertyonfloor: number;
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
}

interface flatamenities {
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

interface availableitems {
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

interface IResidentialLeaseApartment extends Document {
  propertyId: string;
  basicInformation: IBasicInformation;
  propertyDetails: propertyDetails;
  availableitems: availableitems;
  flatamenities: flatamenities;
  leaseDetails: leaseDetails;
  media: IMedia;
  metadata: IMetadata;
  availability: availability;
}

const ResidentialLeaseApartmentSchema = new Schema<IResidentialLeaseApartment>({
  propertyId: { type: String, required: true, unique: true },
  basicInformation: {
    title: { type: String },
    showflat: { type: Boolean },
    apartmentType: { type: String },
    flatno: { type: Number },
    floor: { type: Number },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
      location: {
        longitude: { type: String },
        latitude: { type: String },
        locationLabel: { type: String },
      }
    },
  },
  propertyDetails: {
    propertysize: { type: Number },
    bedrooms: { type: Number },
    washrooms: { type: Number },
    bathrooms: { type: Number },
    balconies: { type: Number },
    parkingdetails: { type: String },
    ExtraRooms: [{ type: String }],
    utility: { type: String },
    Furnishingstatus: { type: String },
    totalfloors: { type: Number },
    propertyonfloor: { type: Number },
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
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
  }
}, {
  timestamps: true
});

// Check if the model exists before compiling it
export default mongoose.models.ResidentialLeaseApartment || mongoose.model<IResidentialLeaseApartment>('ResidentialLeaseApartment', ResidentialLeaseApartmentSchema); 