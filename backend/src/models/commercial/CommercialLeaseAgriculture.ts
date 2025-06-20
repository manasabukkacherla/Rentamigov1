import mongoose, { Schema, Document } from 'mongoose';

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
    powerSupply: string;
  };
 


  Agriculturelanddetails: {
    totalArea: number;
    soilType: string;
    irrigation: boolean;
    fencing: boolean;
    cropSuitability: string;
    waterSource?: string;
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
    Type: { type: [String], default: ["Agricultural"] },
    powerSupply: { type: String, enum: ['Available', 'Not Available'], default: "Available" },
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
  Agriculturelanddetails: {
    totalArea: { type: Number, required: true },
    soilType: { type: String },
    irrigation: { type: Boolean, default: false },
    fencing: { type: Boolean, default: false },
    cropSuitability: { type: String },
    waterSource: { type: String },
    legalClearances: { type: Boolean, default: false }
  },
  leaseTerms:{
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
  },
  
 
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