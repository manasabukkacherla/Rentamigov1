import mongoose, { Schema, Document } from "mongoose";

interface ISellFacilities extends Document {
  userId: mongoose.Types.ObjectId;
  minSeats: string;
  maxSeats: string;
  cabins: string;
  meetingRooms: string;
  privateWashrooms: string;
  publicWashrooms: string;
  hasConferenceRoom: boolean;
}

const SellFacilitiesSchema = new Schema<ISellFacilities>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    minSeats: { type: String, required: true },
    maxSeats: { type: String, required: true },
    cabins: { type: String, required: true },
    meetingRooms: { type: String, required: true },
    privateWashrooms: { type: String, required: true },
    publicWashrooms: { type: String, required: true },
    hasConferenceRoom: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const SellFacilities = mongoose.models.SellFacilities || mongoose.model<ISellFacilities>("SellFacilities", SellFacilitiesSchema);
export default SellFacilities;
