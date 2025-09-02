"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/serviceEnquiryRoutes.ts
const express_1 = __importDefault(require("express"));
const ServiceEnquiry_1 = __importDefault(require("../models/ServiceEnquiry"));
const router = express_1.default.Router();
// POST route to create a new service enquiry
router.post("/service-enquiry", async (req, res) => {
    try {
        const { name, email, mobileNo, selectedServices } = req.body;
        // Validate required fields
        if (!name ||
            !email || +!mobileNo ||
            !selectedServices ||
            selectedServices.length === 0) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        // Create new service enquiry
        const serviceEnquiry = await ServiceEnquiry_1.default.create({
            name,
            email,
            mobileNo,
            selectedServices,
        });
        return res.status(201).json({
            message: "Service enquiry created successfully",
            serviceEnquiry,
        });
    }
    catch (error) {
        console.error("Error creating service enquiry:", error);
        return res.status(500).json({
            error: error.message || "Failed to create service enquiry",
        });
    }
});
// GET route to fetch all service enquiries
router.get("/service-enquiry", async (_req, res) => {
    try {
        const enquiries = await ServiceEnquiry_1.default.find({})
            .sort({ createdAt: -1 })
            .select("-__v");
        return res.status(200).json(enquiries);
    }
    catch (error) {
        console.error("Error fetching service enquiries:", error);
        return res.status(500).json({
            error: "Failed to fetch service enquiries",
        });
    }
});
exports.default = router;
