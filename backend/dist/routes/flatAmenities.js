"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const FlatAmenity_1 = __importDefault(require("../models/FlatAmenity"));
const router = express_1.default.Router();
// ✅ Get all flat amenities
router.get("/", async (req, res) => {
    try {
        const flatAmenities = await FlatAmenity_1.default.find();
        res.status(200).json(flatAmenities);
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching flat amenities" });
    }
});
// ✅ Get flat amenities by flat ID
router.get("/:flatId", async (req, res) => {
    try {
        const flatAmenities = await FlatAmenity_1.default.findOne({ flatId: req.params.flatId });
        if (!flatAmenities) {
            return res.status(404).json({ error: "No amenities found for this flat" });
        }
        res.status(200).json(flatAmenities);
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching amenities for the flat" });
    }
});
// ✅ Add flat amenities
router.post("/", async (req, res) => {
    try {
        const newFlatAmenity = new FlatAmenity_1.default(req.body);
        const savedFlatAmenity = await newFlatAmenity.save();
        res.status(201).json(savedFlatAmenity);
    }
    catch (error) {
        res.status(500).json({ error: "Error adding flat amenities" });
    }
});
// ✅ Update flat amenities by flat ID
router.put("/:flatId", async (req, res) => {
    try {
        const updatedAmenity = await FlatAmenity_1.default.findOneAndUpdate({ flatId: req.params.flatId }, req.body, { new: true });
        if (!updatedAmenity) {
            return res.status(404).json({ error: "Flat amenities not found" });
        }
        res.status(200).json(updatedAmenity);
    }
    catch (error) {
        res.status(500).json({ error: "Error updating flat amenities" });
    }
});
// ✅ Delete flat amenities by flat ID
router.delete("/:flatId", async (req, res) => {
    try {
        const deletedAmenity = await FlatAmenity_1.default.findOneAndDelete({ flatId: req.params.flatId });
        if (!deletedAmenity) {
            return res.status(404).json({ error: "Flat amenities not found" });
        }
        res.status(200).json({ message: "Flat amenities deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Error deleting flat amenities" });
    }
});
exports.default = router;
