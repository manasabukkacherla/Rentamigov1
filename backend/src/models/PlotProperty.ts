import mongoose, { Schema, Document } from "mongoose";

interface IPlotProperty extends Document {
  userId: mongoose.Types.ObjectId; // Reference to the User who owns the property
  zoneType: string;
  plotArea: number; // Plot area in square feet
  ownership: string;
}

const PlotPropertySchema = new Schema<IPlotProperty>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to user
    zoneType: { type: String, required: true },
    plotArea: { type: Number, required: true },
    ownership: { type: String, required: true },
  },
  { timestamps: true }
);

const PlotProperty = mongoose.model<IPlotProperty>("PlotProperty", PlotPropertySchema);
export default PlotProperty;
