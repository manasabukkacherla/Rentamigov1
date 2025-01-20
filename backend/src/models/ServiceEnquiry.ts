// models/ServiceEnquiry.ts
import { Schema, model, models, Document } from "mongoose";

interface IServiceEnquiry extends Document {
  name: string;
  email: string;
  mobileNo: string;
  selectedServices: string[];
  createdAt: Date;
}

const ServiceEnquirySchema = new Schema<IServiceEnquiry>({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  mobileNo: {
    type: String,
    required: [true, "Mobile number is required"],
    match: [/^[\d\s-]{10,}$/, "Please enter a valid mobile number"],
  },
  selectedServices: [
    {
      type: String,
      required: [true, "At least one service must be selected"],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ServiceEnquiry =
  models.ServiceEnquiry ||
  model<IServiceEnquiry>("ServiceEnquiry", ServiceEnquirySchema);

export default ServiceEnquiry;
