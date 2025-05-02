import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ICommercialRentAgriculture extends Document {
  propertyId: string;
  propertyName: string;
  landType: string[];
  waterSource?: string;
  powerSupply: boolean;
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
  metaData : {
    userId: Schema.Types.ObjectId | null;
    userName: string;
    createdAt: Date;
  }
}

const CommercialRentAgricultureSchema: Schema = new Schema({
  propertyId: { type: String, required: true },
  propertyName: { type: String, required: true },
  landType: { type: [String], required: true },
  waterSource: { type: String},
  powerSupply: { type: Boolean, default: false },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true }
  },
  location: {
    latitude: { type: String ,required:true},
    longitude: { type: String ,required:true}
  },
  landmark: { type: String },
  
  isCornerProperty: { type: Boolean, default: false },
    Agriculturelanddetails: {
    totalArea: { type: Number, required: true },
    soilType: { type: String },
    irrigation: { type: Boolean, default: false },
    fencing: { type: Boolean, default: false },
    cropSuitability: { type: String },
    waterSource: { type: String },
    legalClearances: { type: Boolean, default: false }
  },
  
  rent: {
    expectedRent: { type: Number, required: true },
    isNegotiable: { type: Boolean, default: false },
    maintenanceType: { type: String, enum: ['inclusive', 'exclusive'], required: true }
  },
  
    
    
  availability: {
    type: { type: String, enum: ['immediate', 'specific'], required: true },
    date: { type: Date }
  },
  contactDetails: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
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
  metaData : {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userName:{type:String,default:"Not Specified"},
    createdAt: { type: Date, default: Date.now }
  }
});

export default mongoose.model<ICommercialRentAgriculture>('CommercialRentAgriculture', CommercialRentAgricultureSchema); 