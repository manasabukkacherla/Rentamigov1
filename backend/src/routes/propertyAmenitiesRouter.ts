import express from "express";
import mongoose from "mongoose";
import PropertyAmenities from "../models/PropertyAmenities";

const propertyAmenitiesRouter = express.Router();

// 🔹 Create or Update Property Amenities
propertyAmenitiesRouter.post("/add", async (req, res) => {
  try {
    const { userId, propertyId, selectedAmenities } = req.body;

    if (!userId || !propertyId || !Array.isArray(selectedAmenities)) {
      return res.status(400).json({ error: "User ID, property ID, and amenities are required" });
    }

    const existingAmenities = await PropertyAmenities.findOne({ userId, propertyId });

    if (existingAmenities) {
      existingAmenities.selectedAmenities = selectedAmenities;
      await existingAmenities.save();
      return res.status(200).json({ message: "Amenities updated successfully", propertyAmenities: existingAmenities });
    }

    const newAmenities = new PropertyAmenities({
      userId,
      propertyId,
      selectedAmenities,
    });

    await newAmenities.save();
    res.status(201).json({ message: "Property amenities added successfully", propertyAmenities: newAmenities });
  } catch (error) {
    console.error("❌ Error adding property amenities:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Get Property Amenities by Property ID
propertyAmenitiesRouter.get("/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ error: "Invalid Property ID format" });
    }

    const amenities = await PropertyAmenities.findOne({ propertyId });
    if (!amenities) {
      return res.status(404).json({ error: "Amenities not found for this property" });
    }

    res.status(200).json(amenities);
  } catch (error) {
    console.error("❌ Error fetching property amenities:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Delete Property Amenities by Property ID
propertyAmenitiesRouter.delete("/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ error: "Invalid Property ID format" });
    }

    const deletedAmenities = await PropertyAmenities.findOneAndDelete({ propertyId });

    if (!deletedAmenities) {
      return res.status(404).json({ error: "Amenities not found for this property" });
    }

    res.status(200).json({ message: "Property amenities deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting property amenities:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default propertyAmenitiesRouter;
