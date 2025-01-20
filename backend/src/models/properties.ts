import { Schema, model, models, Document } from "mongoose";

const PropertiesSchema = new Schema({
  Property_Id: String,
  Lease_No: String,
  Property_Name: String,
  Flat_No: String,
  Locality: String,
  City: String,
});

const Properties = models.Properties || model("Properties", PropertiesSchema);
