import { Schema, model, Document, Types } from 'mongoose';

// Interfaces
interface IArea {
  totalArea: number;
  builtUpArea: number;
  carpetArea: number;
}

interface IBasicInformation {
  title: string;
  Type: string[];
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  landmark: string;
  location: {
    latitude: string;
    longitude: string;
  };
  isCornerProperty: boolean;
}

interface ISpaceDetails {
  totalArea: number;
  areaUnit: string;
  coveredArea: number;
  openArea: number;
  roadWidth: {
    value: number;
    unit: string;
  } | number;
  ceilingHeight?: {
    value: number;
    unit: string;
  } | number;
  noOfOpenSides: string | number;
}

interface IFloor {
  floorNumber: number;
  totalFloors: number;
}

interface IContactInformation {
  name: string;
  email: string;
  phone: string;
  alternatePhone: string;
  bestTimeToContact: string;
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
  videoTour: string | null;
  documents: string[];
}

interface IMetadata {
  createdBy: Schema.Types.ObjectId | null;
  createdAt: Date;
  propertyType: string;
  intent: string;
  propertyName: string;
  status: string;
}

interface ICommercialSellCoveredSpace extends Document {
  propertyId?: string;
  basicInformation: IBasicInformation;
  spaceDetails: ISpaceDetails;
  propertyDetails: {
    ceilingHeight?: any;
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
    propertyAge: string;
    propertyCondition: string;
  };
  pricingDetails: {
    propertyPrice: number;
    pricetype: string;
  };
  registration: {
    chargestype: string;
    registrationAmount: number;
    stampDutyAmount: number;
  };
  brokerage: {
    required: string;
    amount?: number;
  };
  availability: {
    type: "immediate" | "specific";
    date?: Date;
    preferredSaleDuration?: string;
    noticePeriod?: string;
    isPetsAllowed: boolean;
    operatingHours: boolean;
  },
  contactInformation: IContactInformation;
  media: IMedia;
  metadata: IMetadata;
}

// Schema
const CommercialSellCoveredSpaceSchema = new Schema<ICommercialSellCoveredSpace>({
  propertyId: { type: String, unique: true },
  basicInformation: {
    title: { type: String, default: "Unnamed Property", required: true },
    Type: [{ type: String, required: true }],
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
    },
    landmark: { type: String, required: true },
    location: {
      latitude: { type: String, required: true },
      longitude: { type: String, required: true },
    },
    isCornerProperty: { type: Boolean, default: false },
  },
  spaceDetails: {
    totalArea: { type: Number, required: true },
    areaUnit: { type: String, required: true },
    coveredArea: { type: Number, required: true },
    openArea: { type: Number, required: true },
    roadWidth: {
      type: Schema.Types.Mixed,
      required: true,
    },
    ceilingHeight: {
      type: Schema.Types.Mixed,
      required: true,
    },
    openSides: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  propertyDetails: {
    area: {
      totalArea: { type: Number, required: true },
      builtUpArea: { type: Number, required: true },
      carpetArea: { type: Number, required: true },
    },
    floor: {
      floorNumber: { type: Number, required: true },
      totalFloors: { type: Number, required: true },
    },
    facingDirection: { type: String, required: true },
    furnishingStatus: { type: String, required: true },
    propertyAmenities: [{ type: String }],
    wholeSpaceAmenities: [{ type: String }],
    electricitySupply: {
      powerLoad: { type: Number, required: true },
      backup: { type: Boolean, default: false },
    },
    waterAvailability: [{ type: String }],
    propertyAge: { type: String, required: true },
    propertyCondition: { type: String, required: true },
  },
  pricingDetails: {
    propertyPrice: { type: Number, required: true },
    pricetype: { type: String, required: true },
  },
  registration: {
    chargestype: { type: String, required: true },
    registrationAmount: { type: Number },
    stampDutyAmount: { type: Number },
  },
  brokerage: {
    required: { type: String, required: true },
    amount: { type: Number },
  },
  availability: {
    type: { type: String, enum: ["immediate", "specific"] },
    date: { type: Date },
    preferredSaleDuration: { type: String },
    noticePeriod: { type: String },
    isPetsAllowed: { type: Boolean, default: false },
    operatingHours: { type: Boolean, default: false },
  },
  contactInformation: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    alternatePhone: { type: String },
    bestTimeToContact: { type: String },
  },
  media: {
    photos: {
      exterior: [{ type: String }],
      interior: [{ type: String }],
      floorPlan: [{ type: String }],
      washrooms: [{ type: String }],
      lifts: [{ type: String }],
      emergencyExits: [{ type: String }],
    },
    videoTour: { type: String },
    documents: [{ type: String }],
  },
  metadata: {
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    propertyType: { type: String, default: 'Commercial' },
    intent: { type: String, default: 'Sell' },
    propertyName: { type: String, default: 'Covered Space' },
    status: { type: String, default: 'Available' }
  },
});

// Middleware to handle data transformation before validation
// CommercialSellCoveredSpaceSchema.pre('validate', function (next) {
//   if (typeof this.spaceDetails?.roadWidth === 'number') {
//     this.spaceDetails.roadWidth = {
//       value: this.spaceDetails.roadWidth,
//       unit: 'feet'
//     };
//   }

//   if (typeof this.propertyDetails?.ceilingHeight === 'number') {
//     this.propertyDetails.ceilingHeight = {
//       value: this.propertyDetails.ceilingHeight,
//       unit: 'feet'
//     };
//   }

//   // Convert noOfOpenSides from number to string if needed
//   if (typeof this.spaceDetails?.noOfOpenSides === 'number') {
//     this.spaceDetails.noOfOpenSides = this.spaceDetails.noOfOpenSides.toString();
//   }

//   // Set default value for noOfOpenSides if it's not provided
//   if (this.spaceDetails && !this.spaceDetails.noOfOpenSides) {
//     this.spaceDetails.noOfOpenSides = "1";
//   }

//   next();
// });

// Indexes
// CommercialSellCoveredSpaceSchema.index({ propertyId: 1 }, { unique: true }); // Removed duplicate index
CommercialSellCoveredSpaceSchema.index({ 'spaceDetails.totalArea': 1 });
CommercialSellCoveredSpaceSchema.index({ 'propertyDetails.priceDetails.Price': 1 });

// Create and export the model
const CommercialSellCoveredSpace = model<ICommercialSellCoveredSpace>('CommercialSellCoveredSpace', CommercialSellCoveredSpaceSchema);
export default CommercialSellCoveredSpace;
