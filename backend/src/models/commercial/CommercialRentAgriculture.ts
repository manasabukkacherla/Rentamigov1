import mongoose, { Schema, Document, Types } from 'mongoose';

interface basicInformation {
    title: string;
    landType: string[];
    waterSource?: string;
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
export interface ICommercialRentAgriculture extends Document {
  propertyId: string;
  basicInformation:basicInformation;
  propertyDetails: {
    area:{
        totalArea: number;
    }
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
    createdBy: Schema.Types.ObjectId | null;
    createdAt: Date;
    propertyType: string;
    propertyName: string;
    intent: string;
    status: string;
  }
}

const CommercialRentAgricultureSchema: Schema = new Schema({
  propertyId: { type: String, required: true },
  basicInformation: {
    title: { type: String, required: true },
    landType: { type: [String], required: true },
    waterSource: { type: String},
    powerSupply: { type: String, enum: ['Available', 'Not Available'], required: true },
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
},
    propertyDetails: {
    area:{
        totalArea: { type: Number, required: true },
    },
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
    maintenanceType: { type: String, enum: ['inclusive', 'exclusive']}
  },
  
    
    
  availability: {
    type: { type: String, enum: ['immediate', 'specific'], default:'immediate' },
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
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    propertyType: { type: String, default: 'Commercial' },
    intent: { type: String,default: 'Rent' },
    propertyName: { type: String,  default: 'Agriculture' },
    status: { type: String, default: 'Available' }
  }
});

export default mongoose.model<ICommercialRentAgriculture>('CommercialRentAgriculture', CommercialRentAgricultureSchema); 