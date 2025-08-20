"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PropertySelection_1 = __importDefault(require("../models/PropertySelection"));
const PropertyRouter = express_1.default.Router();
// ✅ **1. API to Add a Property Selection & Generate Property ID**
PropertyRouter.post("/add", async (req, res) => {
    const { category, listingType, subCategory } = req.body;
    if (!category || !listingType || !subCategory) {
        return res.status(400).json({ success: false, error: "All fields are required" });
    }
    try {
        const newSelection = new PropertySelection_1.default({ category, listingType, subCategory });
        await newSelection.save();
        return res.status(201).json({
            success: true,
            message: "Property selection saved successfully",
            data: newSelection,
        });
    }
    catch (error) {
        console.error("Error saving property selection:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
});
// ✅ **2. API to Get All Property Selections**
PropertyRouter.get("/all", async (req, res) => {
    try {
        const selections = await PropertySelection_1.default.find().sort({ createdAt: -1 });
        return res.status(200).json({ success: true, data: selections });
    }
    catch (error) {
        console.error("Error fetching selections:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
});
// ✅ **3. API to Get a Specific Property Selection by ID**
PropertyRouter.get("/:id", async (req, res) => {
    try {
        const selection = await PropertySelection_1.default.findById(req.params.id);
        if (!selection) {
            return res.status(404).json({ success: false, message: "Selection not found" });
        }
        return res.status(200).json({ success: true, data: selection });
    }
    catch (error) {
        console.error("Error fetching selection:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
});
// ✅ **4. API to Delete a Property Selection**
PropertyRouter.delete("/:id", async (req, res) => {
    try {
        const deletedSelection = await PropertySelection_1.default.findByIdAndDelete(req.params.id);
        if (!deletedSelection) {
            return res.status(404).json({ success: false, message: "Selection not found" });
        }
        return res.status(200).json({ success: true, message: "Selection deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting selection:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
});
exports.default = PropertyRouter;
