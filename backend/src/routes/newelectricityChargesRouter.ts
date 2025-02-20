import express from "express";
import mongoose from "mongoose";
import ElectricityCharges from "../models/ElectricityCharges";

const electricityChargesRouter = express.Router();

// 🔹 Create or Update Electricity Charges for a Property
electricityChargesRouter.post("/add", async (req, res) => {
  try {
    const { propertyId, isIncluded } = req.body;

    if (!propertyId) {
      return res.status(400).json({ error: "Property ID is required" });
    }

    // Find existing record and update or create new one
    const updatedElectricityCharges = await ElectricityCharges.findOneAndUpdate(
      { propertyId },
      { isIncluded },
      { new: true, upsert: true }
    );

    res.status(201).json({ message: "Electricity Charges updated successfully", data: updatedElectricityCharges });
  } catch (error) {
    console.error("❌ Error updating Electricity Charges:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Get Electricity Charges for a Property
electricityChargesRouter.get("/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ error: "Invalid property ID format" });
    }

    const electricityCharges = await ElectricityCharges.findOne({ propertyId });
    if (!electricityCharges) {
      return res.status(404).json({ error: "Electricity Charges not found" });
    }

    res.status(200).json(electricityCharges);
  } catch (error) {
    console.error("❌ Error fetching Electricity Charges:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Delete Electricity Charges for a Property
electricityChargesRouter.delete("/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ error: "Invalid property ID format" });
    }

    const deletedElectricityCharges = await ElectricityCharges.findOneAndDelete({ propertyId });
    if (!deletedElectricityCharges) {
      return res.status(404).json({ error: "Electricity Charges not found" });
    }

    res.status(200).json({ message: "Electricity Charges deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting Electricity Charges:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default electricityChargesRouter;
