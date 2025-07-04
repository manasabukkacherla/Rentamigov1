import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ICommercialRentAgriculture extends Document {
  propertyId: string;
   basicInformation:{
    title: string;
    Type: string[];
    powerSupply: 'Available' | 'Not Available';
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;   
  };
  location: {
    latitude: string;
    longitude: string;
  };
  landmark: string;
  
  isCornerProperty: boolean;
}
  Agriculturelanddetails: {
    totalArea: number;
    soilType: string;
    irrigation: boolean;
    fencing: boolean;
    cropSuitability: string;
    waterSource?: string;
    legalClearances: boolean;
  };
    
   
  rent: {
    expectedRent: number;
    isNegotiable: boolean;
    maintenanceType: 'inclusive' | 'exclusive';
  };
  securityDeposit: {
    amount: number;
  };

  availability: {
    type: 'immediate' | 'specific';
    date?: Date;
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
    };
    videoTour?: string;
    documents: string[];
  };
  metadata : {
    createdBy: Schema.Types.ObjectId | null;
    createdAt: Date;
    propertyType: string;
    propertyName: string;
    intent: string;
    status: string;
  }
}

const CommercialRentAgricultureSchema: Schema = new Schema({
  propertyId: { type: String, required: false },
  basicInformation:{
  title: { type: String, required: false },
  Type: [{ type: String, required: false }],
  powerSupply: { type: String, enum: ['Available', 'Not Available'], required: false },
  address: {
    street: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    zipCode: { type: String, required: false }
  },
  location: {
    latitude: { type: String ,required:false},
    longitude: { type: String ,required:false}
  },
  landmark: { type: String },
  
  isCornerProperty: { type: Boolean, default: false },
},
    Agriculturelanddetails: {
    totalArea: { type: Number, required: false },
    soilType: { type: String },
    irrigation: { type: Boolean, default: false },
    fencing: { type: Boolean, default: false },
    cropSuitability: { type: String },
    waterSource: { type: String },
    legalClearances: { type: Boolean, default: false }
  },
  
  rent: {
    expectedRent: { type: Number, required: false },
    isNegotiable: { type: Boolean, default: false },
    maintenanceType: { type: String, enum: ['inclusive', 'exclusive']}
  },
  
    
    
  availability: {
    type: { type: String, enum: ['immediate', 'specific'], required: false },
    date: { type: Date }
  },
  contactDetails: {
    name: { type: String, required: false },
    email: { type: String, required: false },
    phone: { type: String, required: false },
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
  metadata : {
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    propertyType: { type: String, default: 'Commercial' },
    intent: { type: String,default: 'Rent' },
    propertyName: { type: String,  default: 'Agriculture' },
    status: { type: String, default: 'Available' }
  }
});

export default mongoose.model<ICommercialRentAgriculture>('CommercialRentAgriculture', CommercialRentAgricultureSchema);
