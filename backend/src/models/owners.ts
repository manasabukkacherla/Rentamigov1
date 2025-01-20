import { Schema, model, models, Document } from "mongoose";

const OwnersSchema = new Schema({
  Property_Id: String,
  Lease_No: String,
  Owner_Id: String,
  Owner_Name: String,
  Owner_Email: String,
  Owner_Mobile: String,
  Owner_Alternate_Mobile: String,
  Owner_Account_No: String,
  Owner_IFSC: String,
  Agreement_Start_Date: Date,
  Datetime: Date,
});

const Owners = models.Owners || model("Owners", OwnersSchema);
