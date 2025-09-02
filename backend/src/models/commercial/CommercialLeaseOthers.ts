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

export interface ICommercialLeaseOthers extends Document {
  propertyId?: string;
  basicInformation: {
    title: string;
    type: string[];
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
  };

  propertyDetails: {
    otherPropertyDetails: {
      propertyTypeDescription: string;
      specialFeatures: string;
      usageRecommendation: string;
      additionalRequirements: string;
    };
    area: IArea;
    floor: IFloor;
    facingDirection: string;
    furnishingStatus: string;
    propertyAmenities: string[];
    wholeSpaceAmenities: string[];
    waterAvailability: string;
    propertyAge: string;
    propertyCondition: string;
    electricitySupply: {
      powerLoad: number;
      backup: boolean;
    };
  };

  leaseTerms: {
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
      electricityCharges: {
        type: "inclusive" | "exclusive";
        amount?: number;
      };
      waterCharges: { 
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
      required: string;
      amount?: number;
    };
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
    };
  };

  contactInformation: {
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
      surroundings: string[];
      documents: string[];
    };
    videoTour?: string;
    documents: string[];
  };

  metaData?: {
    createdBy: Schema.Types.ObjectId | null;
    createdAt: Date;
    propertyType: string;
    propertyName: string;
    intent: string;
    status: string;
  };
}

const CommercialLeaseOthersSchema: Schema = new Schema({
  propertyId: { type: String, default: () => `CLO-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}` },
  basicInformation: {
    title: { type: String, default: "Unnamed Property" },
    type: { type: [String], default: ["Other"] },
    address: {
      street: { type: String, default: "Not Specified" },
      city: { type: String, default: "Not Specified" },
      state: { type: String, default: "Not Specified" },
      zipCode: { type: String, default: "00000" }
    },
    landmark: { type: String },
    location: {
      latitude: { type: String },
      longitude: { type: String}
    },
    isCornerProperty: { type: Boolean, default: false },
  },

  propertyDetails: {
    otherPropertyDetails: {
      propertyTypeDescription: { type: String },
      specialFeatures: { type: String },
      usageRecommendation: { type: String },
      additionalRequirements: { type: String }
    },
    
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
    propertyAmenities: { type: [String], default: [] },
    wholeSpaceAmenities: { type: [String], default: [] },
    waterAvailability: { type: String },
    propertyAge: { type: String },
    propertyCondition: { type: String },
    electricitySupply: {
      powerLoad: { type: Number },
      backup: { type: Boolean, default: false }
    }
  },

  leaseTerms: {
    leaseAmount: {
      amount: { type: Number, default: 0 },
      duration: { type: Number, default: 1 },
      durationType: { type: String, default: 'years' },
      isNegotiable: { type: Boolean, default: false }
    },

    leaseTenure: {
      minimumTenure: { type: String, default: '1' },
      minimumUnit: { type: String, default: 'years' },
      maximumTenure: { type: String, default: '1' },
      maximumUnit: { type: String, default: 'years' },
      lockInPeriod: { type: String, default: '1' },
      lockInUnit: { type: String, default: 'years' },
      noticePeriod: { type: String, default: '1' },
      noticePeriodUnit: { type: String, default: 'years' }
    },

    maintenanceAmount: {
      amount: { type: Number },
      frequency: { type: String, enum: ["monthly", "quarterly", "half-yearly", "yearly"] }
    },

    otherCharges: {
      electricityCharges: {
        type: { type: String, enum: ["inclusive", "exclusive"] },
        amount: { type: Number }
      },
      waterCharges: {
        type: { type: String, enum: ["inclusive", "exclusive"] },
        amount: { type: Number }
      },
      gasCharges: {
        type: { type: String, enum: ["inclusive", "exclusive"] },
        amount: { type: Number }
      },
      otherCharges: {
        type: { type: String, enum: ["inclusive", "exclusive"] },
        amount: { type: Number }
      }
    },

    brokerage: {
      required: { type: String },
      amount: { type: Number }
    }
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

  contactInformation: {
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
      surroundings: { type: [String], default: [] },
      documents: { type: [String], default: [] }
    },
    videoTour: { type: String },
    documents: { type: [String], default: [] }
  },

  metaData: {
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    createdAt: { type: Date, default: Date.now },
    propertyType: { type: String, default: 'Commercial' },
    intent: { type: String, default: 'Lease' },
    propertyName: { type: String, default: 'Others' },
    status: { type: String, default: 'Available' }
  }
});

export default mongoose.model<ICommercialLeaseOthers>('CommercialLeaseOthers', CommercialLeaseOthersSchema);
