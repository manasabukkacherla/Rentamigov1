import express from "express";
import AdditionalFinancials from "../models/additionalFinancials";
import mongoose from "mongoose";

const additionalFinancialsRouter = express.Router();

// 🔹 Create Financial Details for a Property
additionalFinancialsRouter.post("/add-financials", async (req, res) => {
  try {
    const { propertyId, negotiable, dgUpsCharges, electricityCharges, waterCharges } = req.body;

    if (!propertyId) {
      return res.status(400).json({ error: "Property ID is required" });
    }

    const newFinancialDetails = new AdditionalFinancials({
      propertyId,
      negotiable,
      dgUpsCharges,
      electricityCharges,
      waterCharges,
    });

    await newFinancialDetails.save();
    res.status(201).json({ message: "Financial details added successfully", data: newFinancialDetails });
  } catch (error) {
    console.error("❌ Error adding financial details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Get Financial Details for a Property
additionalFinancialsRouter.get("/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ error: "Invalid property ID format" });
    }

    const financialDetails = await AdditionalFinancials.findOne({ propertyId });

    if (!financialDetails) {
      return res.status(404).json({ error: "Financial details not found for this property" });
    }

    res.status(200).json(financialDetails);
  } catch (error) {
    console.error("❌ Error fetching financial details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Update Financial Details for a Property
additionalFinancialsRouter.put("/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ error: "Invalid property ID format" });
    }

    const updatedFinancials = await AdditionalFinancials.findOneAndUpdate(
      { propertyId },
      updateData,
      { new: true }
    );

    if (!updatedFinancials) {
      return res.status(404).json({ error: "Financial details not found" });
    }

    res.status(200).json({ message: "Financial details updated successfully", data: updatedFinancials });
  } catch (error) {
    console.error("❌ Error updating financial details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Delete Financial Details for a Property
additionalFinancialsRouter.delete("/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ error: "Invalid property ID format" });
    }

    const deletedFinancials = await AdditionalFinancials.findOneAndDelete({ propertyId });

    if (!deletedFinancials) {
      return res.status(404).json({ error: "Financial details not found" });
    }

    res.status(200).json({ message: "Financial details deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting financial details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default additionalFinancialsRouter;
