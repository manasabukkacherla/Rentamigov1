import { Schema } from "mongoose";

export const PropertyPhotosSchema = new Schema({
  exteriorView: [{ type: String, match: /\.(jpg|jpeg|png)$/, required: true }],
  livingRoom: [{ type: String, match: /\.(jpg|jpeg|png)$/, required: true }],
  kitchen: [{ type: String, match: /\.(jpg|jpeg|png)$/, required: true }],
  diningRoom: [{ type: String, match: /\.(jpg|jpeg|png)$/, required: true }],
  bedrooms: {
    master: [{ type: String, match: /\.(jpg|jpeg|png)$/ }],
    kids: [{ type: String, match: /\.(jpg|jpeg|png)$/ }],
    guest: [{ type: String, match: /\.(jpg|jpeg|png)$/ }],
  },
  bathrooms: [
    { type: String, match: /\.(jpg|jpeg|png)$/, required: true },
  ],
  balconies: [
    { type: String, match: /\.(jpg|jpeg|png)$/ },
  ],
  otherPhotos: [{ type: String, match: /\.(jpg|jpeg|png)$/ }],
  propertyVideo: { type: String, match: /\.(mp4)$/, required: false },
});
