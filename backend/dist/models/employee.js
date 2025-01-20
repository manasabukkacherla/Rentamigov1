"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const EmployeeSchema = new mongoose_1.Schema({
    firstname: {
        type: String,
        required: [true, 'First name is required'],
    },
    lastname: {
        type: String,
        required: [true, 'Last name is required'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
    },
    role: {
        type: String,
        enum: ['manager', 'employee'],
        required: [true, 'Role is required'],
    },
    phone: {
        type: String,
        match: [/^\+91\d{10}$/, 'Phone number must be in the format +91XXXXXXXXXX'],
        required: [true, 'Phone number is required'],
    }
});
// Check if the model exists, if not create a new one
const Employee = mongoose_1.models.Employee || (0, mongoose_1.model)("Employee", EmployeeSchema);
exports.default = Employee;
