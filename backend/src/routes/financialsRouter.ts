import express from "express";
import mongoose from "mongoose";
import Financials from "../models/Financials";

const financialsRouter = express.Router();

// 🔹 Create or Update Financials for a Property
financialsRouter.post("/add", async (req, res) => {
  try {
    const { propertyId, expectedRent, securityDeposit } = req.body;

    if (!propertyId || expectedRent < 0) {
      return res.status(400).json({ error: "Invalid property ID or expected rent" });
    }

    // Find existing record and update or create new one
    const updatedFinancials = await Financials.findOneAndUpdate(
      { propertyId },
      { expectedRent, securityDeposit },
      { new: true, upsert: true }
    );

    res.status(201).json({ message: "Financials updated successfully", data: updatedFinancials });
  } catch (error) {
    console.error("❌ Error updating financials:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Get Financials for a Property
financialsRouter.get("/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ error: "Invalid property ID format" });
    }

    const financialData = await Financials.findOne({ propertyId });
    if (!financialData) {
      return res.status(404).json({ error: "Financials not found" });
    }

    res.status(200).json(financialData);
  } catch (error) {
    console.error("❌ Error fetching financials:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Delete Financials for a Property
financialsRouter.delete("/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ error: "Invalid property ID format" });
    }

    const deletedFinancials = await Financials.findOneAndDelete({ propertyId });
    if (!deletedFinancials) {
      return res.status(404).json({ error: "Financials not found" });
    }

    res.status(200).json({ message: "Financials deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting financials:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default financialsRouter;
