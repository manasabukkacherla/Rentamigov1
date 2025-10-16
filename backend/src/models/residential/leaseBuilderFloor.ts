import mongoose, { Schema, Document } from 'mongoose';

interface Availability {
  type: string;
  date: string;
}
interface ILeaseBuilderFloor extends Document {
  propertyId: string;
  basicInformation: {
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
  };
  propertySize: number;
  propertyDetails: {
    bedrooms: number;
    washrooms: number;
    balconies: number;
    hasParking: boolean;
    parkingDetails: {
      twoWheeler: number;
      fourWheeler: number;
    };
    extraRooms: {
      servant: boolean;
      puja: boolean;
      store: boolean;
      others: boolean;
    };
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
    waterAvailability: {
      borewell: boolean;
      governmentSupply: boolean;
      tankerSupply: boolean;
    };
  };
  restrictions: {
    foodPreference: string;
    petsAllowed: string;
    tenantType: string;
  };
  flatAmenities: Record<string, number | boolean>;
  societyAmenities: Record<string, string[]>;
  rentalTerms: {
    rentDetails: {
      expectedRent: number;
      isNegotiable: boolean;
      rentType: string;
    };
    securityDeposit: {
      amount: number;
    };
    maintenanceAmount?: {
      amount?: number;
      frequency?: string;
    };
    otherCharges: Record<string, { amount?: number; type: string }>;
    brokerage: {
      required: string;
      amount?: number;
    };
  };
  availability: Availability;
  media: {
    photos: Record<string, string[]>;
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
  };
  metadata: {
    createdBy: Schema.Types.ObjectId | string;
    createdAt: Date;
    propertyType: string;
    intent: string;
    propertyName: string;
    status: string;
    updatedBy: Schema.Types.ObjectId | string;
    updatedAt: Date;
  };
}

const LeaseBuilderFloorSchema = new Schema<ILeaseBuilderFloor>({
  propertyId: { type: String, required: true, unique: true },
  basicInformation: {
    propertyName: { type: String },
    address: {
      flatNo: Number,
      showFlatNo: Boolean,
      floor: Number,
      apartmentName: String,
      street: String,
      city: String,
      state: String,
      zipCode: String,
      location: {
        latitude: Number,
        longitude: Number
      }
    }
  },
  propertySize: Number,
  propertyDetails: {
    bedrooms: Number,
    washrooms: Number,
    balconies: Number,
    hasParking: Boolean,
    parkingDetails: {
      twoWheeler: Number,
      fourWheeler: Number
    },
    extraRooms: {
      servant: Boolean,
      puja: Boolean,
      store: Boolean,
      others: Boolean
    },
    utilityArea: String,
    furnishingStatus: String,
    totalFloors: Number,
    propertyOnFloor: Number,
    facing: String,
    propertyAge: String,
    superBuiltUpAreaSqft: Number,
    superBuiltUpAreaSqmt: Number,
    builtUpAreaSqft: Number,
    builtUpAreaSqmt: Number,
    carpetAreaSqft: Number,
    carpetAreaSqmt: Number,
    electricityAvailability: String,
    waterAvailability: {
      borewell: Boolean,
      governmentSupply: Boolean,
      tankerSupply: Boolean
    }
  },
  restrictions: {
    foodPreference: String,
    petsAllowed: String,
    tenantType: String
  },
  flatAmenities: Schema.Types.Mixed,
  societyAmenities: Schema.Types.Mixed,
  rentalTerms: {
    rentDetails: {
      expectedRent: Number,
      isNegotiable: Boolean,
      rentType: String
    },
    securityDeposit: {
      amount: Number
    },
    maintenanceAmount: {
      amount: Number,
      frequency: String
    },
    otherCharges: Schema.Types.Mixed,
    brokerage: {
      required: String,
      amount: Number
    }
  },
  availability: {
    type: { type: String },
    date: { type: String }
  },
  media: {
    photos: Schema.Types.Mixed,
    mediaItems: [Schema.Types.Mixed],
    videoTour: String,
    documents: [String]
  },
  metadata: {
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    propertyType: { type: String, default: 'Residential' },
    intent: { type: String, default: 'Lease' },
    propertyName: { type: String, default: 'Builder Floor' },
    status: { type: String, default: 'Available' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    updatedAt: { type: Date, default: Date.now },
  }
});

export default mongoose.model<ILeaseBuilderFloor>('ResidentialLeaseBuilderFloor', LeaseBuilderFloorSchema);