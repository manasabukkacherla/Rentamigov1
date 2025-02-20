import express from "express";
import mongoose from "mongoose";
import OtherPropertyDetails from "../models/OtherPropertyDetails";

const otherPropertyDetailsRouter = express.Router();

// 🔹 Create a new Other Property Entry
otherPropertyDetailsRouter.post("/add", async (req, res) => {
  try {
    const { userId, isPreLeased, currentRent, leaseYears, expectedRoi } = req.body;

    if (typeof isPreLeased !== "boolean" || !userId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (isPreLeased && (!currentRent || !leaseYears)) {
      return res.status(400).json({ error: "For pre-leased properties, currentRent and leaseYears are required" });
    }

    if (!isPreLeased && expectedRoi === undefined) {
      return res.status(400).json({ error: "For non-pre-leased properties, expected ROI is required" });
    }

    const newOtherProperty = new OtherPropertyDetails({
      userId,
      isPreLeased,
      currentRent,
      leaseYears,
      expectedRoi,
    });

    await newOtherProperty.save();
    res.status(201).json({ message: "Other Property details added successfully", property: newOtherProperty });
  } catch (error) {
    console.error("❌ Error adding Other Property Details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Get Other Property Details by User ID
otherPropertyDetailsRouter.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid User ID format" });
    }

    const properties = await OtherPropertyDetails.find({ userId });
    res.status(200).json(properties);
  } catch (error) {
    console.error("❌ Error fetching Other Property Details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Get Other Property Details by ID
otherPropertyDetailsRouter.get("/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ error: "Invalid Property ID format" });
    }

    const property = await OtherPropertyDetails.findById(propertyId);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.status(200).json(property);
  } catch (error) {
    console.error("❌ Error fetching Other Property Details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Update Other Property Details by ID
otherPropertyDetailsRouter.put("/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ error: "Invalid Property ID format" });
    }

    const updatedProperty = await OtherPropertyDetails.findByIdAndUpdate(propertyId, updateData, { new: true });

    if (!updatedProperty) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.status(200).json({ message: "Other Property details updated successfully", updatedProperty });
  } catch (error) {
    console.error("❌ Error updating Other Property Details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Delete Other Property Details by ID
otherPropertyDetailsRouter.delete("/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ error: "Invalid Property ID format" });
    }

    const deletedProperty = await OtherPropertyDetails.findByIdAndDelete(propertyId);

    if (!deletedProperty) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.status(200).json({ message: "Other Property details deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting Other Property Details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default otherPropertyDetailsRouter;
