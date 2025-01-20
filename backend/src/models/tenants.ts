import { Schema, model, models, Document } from "mongoose";

const TenantsSchema = new Schema({
  Property_Id: String,
  Lease_No: String,
  Tenant_Id: String,
  Tenant_Name: String,
  Tenant_Email: String,
  Tenant_Mobile: String,
  Tenant_Agreement_Start_Date: Date,
  Tenant_Agreement_End_Date: Date,
  Monthly_Rent: Number,
  Security_Deposit_Amount: Number,
  Maintenance_Amount: Number,
  Datetime: Date,
});

const Tenants = models.Tenants || model("Tenants", TenantsSchema);
