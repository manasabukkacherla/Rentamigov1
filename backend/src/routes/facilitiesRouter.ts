import express from "express";
import mongoose from "mongoose";
import Facilities from "../models/Facilities";

const facilitiesRouter = express.Router();

// 🔹 Create or Update Facilities for a Property
facilitiesRouter.post("/add", async (req, res) => {
  try {
    const { propertyId, privateWashrooms, publicWashrooms } = req.body;

    if (!propertyId) {
      return res.status(400).json({ error: "Property ID is required" });
    }

    if (privateWashrooms < 0 || publicWashrooms < 0) {
      return res.status(400).json({ error: "Washrooms cannot be negative" });
    }

    // Find existing record and update or create new one
    const updatedFacilities = await Facilities.findOneAndUpdate(
      { propertyId },
      { privateWashrooms, publicWashrooms },
      { new: true, upsert: true }
    );

    res.status(201).json({ message: "Facilities updated successfully", data: updatedFacilities });
  } catch (error) {
    console.error("❌ Error updating Facilities:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Get Facilities for a Property
facilitiesRouter.get("/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ error: "Invalid property ID format" });
    }

    const facilities = await Facilities.findOne({ propertyId });
    if (!facilities) {
      return res.status(404).json({ error: "Facilities not found" });
    }

    res.status(200).json(facilities);
  } catch (error) {
    console.error("❌ Error fetching Facilities:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Delete Facilities for a Property
facilitiesRouter.delete("/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ error: "Invalid property ID format" });
    }

    const deletedFacilities = await Facilities.findOneAndDelete({ propertyId });
    if (!deletedFacilities) {
      return res.status(404).json({ error: "Facilities not found" });
    }

    res.status(200).json({ message: "Facilities deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting Facilities:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default facilitiesRouter;
