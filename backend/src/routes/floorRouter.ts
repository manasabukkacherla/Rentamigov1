import express from "express";
import mongoose from "mongoose";
import Floor from "../models/Floor";

const floorRouter = express.Router();

// 🔹 Create or Update Floor Details
floorRouter.post("/add", async (req, res) => {
  try {
    const { propertyId, totalFloors, yourFloor } = req.body;

    if (!propertyId || totalFloors < 1 || yourFloor < 0) {
      return res.status(400).json({ error: "Invalid property ID or floor details" });
    }

    if (yourFloor > totalFloors) {
      return res.status(400).json({ error: "Your floor cannot be greater than total floors" });
    }

    // Find existing record and update or create new one
    const updatedFloor = await Floor.findOneAndUpdate(
      { propertyId },
      { totalFloors, yourFloor },
      { new: true, upsert: true }
    );

    res.status(201).json({ message: "Floor details updated successfully", data: updatedFloor });
  } catch (error) {
    console.error("❌ Error updating floor details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Get Floor Details for a Property
floorRouter.get("/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ error: "Invalid property ID format" });
    }

    const floorData = await Floor.findOne({ propertyId });
    if (!floorData) {
      return res.status(404).json({ error: "Floor details not found" });
    }

    res.status(200).json(floorData);
  } catch (error) {
    console.error("❌ Error fetching floor details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Delete Floor Details for a Property
floorRouter.delete("/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ error: "Invalid property ID format" });
    }

    const deletedFloor = await Floor.findOneAndDelete({ propertyId });
    if (!deletedFloor) {
      return res.status(404).json({ error: "Floor details not found" });
    }

    res.status(200).json({ message: "Floor details deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting floor details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default floorRouter;
