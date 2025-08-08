"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employee_1 = __importDefault(require("../models/employee"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const emailservice_1 = __importDefault(require("../utils/emailservice"));
const Employeerouter = express_1.default.Router();
// ✅ Utility function to validate email format (name@rentamigo.in)
const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@rentamigo\.in$/;
    return emailRegex.test(email);
};
/**
 * 🔹 POST: Create a new Employee
 */
Employeerouter.post("/", async (req, res) => {
    try {
        const { name, email, role, phone, password, status } = req.body;
        // ✅ Step 1: Validate required fields
        if (!name || !email || !role || !phone || !password) {
            return res
                .status(400)
                .json({ success: false, message: "All fields are required" });
        }
        // ✅ Step 2: Validate email format (Allow any domain)
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid email format" });
        }
        // ✅ Step 3: Check if email or phone already exists
        const existingEmployee = await employee_1.default.findOne({
            $or: [{ email }, { phone }],
        });
        if (existingEmployee) {
            return res
                .status(400)
                .json({ success: false, message: "Email or phone already in use" });
        }
        // ✅ Step 4: Hash the password before saving
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        // ✅ Step 5: Create new employee record
        const newEmployee = new employee_1.default({
            name,
            email: email.toLowerCase(),
            role: role.toLowerCase(),
            phone,
            password: hashedPassword,
            status: status || "active", // Default to active
        });
        const savedEmployee = await newEmployee.save();
        console.log("✅ New Employee Created:", savedEmployee);
        // ✅ Step 6: Send Welcome Email (Do NOT fail API if email fails)
        try {
            const mailOptions = {
                from: process.env.EMAIL_USER, // Sender email
                to: email, // ✅ Send to any email address
                subject: "Welcome to Rentamigo!",
                html: `
          <h2>Welcome, ${name}!</h2>
          <p>Your account has been successfully created on <strong>Rentamigo</strong>.</p>
          <ul>
            <li><strong>Role:</strong> ${role}</li>
            <li><strong>Status:</strong> ${status}</li>
          </ul>
          <p>You can now log in using the email <strong>${email}</strong>.</p>
          <br />
          <p>Best Regards,</p>
          <p><strong>Rentamigo Team</strong></p>
        `,
            };
            console.log("➡️ Sending Welcome Email to:", email);
            const result = await emailservice_1.default.sendMail(mailOptions);
            console.log("✅ Employee Email Sent:", result);
        }
        catch (error) {
            console.error("❌ Error Sending Employee Email:", error);
            // Continue even if email sending fails
        }
        // ✅ Step 7: Return Success Response
        return res.status(201).json({
            success: true,
            message: "Employee created successfully",
            data: savedEmployee,
        });
    }
    catch (error) {
        console.error("❌ Error creating employee:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
});
/**
 * 🔹 GET: Fetch all employees
 */
Employeerouter.get("/", async (req, res) => {
    try {
        const employees = await employee_1.default.find().select("-password"); // Exclude password from response
        res.status(200).json({ success: true, data: employees });
    }
    catch (error) {
        console.error("❌ Error fetching employees:", error);
        res
            .status(500)
            .json({ success: false, message: "Error fetching employees" });
    }
});
Employeerouter.get("/active-count", async (req, res) => {
    try {
        const employees = await employee_1.default.find({}, { status: 1 });
        const activeCount = employees.filter((emp) => emp.status?.trim().toLowerCase() === "active").length;
        return res.status(200).json({ success: true, count: activeCount });
    }
    catch (error) {
        console.error("❌ Error fetching active employee count:", error);
        return res
            .status(500)
            .json({ success: false, message: "Failed to fetch count" });
    }
});
// Route: GET /api/employees/active-change
Employeerouter.get("/active-change", async (req, res) => {
    try {
        const now = new Date();
        const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const current = await employee_1.default.countDocuments({
            status: { $regex: /^active$/i },
            createdAt: { $gte: startOfThisMonth },
        });
        const previous = await employee_1.default.countDocuments({
            status: { $regex: /^active$/i },
            createdAt: { $gte: startOfLastMonth, $lt: startOfThisMonth },
        });
        const change = previous === 0 ? 100 : ((current - previous) / previous) * 100;
        res.status(200).json({
            success: true,
            current,
            previous,
            change: Number(change.toFixed(2)),
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Failed to calculate employee change" });
    }
});
/**
 * 🔹 GET: Fetch an Employee by ID
 */
Employeerouter.get("/:id", async (req, res) => {
    try {
        console.log("reacged here");
        const { id } = req.params;
        // const newId = id.userId;
        console.log("this is id", id);
        // Validate ID format
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid employee ID format" });
        }
        const employee = await employee_1.default.findById(id).select("-password"); // Exclude password
        if (!employee) {
            return res
                .status(404)
                .json({ success: false, message: "Employee not found" });
        }
        res.status(200).json({ success: true, data: employee });
    }
    catch (error) {
        console.error("❌ Error fetching employee:", error);
        res
            .status(500)
            .json({ success: false, message: "Error fetching employee" });
    }
});
/**
 * 🔹 PUT: Update an Employee (Name, Phone, Role, Status)
 */
Employeerouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phone, role, status } = req.body;
        // Validate ID format
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid employee ID format" });
        }
        const updateData = {};
        if (name)
            updateData.name = name;
        if (phone)
            updateData.phone = phone;
        if (role)
            updateData.role = role.toLowerCase();
        if (status)
            updateData.status = status;
        const updatedEmployee = await employee_1.default.findByIdAndUpdate(id, updateData, {
            new: true,
        }).select("-password");
        if (!updatedEmployee) {
            return res
                .status(404)
                .json({ success: false, message: "Employee not found" });
        }
        res.status(200).json({
            success: true,
            message: "Employee updated successfully",
            data: updatedEmployee,
        });
    }
    catch (error) {
        console.error("❌ Error updating employee:", error);
        res
            .status(500)
            .json({ success: false, message: "Error updating employee" });
    }
});
/**
 * 🔹 DELETE: Remove an Employee
 */
Employeerouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        // Validate ID format
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid employee ID format" });
        }
        const deletedEmployee = await employee_1.default.findByIdAndDelete(id);
        if (!deletedEmployee) {
            return res
                .status(404)
                .json({ success: false, message: "Employee not found" });
        }
        res
            .status(200)
            .json({ success: true, message: "Employee deleted successfully" });
    }
    catch (error) {
        console.error("❌ Error deleting employee:", error);
        res
            .status(500)
            .json({ success: false, message: "Error deleting employee" });
    }
});
exports.default = Employeerouter;
