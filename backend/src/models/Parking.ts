import mongoose, { Schema, Document } from "mongoose";

interface IParking extends Document {
  userId: mongoose.Types.ObjectId; // Reference to the User who posted the property
  privateParking: boolean;
  publicParking: boolean;
}

const ParkingSchema = new Schema<IParking>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to user
    privateParking: { type: Boolean, required: true, default: false },
    publicParking: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const Parking = mongoose.model<IParking>("Parking", ParkingSchema);
export default Parking;
