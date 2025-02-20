import express from "express";
import mongoose from "mongoose";
import PropertyDetailsForm from "../models/newPropertyDetailsform";

const NewPropertyDetailsRouter = express.Router();

// 🔹 Create or Update Property Details
NewPropertyDetailsRouter.post("/add", async (req, res) => {
  try {
    const { userId, building, locality } = req.body;

    if (!userId || !locality) {
      return res.status(400).json({ error: "User ID and locality are required" });
    }

    const existingProperty = await PropertyDetailsForm.findOne({ userId });

    if (existingProperty) {
      existingProperty.building = building || existingProperty.building;
      existingProperty.locality = locality;
      await existingProperty.save();
      return res.status(200).json({ message: "Property details updated successfully", propertyDetails: existingProperty });
    }

    const newProperty = new PropertyDetailsForm({
      userId,
      building,
      locality,
    });

    await newProperty.save();
    res.status(201).json({ message: "Property details added successfully", propertyDetails: newProperty });
  } catch (error) {
    console.error("❌ Error adding property details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Get Property Details by User ID
NewPropertyDetailsRouter.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid User ID format" });
    }

    const propertyDetails = await PropertyDetailsForm.findOne({ userId });
    if (!propertyDetails) {
      return res.status(404).json({ error: "Property details not found for this user" });
    }

    res.status(200).json(propertyDetails);
  } catch (error) {
    console.error("❌ Error fetching property details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Delete Property Details by User ID
NewPropertyDetailsRouter.delete("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid User ID format" });
    }

    const deletedProperty = await PropertyDetailsForm.findOneAndDelete({ userId });

    if (!deletedProperty) {
      return res.status(404).json({ error: "Property details not found for this user" });
    }

    res.status(200).json({ message: "Property details deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting property details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default NewPropertyDetailsRouter;
