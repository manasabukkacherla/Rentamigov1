import express from "express";
import mongoose from "mongoose";
import PropertyDetails from "../models/newPropertyDetails";

const propertyDetailsRouter = express.Router();

// 🔹 Create a new Property Entry
propertyDetailsRouter.post("/add", async (req, res) => {
  try {
    const { userId, building, locality, propertyName } = req.body;

    if (!userId || !locality || !propertyName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newProperty = new PropertyDetails({
      userId,
      building,
      locality,
      propertyName,
    });

    await newProperty.save();
    res.status(201).json({ message: "Property added successfully", property: newProperty });
  } catch (error) {
    console.error("❌ Error adding property:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Get Properties by User ID
propertyDetailsRouter.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid User ID format" });
    }

    const properties = await PropertyDetails.find({ userId });
    res.status(200).json(properties);
  } catch (error) {
    console.error("❌ Error fetching properties:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Get a Property by Property ID
propertyDetailsRouter.get("/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ error: "Invalid Property ID format" });
    }

    const property = await PropertyDetails.findById(propertyId);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.status(200).json(property);
  } catch (error) {
    console.error("❌ Error fetching property:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Update a Property by ID
propertyDetailsRouter.put("/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ error: "Invalid Property ID format" });
    }

    const updatedProperty = await PropertyDetails.findByIdAndUpdate(propertyId, updateData, { new: true });

    if (!updatedProperty) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.status(200).json({ message: "Property updated successfully", updatedProperty });
  } catch (error) {
    console.error("❌ Error updating property:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Delete a Property by ID
propertyDetailsRouter.delete("/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ error: "Invalid Property ID format" });
    }

    const deletedProperty = await PropertyDetails.findByIdAndDelete(propertyId);

    if (!deletedProperty) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting property:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default propertyDetailsRouter;
