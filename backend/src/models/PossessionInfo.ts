import mongoose, { Schema, Document } from "mongoose";

interface IPossessionInfo extends Document {
  userId: mongoose.Types.ObjectId; // Reference to the User who owns the property
  possessionStatus: "ready" | "construction";
  availableFrom: Date;
  ageOfProperty?: number;
}

const PossessionInfoSchema = new Schema<IPossessionInfo>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to user
    possessionStatus: { type: String, enum: ["ready", "construction"], required: true },
    availableFrom: { type: Date, required: true },
    ageOfProperty: { type: Number, required: function () { return this.possessionStatus === "ready"; } }, // Age required only for 'ready'
  },
  { timestamps: true }
);

const PossessionInfo = mongoose.model<IPossessionInfo>("PossessionInfo", PossessionInfoSchema);
export default PossessionInfo;
