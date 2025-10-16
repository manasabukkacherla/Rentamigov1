import mongoose from 'mongoose';

const userTokenSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    tokens: { type: Number, required: true, default: 0 },
    viewedLeads: { type: [String], default: [] }, // ✅ Add this field
  },
  { timestamps: true }
);

export default mongoose.model('UserToken', userTokenSchema);
