"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employee_1 = __importDefault(require("../models/employee"));
const employeeRouter = express_1.default.Router();
// CREATE - Post a new employee
employeeRouter.post("/", async (req, res) => {
    try {
        const employee = new employee_1.default(req.body);
        const savedEmployee = await employee.save();
        res.status(201).json(savedEmployee);
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
employeeRouter.post("/verify", async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }
        const employee = await employee_1.default.findOne({ email });
        console.log(`Employee verification attempt for email: ${email}`);
        if (!employee) {
            console.log(`Verification failed: No employee found with email ${email}`);
            return res.status(404).json({
                success: false,
                message: "Employee not found with this email",
            });
        }
        console.log(`Employee verified successfully: ${employee._id}`);
        return res.status(200).json({
            success: true,
            message: "Employee verified successfully",
            data: {
                isVerified: true,
                employeeId: employee._id,
            },
        });
    }
    catch (error) {
        console.error("Employee verification error:", error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
// READ - Get all employees
employeeRouter.get("/", async (_req, res) => {
    try {
        const employees = await employee_1.default.find();
        res.status(200).json({ success: true, data: employees });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
// READ - Get employee by ID
employeeRouter.get("/:id", async (req, res) => {
    try {
        const employee = await employee_1.default.findById(req.params.id);
        if (!employee) {
            return res
                .status(404)
                .json({ success: false, message: "Employee not found" });
        }
        res.status(200).json({ success: true, data: employee });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
// UPDATE - Update employee by ID
employeeRouter.put("/:id", async (req, res) => {
    try {
        const employee = await employee_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!employee) {
            return res
                .status(404)
                .json({ success: false, message: "Employee not found" });
        }
        res.status(200).json({ success: true, data: employee });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
// DELETE - Delete employee by ID
employeeRouter.delete("/:id", async (req, res) => {
    try {
        const employee = await employee_1.default.findByIdAndDelete(req.params.id);
        if (!employee) {
            return res
                .status(404)
                .json({ success: false, message: "Employee not found" });
        }
        res
            .status(200)
            .json({ success: true, message: "Employee deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.default = employeeRouter;
