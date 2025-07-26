"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Basicdetails_1 = __importDefault(require("../models/Basicdetails")); // Ensure correct import
const PropertySelection_1 = __importDefault(require("../models/PropertySelection")); // Ensure correct import
const BasicDetailsRouter = express_1.default.Router();
/**
 * @route   POST /api/basic-details
 * @desc    Create BasicDetails (Auto-fetch propertyId if not provided)
 */
BasicDetailsRouter.post("/", async (req, res) => {
    try {
        const { propertyId, ...rest } = req.body;
        let finalPropertyId = propertyId;
        // If propertyId is not provided, fetch latest from PropertySelection
        if (!propertyId) {
            const lastPropertySelection = await PropertySelection_1.default.findOne()
                .sort({ createdAt: -1 })
                .select("propertyId");
            if (!lastPropertySelection) {
                return res.status(400).json({ success: false, message: "No property selection found" });
            }
            finalPropertyId = lastPropertySelection.propertyId;
        }
        const newBasicDetails = new Basicdetails_1.default({ ...rest, propertyId: finalPropertyId });
        await newBasicDetails.save();
        res.status(201).json({ success: true, message: "Basic details created", data: newBasicDetails });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
/**
 * @route   GET /api/basic-details
 * @desc    Get all BasicDetails
 */
BasicDetailsRouter.get("/", async (req, res) => {
    try {
        const data = await Basicdetails_1.default.find();
        res.status(200).json({ success: true, data });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
/**
 * @route   GET /api/basic-details/:id
 * @desc    Get BasicDetails by ID
 */
BasicDetailsRouter.get("/:id", async (req, res) => {
    try {
        const data = await Basicdetails_1.default.findById(req.params.id);
        if (!data)
            return res.status(404).json({ success: false, message: "Not found" });
        res.status(200).json({ success: true, data });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
/**
 * @route   PUT /api/basic-details/:id
 * @desc    Update BasicDetails
 */
BasicDetailsRouter.put("/:id", async (req, res) => {
    try {
        const data = await Basicdetails_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!data)
            return res.status(404).json({ success: false, message: "Not found" });
        res.status(200).json({ success: true, message: "Updated successfully", data });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
/**
 * @route   DELETE /api/basic-details/:id
 * @desc    Delete BasicDetails
 */
BasicDetailsRouter.delete("/:id", async (req, res) => {
    try {
        const data = await Basicdetails_1.default.findByIdAndDelete(req.params.id);
        if (!data)
            return res.status(404).json({ success: false, message: "Not found" });
        res.status(200).json({ success: true, message: "Deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.default = BasicDetailsRouter;
