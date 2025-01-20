import mongoose, { Schema, model, Document } from "mongoose";
import { PropertyIdentificationSchema } from "./Property_Identification_Schema";
import { PropertyDetailsSchema } from "./property_details";
import { PropertyFeaturesSchema } from "./Property_Features_Schema";
import { PropertyLocationSchema } from "./Property_Location_Schema";
import { CommercialsSchema } from "./Commercials_Schema";
import { AvailabilitySchema } from "./Availability_Schema";
import { PropertyPhotosSchema } from "./Property_Photos_Schema";

export interface IProperty extends Document {
  propertyIdentification: typeof PropertyIdentificationSchema;
  propertyDetails: typeof PropertyDetailsSchema;
  propertyFeatures: typeof PropertyFeaturesSchema;
  propertyLocation: typeof PropertyLocationSchema;
  commercials: typeof CommercialsSchema;
  availability: typeof AvailabilitySchema;
  propertyPhotos: typeof PropertyPhotosSchema;
}

const PropertySchema = new Schema<IProperty>({
  propertyIdentification: { type: PropertyIdentificationSchema, required: true },
  propertyDetails: { type: PropertyDetailsSchema, required: true },
  propertyFeatures: { type: PropertyFeaturesSchema, required: true },
  propertyLocation: { type: PropertyLocationSchema, required: true },
  commercials: { type: CommercialsSchema, required: true },
  availability: { type: AvailabilitySchema, required: true },
  propertyPhotos: { type: PropertyPhotosSchema, required: false },
}, { timestamps: true });

export const Property = mongoose.models.Property || model<IProperty>("Property", PropertySchema);
