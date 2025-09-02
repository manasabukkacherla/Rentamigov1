import mongoose, { Document, Model, Schema } from 'mongoose';

export interface Enquiry extends Document {
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyId: string;
  propertyType: string;
  propertyName: string;
  createdBy: Schema.Types.ObjectId | null;
  // status: 'new' | 'contacted' | 'converted' | 'lost' | 'pending';
  // isOtpVerified: boolean;
  // selectedServices: string[];
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
    phone: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  propertyId: {
    type: String,
    ref: 'Property'
  },
  propertyType: {
    type: String,
    enum: ['rent','sell','lease','pg/co-living','Rent','Sale','Sell','Lease','PG/Co-Living'],
    // default: 'new'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },  
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  propertyName:{
    type:String,
    required:true,
    trim:true
  },
  // isOtpVerified: {
  //   type: Boolean,
  //   default: false
  // },
  // selectedServices: [{
  //   type: String,
  //   required: true
  // }]
}, {
  timestamps: true
});

export const EnquiryModel: Model<Enquiry> = mongoose.model<Enquiry>('enquiries', EnquirySchema);
