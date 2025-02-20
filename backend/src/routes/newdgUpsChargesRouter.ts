import express from "express";
import mongoose from "mongoose";
import DgUpsCharges from "../models/DgUpsCharges";

const dgUpsChargesRouter = express.Router();

// 🔹 Create or Update DG & UPS Charges for a Property
dgUpsChargesRouter.post("/add", async (req, res) => {
  try {
    const { propertyId, dgUpsCharges } = req.body;

    if (!propertyId) {
      return res.status(400).json({ error: "Property ID is required" });
    }

    // Find existing record and update or create new one
    const updatedDgUpsCharges = await DgUpsCharges.findOneAndUpdate(
      { propertyId },
      { dgUpsCharges },
      { new: true, upsert: true }
    );

    res.status(201).json({ message: "DG & UPS Charges updated successfully", data: updatedDgUpsCharges });
  } catch (error) {
    console.error("❌ Error updating DG & UPS Charges:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Get DG & UPS Charges for a Property
dgUpsChargesRouter.get("/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ error: "Invalid property ID format" });
    }

    const dgUpsCharges = await DgUpsCharges.findOne({ propertyId });
    if (!dgUpsCharges) {
      return res.status(404).json({ error: "DG & UPS Charges not found" });
    }

    res.status(200).json(dgUpsCharges);
  } catch (error) {
    console.error("❌ Error fetching DG & UPS Charges:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Delete DG & UPS Charges for a Property
dgUpsChargesRouter.delete("/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ error: "Invalid property ID format" });
    }

    const deletedDgUpsCharges = await DgUpsCharges.findOneAndDelete({ propertyId });
    if (!deletedDgUpsCharges) {
      return res.status(404).json({ error: "DG & UPS Charges not found" });
    }

    res.status(200).json({ message: "DG & UPS Charges deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting DG & UPS Charges:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default dgUpsChargesRouter;
