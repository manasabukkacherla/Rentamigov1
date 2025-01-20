"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TenantsSchema = new mongoose_1.Schema({
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
const Tenants = mongoose_1.models.Tenants || (0, mongoose_1.model)("Tenants", TenantsSchema);
