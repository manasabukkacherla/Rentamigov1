import { Schema, model, Document, Types } from 'mongoose';

interface IArea {
  totalArea: number;
  carpetArea: number;
  builtUpArea: number;
}

interface IFloor {
  floorNumber: number;
  totalFloors: number;
}

interface IBasicInformation {
  title: string;
  retailStoreType: string[];
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  landmark: string;
  location: {
    latitude: number;
    longitude: number;
  };
  isCornerProperty: boolean;
}

interface IContactInformation {
  name: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  bestTimeToContact?: string;
}

interface IMedia {
  photos: {
    exterior: string[]; 
    interior: string[]; 
    floorPlan: string[]; 
    washrooms: string[]; 
    lifts: string[]; 
    emergencyExits: string[]; 
  };
  videoTour?: string; 
  documents: string[]; 
}

interface IMetadata {
  createdBy: Types.ObjectId;
  createdAt: Date;
}

interface IPriceDetails {
  price: number;
  pricePerSqft: number;
  isNegotiable: boolean;
  registrationCharges: {
    registrationAmount: number;
    stampDuty: number;
    otherCharges: number;
  };
  brokerage: {
    required: string;
    amount: number;
  };
  availability: {
    type: string;
    date?: string;
  };
}

interface ICommercialSellRetailStore extends Document {
  propertyId: string;
  
  basicInformation: IBasicInformation;
  retailStoreDetails: {
    location: string,
    anchorStores: boolean,
    footfallData: string,
    signageAllowed: boolean,
    sharedWashrooms: boolean,
    fireExit: boolean
  };
  propertyDetails: {
    area: IArea;
    floor: IFloor;
    facingDirection: string;
    furnishingStatus: string;
    propertyAmenities: string[];
    wholeSpaceAmenities: string[];
    electricitySupply: {
      powerLoad: number;
      backup: boolean;
    };
    waterAvailability: string[];
    propertyAge: number;
    propertyCondition: string;
    ownershipType: string;
    possessionStatus: string;
  };
  priceDetails: IPriceDetails;
  contactInformation: IContactInformation;
  media: IMedia;
  metadata: IMetadata;
}

// Schema
const CommercialSellRetailStoreSchema = new Schema<ICommercialSellRetailStore>({
  propertyId: { type: String, required: true, unique: true },
  basicInformation: {
    title: { type: String, required: true },
    retailStoreType: [{ type: String, required: true }],
    address: { 
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
    },
    landmark: { type: String, required: true },
    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    isCornerProperty: { type: Boolean }
  },
  retailStoreDetails: {
    location: { type: String, required: true },
    anchorStores: { type: Boolean, default: false },
    footfallData: { type: String, required: true },
    signageAllowed: { type: Boolean, default: false },
    sharedWashrooms: { type: Boolean, default: false },
    fireExit: { type: Boolean, default: false }
  },
  propertyDetails: {
    area: {
      totalArea: { type: Number, required: true },
      carpetArea: { type: Number, required: true },
      builtUpArea: { type: Number, required: true }
    },
    floor: {
      floorNumber: { type: Number, required: true },
      totalFloors: { type: Number, required: true }
    },
    facingDirection: { type: String, required: true },
    furnishingStatus: { type: String, required: true },
    propertyAmenities: [{ type: String }],
    wholeSpaceAmenities: [{ type: String }],
    electricitySupply: {
      powerLoad: { type: Number },
      backup: { type: Boolean, default: false }
    },
    waterAvailability: [{ type: String }],
    propertyAge: { type: Number, required: true },
    propertyCondition: { type: String, required: true },
    ownershipType: { type: String, required: true },
    possessionStatus: { type: String, required: true }
  },
  priceDetails: {
    price: { type: Number, required: true },
    pricePerSqft: { type: Number, required: true },
    isNegotiable: { type: Boolean, default: false },
    registrationCharges: {
      registrationAmount: { type: Number },
      stampDuty: { type: Number },
      otherCharges: { type: Number }
    },
    brokerage: {
      required: { type: String, required: true },
      amount: { type: Number }
    },
    availability: {
      type: { type: String, required: true, enum: ['Ready to Move', 'Under Construction', 'Soon', 'Specific Date'] },
      date: { type: String }
    }
  },
  contactInformation: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    alternatePhone: { type: String },
    bestTimeToContact: { type: String }
  },
  media: {
    photos: {
      exterior: [{ type: String }], 
      interior: [{ type: String }], 
      floorPlan: [{ type: String }], 
      washrooms: [{ type: String }],
      lifts: [{ type: String }],
      emergencyExits: [{ type: String }] 
    },
    videoTour: { type: String }, 
    documents: [{ type: String }] 
  },
  metadata: {
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    
  }
}, {
  timestamps: true
});

// Add indexes for common query fields
// CommercialSellRetailStoreSchema.index({ propertyId: 1 }, { unique: true }); // Removed duplicate index
CommercialSellRetailStoreSchema.index({ 'basicInformation.city': 1 });
CommercialSellRetailStoreSchema.index({ 'basicInformation.state': 1 });
CommercialSellRetailStoreSchema.index({ 'metadata.createdAt': -1 });
CommercialSellRetailStoreSchema.index({ 'priceDetails.price': 1 });
CommercialSellRetailStoreSchema.index({ 'propertyDetails.area.totalArea': 1 });

// Export model and interfaces
export default model<ICommercialSellRetailStore>('CommercialSellRetailStore', CommercialSellRetailStoreSchema); 