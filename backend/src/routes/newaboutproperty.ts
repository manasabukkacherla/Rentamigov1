import express from "express";
import AboutProperty from "../models/aboutproperty";
import mongoose from "mongoose";
const aboutPropertyRouter = express.Router();

// 🔹 Create a new property
aboutPropertyRouter.post("/abopro", async (req, res) => {
  try {
    const {
      userId,
      zoneType,
      locationHub,
      otherLocationHub,
      propertyCondition,
      builtUpArea,
      carpetArea,
      ownership,
      constructionStatus,
      flooring,
    } = req.body;

    // Check if required fields are provided
    if (!userId || !zoneType || !locationHub || !propertyCondition || !builtUpArea || !ownership) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newProperty = new AboutProperty({
      userId,
      zoneType,
      locationHub,
      otherLocationHub,
      propertyCondition,
      builtUpArea,
      carpetArea,
      ownership,
      constructionStatus,
      flooring,
    });

    await newProperty.save();
    res.status(201).json({ message: "Property created successfully", property: newProperty });
  } catch (error) {
    console.error("❌ Error creating property:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Fetch all properties
aboutPropertyRouter.get("/abopro", async (req, res) => {
  try {
    const properties = await AboutProperty.find();
    res.status(200).json(properties);
  } catch (error) {
    console.error("❌ Error fetching properties:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Fetch a property by ID
aboutPropertyRouter.get("/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ error: "Invalid property ID format" });
    }

    const property = await AboutProperty.findById(propertyId);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.status(200).json(property);
  } catch (error) {
    console.error("❌ Error fetching property:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Update a property by ID
aboutPropertyRouter.put("/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ error: "Invalid property ID format" });
    }

    const updatedProperty = await AboutProperty.findByIdAndUpdate(propertyId, updateData, { new: true });

    if (!updatedProperty) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.status(200).json({ message: "Property updated successfully", updatedProperty });
  } catch (error) {
    console.error("❌ Error updating property:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Delete a property by ID
aboutPropertyRouter.delete("/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ error: "Invalid property ID format" });
    }

    const deletedProperty = await AboutProperty.findByIdAndDelete(propertyId);

    if (!deletedProperty) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting property:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default aboutPropertyRouter;
