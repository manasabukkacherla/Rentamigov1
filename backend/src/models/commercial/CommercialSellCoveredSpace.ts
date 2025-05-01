import { Schema, model, Document, Types } from 'mongoose';
import { IAvailability } from './CommercialSellWarehouse';

// Interfaces
interface IArea {
  totalArea: number;
  builtUpArea: number;
  carpetArea: number;
}

interface IBasicInformation {
  title: string;
  spaceType: string[];
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
    ceilingHeight: {
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
  userId: Schema.Types.ObjectId | null;
  userName: string;
  createdAt: Date;
}

interface ICommercialSellCoveredSpace extends Document {
  propertyId?: string;
  basicInformation: IBasicInformation;
  spaceDetails: ISpaceDetails;
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
    priceDetails: {
      Price: number;
      isNegotiable: boolean;
      registrationCharges: {
        includedInPrice: boolean;
        amount?: number;
        stampDuty?: number;
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
      }
    }
  };
  availability: IAvailability;
  contactInformation: IContactInformation;
  media: IMedia;
  metadata: IMetadata;
}

// Schema
const CommercialSellCoveredSpaceSchema = new Schema<ICommercialSellCoveredSpace>({
  propertyId: { type: String, unique: true },
  basicInformation: {
    title: { type: String, required: true },
    spaceType: [{ type: String, required: true }],
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
      validate: {
        validator: function(v: any) {
          return (
            typeof v === 'number' || 
            (typeof v === 'object' && v !== null && 'value' in v && 'unit' in v)
          );
        },
        message: 'roadWidth must be either a number or an object with value and unit properties'
      }
    },
    ceilingHeight: {
      type: Schema.Types.Mixed,
      required: true,
      validate: {
        validator: function(v: any) {
          return (
            typeof v === 'number' || 
            (typeof v === 'object' && v !== null && 'value' in v && 'unit' in v)
          );
        },
        message: 'ceilingHeight must be either a number or an object with value and unit properties'
      }
    },
    noOfOpenSides: { 
      type: Schema.Types.Mixed, 
      required: true,
      validate: {
        validator: function(v: any) {
          return typeof v === 'string' || typeof v === 'number';
        },
        message: 'noOfOpenSides must be either a string or a number'
      }
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
    propertyAge: { type: Number, required: true },
    propertyCondition: { type: String, required: true },
    priceDetails: {
      Price: { type: Number, required: true },
      isNegotiable: { type: Boolean, default: false },
      registrationCharges: {
        includedInPrice: { type: Boolean, default: false },
        amount: { type: Number },
        stampDuty: { type: Number },
      },
      brokerage: {
        required: { type: String, required: true },
        amount: { type: Number },
      },
      availability: {
        type: { type: String, enum: ["immediate", "specific"], required: true },
        date: { type: Date },
        preferredSaleDuration: { type: String },
        noticePeriod: { type: String },
        isPetsAllowed: { type: Boolean, default: false },
        operatingHours: { type: Boolean, default: false },
      }
    }
  },
  availability: { type: Schema.Types.Mixed, required: true },
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
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userName:{type:String,default:"Not Specified"},
    createdAt: { type: Date, default: Date.now },
  },
});

// Middleware to handle data transformation before validation
CommercialSellCoveredSpaceSchema.pre('validate', function(next) {
  if (typeof this.spaceDetails?.roadWidth === 'number') {
    this.spaceDetails.roadWidth = {
      value: this.spaceDetails.roadWidth,
      unit: 'feet'
    };
  }
  
  if (typeof this.spaceDetails?.ceilingHeight === 'number') {
    this.spaceDetails.ceilingHeight = {
      value: this.spaceDetails.ceilingHeight,
      unit: 'feet'
    };
  }
  
  // Convert noOfOpenSides from number to string if needed
  if (typeof this.spaceDetails?.noOfOpenSides === 'number') {
    this.spaceDetails.noOfOpenSides = this.spaceDetails.noOfOpenSides.toString();
  }
  
  // Set default value for noOfOpenSides if it's not provided
  if (this.spaceDetails && !this.spaceDetails.noOfOpenSides) {
    this.spaceDetails.noOfOpenSides = "1";
  }
  
  next();
});

// Indexes
// CommercialSellCoveredSpaceSchema.index({ propertyId: 1 }, { unique: true }); // Removed duplicate index
CommercialSellCoveredSpaceSchema.index({ 'spaceDetails.totalArea': 1 });
CommercialSellCoveredSpaceSchema.index({ 'propertyDetails.priceDetails.Price': 1 });

// Create and export the model
const CommercialSellCoveredSpace = model<ICommercialSellCoveredSpace>('CommercialSellCoveredSpace', CommercialSellCoveredSpaceSchema);
export default CommercialSellCoveredSpace;
