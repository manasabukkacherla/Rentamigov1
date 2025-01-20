"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PropertiesSchema = new mongoose_1.Schema({
    Property_Id: String,
    Lease_No: String,
    Property_Name: String,
    Flat_No: String,
    Locality: String,
    City: String,
});
const Properties = mongoose_1.models.Properties || (0, mongoose_1.model)("Properties", PropertiesSchema);
