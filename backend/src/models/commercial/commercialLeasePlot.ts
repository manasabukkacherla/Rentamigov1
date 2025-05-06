import { Schema, model, Document } from 'mongoose';

interface ILocation {
  latitude: string;
  longitude: string;
}

interface IAddress {
  houseName: string;
  street: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  pinCode: string;
  location: ILocation;
  locationLabel: string;
}

interface ISize {
  totalArea: string;
  coveredArea: string;
  plotArea: string;
}

interface IRestrictions {
  foodPreference: string;
  petsAllowed: string;
  tenantType: string;
}

interface IOtherCharge {
  amount: number;
  type: string;
}

interface ILeaseTerms {
  leaseAmount: any;
  leaseTenure: {
    minimumTenure: number;
    minimumUnit: string;
    maximumTenure: number;
    maximumUnit: string;
    lockInPeriod: number;
    lockInUnit: string;
    noticePeriod: number;
    noticePeriodUnit: string;
  };
  maintenanceAmount: {
    amount: number;
    frequency: string;
  };
  otherCharges: {
    water: IOtherCharge;
    electricity: IOtherCharge;
    gas: IOtherCharge;
    others: IOtherCharge;
  };
  brokerage: {
    required: string;
    amount: number;
  };
}

interface IAvailability {
  date: Date;
  type: string;
}

interface IMedia {
  photos: {
    exterior: string[];
    interior: string[];
    floorPlan: string[];
    Kitchen: string[];
    Halls: string[];
    Bedrooms: string[];
    Storerooms: string[];
    Washrooms: string[];
    lifts: string[];
    emergencyExits: string[];
  };
  videoTour: string | null;
  documents: string[];
}

interface IMetadata {
  createdBy: Schema.Types.ObjectId;
  createdAt: Date;
}

export interface ILeaseIndependentHouse extends Document {
  propertyId: string;
  propertyName: string;
  propertyAddress: IAddress;
  size: ISize;
  restrictions: IRestrictions;
  features: string[];
  flatAmenities: string[];
  societyAmenities: string[];
  leaseTerms: ILeaseTerms;
  availability: IAvailability;
  media: IMedia;
  metadata: IMetadata;
}

const LeaseIndependentHouseSchema = new Schema<ILeaseIndependentHouse>({
  propertyId: { type: String, required: true, unique: true },
  propertyName: { type: String, required: true },
  propertyAddress: {
    houseName: { type: String, required: true },
    street: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    pinCode: { type: String, required: true },
    location: {
      latitude: { type: String, required: true },
      longitude: { type: String, required: true },
    },
    locationLabel: { type: String, required: true },
  },
  size: {
    totalArea: { type: String, required: true },
    coveredArea: { type: String, required: true },
    plotArea: { type: String, required: true },
  },
  restrictions: {
    foodPreference: { type: String, required: true },
    petsAllowed: { type: String, required: true },
    tenantType: { type: String, required: true },
  },
  features: { type: [String], default: [] },
  flatAmenities: { type: [String], default: [] },
  societyAmenities: { type: [String], default: [] },
  leaseTerms: {
    leaseAmount: { type: Schema.Types.Mixed, required: true },
    leaseTenure: {
      minimumTenure: { type: Number, required: true },
      minimumUnit: { type: String, required: true },
      maximumTenure: { type: Number, required: true },
      maximumUnit: { type: String, required: true },
      lockInPeriod: { type: Number, required: true },
      lockInUnit: { type: String, required: true },
      noticePeriod: { type: Number, required: true },
      noticePeriodUnit: { type: String, required: true },
    },
    maintenanceAmount: {
      amount: { type: Number, required: true },
      frequency: { type: String, required: true },
    },
    otherCharges: {
      water: {
        amount: { type: Number, required: true },
        type: { type: String, required: true },
      },
      electricity: {
        amount: { type: Number, required: true },
        type: { type: String, required: true },
      },
      gas: {
        amount: { type: Number, required: true },
        type: { type: String, required: true },
      },
      others: {
        amount: { type: Number, required: true },
        type: { type: String, required: true },
      },
    },
    brokerage: {
      required: { type: String, required: true },
      amount: { type: Number, required: true },
    },
  },
  availability: {
    date: { type: Date, required: true },
    type: { type: String, required: true },
  },
  media: {
    photos: {
      exterior: [{ type: String }],
      interior: [{ type: String }],
      floorPlan: [{ type: String }],
      Kitchen: [{ type: String }],
      Halls: [{ type: String }],
      Bedrooms: [{ type: String }],
      Storerooms: [{ type: String }],
      Washrooms: [{ type: String }],
      lifts: [{ type: String }],
      emergencyExits: [{ type: String }],
    },
    videoTour: { type: String },
    documents: [{ type: String }],
  },
  metadata: {
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
  },
}, {
  timestamps: true,
});

LeaseIndependentHouseSchema.index({ propertyId: 1 }, { unique: true });
LeaseIndependentHouseSchema.index({ 'propertyAddress.city': 1 });
LeaseIndependentHouseSchema.index({ 'leaseTerms.leaseAmount': 1 });

export default model<ILeaseIndependentHouse>('LeaseIndependentHouse', LeaseIndependentHouseSchema);