"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OwnersSchema = new mongoose_1.Schema({
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
const Owners = mongoose_1.models.Owners || (0, mongoose_1.model)("Owners", OwnersSchema);
