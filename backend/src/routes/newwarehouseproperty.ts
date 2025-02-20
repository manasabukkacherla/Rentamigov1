import express from "express";
import mongoose from "mongoose";
import WarehouseProperty from "../models/warehouseProperty";

const warehousePropertyRouter = express.Router();

// 🔹 Create or Update Warehouse Property
warehousePropertyRouter.post("/add", async (req, res) => {
  try {
    const { userId, zoneType, locationHub, otherLocationHub, builtUpArea, carpetArea, ownership, expectedRent, securityDeposit } = req.body;

    if (!userId || !zoneType || !locationHub || !builtUpArea || !carpetArea || !ownership || !expectedRent) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existingProperty = await WarehouseProperty.findOne({ userId });

    if (existingProperty) {
      existingProperty.zoneType = zoneType;
      existingProperty.locationHub = locationHub;
      existingProperty.otherLocationHub = otherLocationHub;
      existingProperty.builtUpArea = builtUpArea;
      existingProperty.carpetArea = carpetArea;
      existingProperty.ownership = ownership;
      existingProperty.expectedRent = expectedRent;
      existingProperty.securityDeposit = securityDeposit;
      await existingProperty.save();

      return res.status(200).json({ message: "Warehouse property updated successfully", property: existingProperty });
    }

    const newWarehouseProperty = new WarehouseProperty({
      userId,
      zoneType,
      locationHub,
      otherLocationHub,
      builtUpArea,
      carpetArea,
      ownership,
      expectedRent,
      securityDeposit,
    });

    await newWarehouseProperty.save();
    res.status(201).json({ message: "Warehouse property added successfully", property: newWarehouseProperty });
  } catch (error) {
    console.error("❌ Error adding warehouse property:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Get Warehouse Property by User ID
warehousePropertyRouter.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid User ID format" });
    }

    const warehouseProperty = await WarehouseProperty.findOne({ userId });

    if (!warehouseProperty) {
      return res.status(404).json({ error: "Warehouse property not found for this user" });
    }

    res.status(200).json(warehouseProperty);
  } catch (error) {
    console.error("❌ Error fetching warehouse property:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Delete Warehouse Property by User ID
warehousePropertyRouter.delete("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid User ID format" });
    }

    const deletedProperty = await WarehouseProperty.findOneAndDelete({ userId });

    if (!deletedProperty) {
      return res.status(404).json({ error: "Warehouse property not found for this user" });
    }

    res.status(200).json({ message: "Warehouse property deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting warehouse property:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default warehousePropertyRouter;
