import mongoose, { Schema, Document, Types } from 'mongoose';

interface IArea {
  totalArea: number;
  carpetArea: number;
  builtUpArea: number;
}

interface IFloor {
  floorNumber: number;
  totalFloors: number;
}

export interface ICommercialLeaseAgriculture extends Document {
  propertyId?: string;
  title: string;
  landType: string[];
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
  landDetails: {
    totalArea: number;
    soilType: string;
    irrigation: boolean;
    fencing: boolean;
    cropSuitability: string;
    waterSource: string;
    legalClearances: boolean;
  };
  propertyDetails: {
    area: IArea;
    floor: IFloor;
    facingDirection: string;
    furnishingStatus: string;
    propertyAmenities: string[];
    wholeSpaceAmenities: string[];
    waterAvailability: string;
    propertyAge: number;
    propertyCondition: string;
    electricitySupply: {
      powerLoad: number;
      backup: boolean;
    };
  };
  leaseAmount: {
    amount: number;
    duration: number;
    durationType: string;
    isNegotiable: boolean; 
  };
  leaseTenure: {
    minimumTenure: string;
    minimumUnit: string;
    maximumTenure: string;
    maximumUnit: string;
    lockInPeriod: string;
    lockInUnit: string;
    noticePeriod: string;
    noticePeriodUnit: string;
  };
  maintenanceAmount: {
    amount?: number;
    frequency?: "monthly" | "quarterly" | "half-yearly" | "yearly";
  };
  otherCharges: {
    waterCharges: {
      type: "inclusive" | "exclusive";
      amount?: number;
    };
    electricityCharges: {
      type: "inclusive" | "exclusive";
      amount?: number;
    };
    gasCharges: {
      type: "inclusive" | "exclusive";
      amount?: number;
    };
    otherCharges: {
      type: "inclusive" | "exclusive";
      amount?: number;
    };
  };
  brokerage: {
    required: boolean;
    amount?: number;
  };
  availability: {
    availableFrom: Date;
    availableImmediately: boolean;
    availabilityStatus: string;
    leaseDuration: string;
    noticePeriod: string;
    isPetsAllowed: boolean;
    operatingHours: {
      restricted: boolean;
      restrictions: string;
    };
  };
  contactDetails: {
    name: string;
    email: string;
    phone: string;
    alternatePhone?: string;
    bestTimeToContact?: string;
  };
  media: {
    photos: {
      exterior: string[];
      interior: string[];
      floorPlan: string[];
      aerial: string[];
      soil: string[];
      irrigation: string[];
    };
    videoTour?: string;
    documents: string[];
  };
  metadata: {
    userId: Types.ObjectId;
    userName: string;
    createdAt: Date;
  }
}

const CommercialLeaseAgricultureSchema: Schema = new Schema({
  propertyId: { type: String, default: () => `CLA-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}` },
  title: { type: String, default: "Unnamed Property" },
  landType: { type: [String], default: ["Agricultural"] },
  address: {
    street: { type: String, default: "Not Specified" },
    city: { type: String, default: "Not Specified" },
    state: { type: String, default: "Not Specified" },
    zipCode: { type: String, default: "00000" }
  },
  landmark: { type: String },
  location: {
    latitude: { type: String },
    longitude: { type: String }
  },
  isCornerProperty: { type: Boolean, default: false },
  landDetails: {
    totalArea: { type: Number, default: 0 },
    soilType: { type: String },
    irrigation: { type: Boolean, default: false },
    fencing: { type: Boolean, default: false },
    cropSuitability: { type: String },
    waterSource: { type: String },
    legalClearances: { type: Boolean, default: false }
  },
  propertyDetails: {
    area: {
      totalArea: { type: Number },
      carpetArea: { type: Number },
      builtUpArea: { type: Number }
    },
    floor: {
      floorNumber: { type: Number },
      totalFloors: { type: Number }
    },
    facingDirection: { type: String },
    furnishingStatus: { type: String },
    propertyAmenities: { type: [String] },
    wholeSpaceAmenities: { type: [String] },
    waterAvailability: { type: String },
    propertyAge: { type: Number },
    propertyCondition: { type: String },
    electricitySupply: {
      powerLoad: { type: Number },
      backup: { type: Boolean, default: false }
    }
  },
  leaseAmount: {
    amount: { type: Number, default: 0 },
    duration: { type: Number, default: 0 },
    durationType: { type: String, default: "months" },
    isNegotiable: { type: Boolean, default: false },
  },
  leaseTenure: {
    minimumTenure: { type: String, default: "" },
    minimumUnit: { type: String, default: "months" },
    maximumTenure: { type: String, default: "" },
    maximumUnit: { type: String, default: "months" },
    lockInPeriod: { type: String, default: "" },
    lockInUnit: { type: String, default: "months" },
    noticePeriod: { type: String, default: "" },
    noticePeriodUnit: { type: String, default: "months" },
  },
  maintenanceAmount: {
    amount: { type: Number },
    frequency: { type: String }
  },
  otherCharges: {
    electricityCharges: {
      type: { type: String, enum: ['inclusive', 'exclusive'], required: true },
      amount: { type: Number }
    },
    waterCharges: {
      type: { type: String, enum: ['inclusive', 'exclusive'], required: true },
      amount: { type: Number }
    },
    gasCharges: {
      type: { type: String, enum: ['inclusive', 'exclusive'], required: true },
      amount: { type: Number }
    },
    otherCharges: {
      type: { type: String, enum: ['inclusive', 'exclusive'], required: true },
      amount: { type: Number }
    }
  },
  brokerage: {
    required: { type: Boolean, default: false },
    amount: { type: Number },
  },
  availability: {
    availableFrom: { type: Date },
    availableImmediately: { type: Boolean, default: false },
    availabilityStatus: { type: String },
    leaseDuration: { type: String },
    noticePeriod: { type: String },
    isPetsAllowed: { type: Boolean, default: false },
    operatingHours: {
      restricted: { type: Boolean, default: false },
      restrictions: { type: String }
    }
  },
  contactDetails: {
    name: { type: String, default: "Not Specified" },
    email: { type: String, default: "not.specified@example.com" },
    phone: { type: String, default: "0000000000" },
    alternatePhone: { type: String },
    bestTimeToContact: { type: String }
  },
  media: {
    photos: {
      exterior: { type: [String], default: [] },
      interior: { type: [String], default: [] },
      floorPlan: { type: [String], default: [] },
      aerial: { type: [String], default: [] },
      soil: { type: [String], default: [] },
      irrigation: { type: [String], default: [] }
    },
    videoTour: { type: String },
    documents: { type: [String], default: [] }
  },
  metadata: {
    userId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    userName: { type: String, default: "Not Specified" },
    createdAt: { type: Date, default: Date.now }
  }
});

export default mongoose.model<ICommercialLeaseAgriculture>('CommercialLeaseAgriculture', CommercialLeaseAgricultureSchema); 