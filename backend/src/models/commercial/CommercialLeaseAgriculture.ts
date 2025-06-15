import mongoose, { Schema, Document, Types } from 'mongoose';

interface IArea {
  totalArea: number;
  carpetArea: number;
  builtUpArea: number;
}

// interface IFloor {
//   floorNumber: number;
//   totalFloors: number;
// }

export interface ICommercialLeaseAgriculture extends Document {
  propertyId: string;
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
    area?: IArea;
    soilType: string;
    irrigation: boolean;
    fencing: boolean;
    cropSuitability: string;
    waterSource: string;
    legalClearances: boolean;
  };
  powerSupply: boolean;
  landDetails: {
    totalArea: number;
    soilType: string;
    irrigation: boolean;
    fencing: boolean;
    cropSuitability: string;
    waterSource: string;
    legalClearances: boolean;
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
};
  // maintenanceAmount?: {
  //   amount?: number;
  //   frequency?: "monthly" | "quarterly" | "half-yearly" | "yearly";
  // };
  // otherCharges?: {
  //   waterCharges?: {
  //     type?: "inclusive" | "exclusive";
  //     amount?: number;
  //   };
  //   electricityCharges?: {
  //     type?: "inclusive" | "exclusive";
  //     amount?: number;
  //   };
  //   gasCharges?: {
  //     type?: "inclusive" | "exclusive";
  //     amount?: number;
  //   };
  //   otherCharges?: {
  //     type?: "inclusive" | "exclusive";
  //     amount?: number;
  //   };
  // };
  // brokerage?: {
  //   required?: boolean;
  //   amount?: number;
  // };
  availability: {
    availableFrom: Date;
    availableImmediately: boolean;
    availabilityStatus: string;
    leaseDuration: string;
    noticePeriod: string;
    isPetsAllowed: boolean;
    operatingHours: boolean;
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
      exterior?: string[];
      interior?: string[];
      floorPlan?: string[];
      washrooms?: string[];
      lifts?: string[];
      emergencyExits?: string[];
        
    };
    videoTour?: string;
    documents: string[];
  };
  metadata: {
    createdBy: Schema.Types.ObjectId | null;
    createdAt: Date;
    propertyType: string;
    propertyName: string;
    intent: string;
    status: string;
  }
}

const CommercialLeaseAgriculture = new Schema({
  propertyId: { type: String },
  basicInformation: {
    title: { type: String, default: "Unnamed Property" },
    type: { type: [String], default: ["Agricultural"] },
    powerSupply: { type: Boolean, default: false },
  address: {
    street: { type: String, default: "Not Specified" },
    city: { type: String, default: "Not Specified" },
    state: { type: String, default: "Not Specified" },
    zipCode: { type: String, default: "00000" }
    },
    landmark: { type: String },
    location: {
      latitude: { type: String ,required:false},
      longitude: { type: String ,required: false}
    },
    isCornerProperty: { type: Boolean, default: false },
  },


  
  propertyDetails: {
    area: {
      totalArea: { type: Number },
      carpetArea: { type: Number },
      builtUpArea: { type: Number }
    },
    landDetails: {
    totalArea: { type: Number, default: 0 },
    soilType: { type: String },
    irrigation: { type: Boolean, default: false },
    fencing: { type: Boolean, default: false },
    cropSuitability: { type: String },
    waterSource: { type: String },
    legalClearances: { type: Boolean, default: false }
    
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
  // maintenanceAmount: {
  //   amount: { type: Number },
  //   frequency: { type: String }
  // },
  // otherCharges: {
  //   electricityCharges: {
  //     type: { type: String, enum: ['inclusive', 'exclusive']},
  //     amount: { type: Number }
  //   },
  //   waterCharges: {
  //     type: { type: String, enum: ['inclusive', 'exclusive']},
  //     amount: { type: Number }
  //   },
  //   gasCharges: {
  //     type: { type: String, enum: ['inclusive', 'exclusive']},
  //     amount: { type: Number }
  //   },
  //   otherCharges: {
  //     type: { type: String, enum: ['inclusive', 'exclusive']},
  //     amount: { type: Number }
  //   }
  // },
  // brokerage: {
  //   required: { type: Boolean, default: false },
  //   amount: { type: Number },
  // },
  availability: {
    availableFrom: { type: Date },
    availableImmediately: { type: Boolean, default: false },
    availabilityStatus: { type: String },
    leaseDuration: { type: String },
    noticePeriod: { type: String },
    isPetsAllowed: { type: Boolean, default: false },
    operatingHours: { type: Boolean, default: false },
     
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
      washrooms: { type: [String], default: [] },
      lifts: { type: [String], default: [] },
      emergencyExits: { type: [String], default: [] }
    },
    videoTour: { type: String },
    documents: { type: [String], default: [] }
  },
  metadata: {
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    propertyType: { type: String, default: 'Commercial' },
    intent: { type: String,default: 'Lease' },
    propertyName: { type: String,  default: 'Agriculture' },
    status: { type: String, default: 'Available' }
  }
});

export default mongoose.model<ICommercialLeaseAgriculture>('CommercialLeaseAgriculture', CommercialLeaseAgriculture); 