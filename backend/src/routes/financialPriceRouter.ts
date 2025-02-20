import express from "express";
import mongoose from "mongoose";
import FinancialPrice from "../models/FinancialPrice";

const financialPriceRouter = express.Router();

// 🔹 Create or Update Financial Price for a Property
financialPriceRouter.post("/add", async (req, res) => {
  try {
    const { propertyId, price } = req.body;

    if (!propertyId || price < 0) {
      return res.status(400).json({ error: "Invalid property ID or negative price" });
    }

    // Find existing record and update or create new one
    const updatedPrice = await FinancialPrice.findOneAndUpdate(
      { propertyId },
      { price },
      { new: true, upsert: true }
    );

    res.status(201).json({ message: "Financial price updated successfully", data: updatedPrice });
  } catch (error) {
    console.error("❌ Error updating financial price:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Get Financial Price for a Property
financialPriceRouter.get("/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ error: "Invalid property ID format" });
    }

    const priceData = await FinancialPrice.findOne({ propertyId });
    if (!priceData) {
      return res.status(404).json({ error: "Financial price not found" });
    }

    res.status(200).json(priceData);
  } catch (error) {
    console.error("❌ Error fetching financial price:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Delete Financial Price for a Property
financialPriceRouter.delete("/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ error: "Invalid property ID format" });
    }

    const deletedPrice = await FinancialPrice.findOneAndDelete({ propertyId });
    if (!deletedPrice) {
      return res.status(404).json({ error: "Financial price not found" });
    }

    res.status(200).json({ message: "Financial price deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting financial price:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default financialPriceRouter;
