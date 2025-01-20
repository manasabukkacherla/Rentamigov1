import { Schema } from "mongoose";

export const PropertyFeaturesSchema = new Schema({
  bedrooms: { type: Number, enum: [1, 2, 3, 4], required: true },
  bathrooms: { type: Number, enum: [1, 2, 3, 4], required: true },
  balconies: { type: Number, enum: [1, 2, 3, 4], required: true },
  extraRooms: {
    studyRoom: { type: Boolean },
    servantRoom: { type: Boolean },
    pujaRoom: { type: Boolean },
    theaterRoom: { type: Boolean },
    gymRoom: { type: Boolean },
  },
  floorOfTheProperty: { type: Number, min: 1, max: 50, required: true },
  totalNoOfFloors: { type: Number, min: 1, max: 50, required: true },
  area: {
    superBuiltup: { type: Number, required: true },
    builtUp: { type: Number, required: true },
    carpetArea: { type: Number, required: true },
  },
  ageOfTheProperty: {
    type: String,
    enum: ["<5 Years", "5-10 Years", ">10 Years"],
    required: true,
  },
  livingRoom: { type: Boolean, required: true },
  kitchen: { type: Boolean, required: true },
  diningRoom: { type: Boolean, required: true },
});
