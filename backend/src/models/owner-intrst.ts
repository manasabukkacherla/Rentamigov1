import { Schema, model, models, Document } from "mongoose";

// Define the interface for Property document
interface IOwnerInterestFormInterface extends Document {
  name: string;
  email: string;
  mobileNo: string;
  propertyName: string;
  locality: string;
  city: string;
}

const OwnerIntrstPropertySchema = new Schema<IOwnerInterestFormInterface>({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  mobileNo: {
    type: String,
    required: [true, "Mobile number is required"],
    match: [/^\+?[\d\s-]{10,}$/, "Please enter a valid mobile number"],
  },
  propertyName: {
    type: String,
    required: [true, "Property name is required"],
  },
  locality: {
    type: String,
    required: [true, "Locality is required"],
  },
  city: {
    type: String,
    required: [true, "City is required"],
  },
});

// Check if the model exists, if not create a new one
const OwnerIntrstPropertyModel =
  models.OwnerIntrstPropertyModel ||
  model<IOwnerInterestFormInterface>(
    "OwnerIntrstPropertyModel",
    OwnerIntrstPropertySchema
  );

export default OwnerIntrstPropertyModel;
