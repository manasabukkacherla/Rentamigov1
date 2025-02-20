import express from "express";
import mongoose from "mongoose";
import Negotiable from "../models/Negotiable";

const negotiableRouter = express.Router();

// 🔹 Create or Update Negotiable Status
negotiableRouter.post("/add", async (req, res) => {
  try {
    const { propertyId, negotiable } = req.body;

    if (!propertyId) {
      return res.status(400).json({ error: "Property ID is required" });
    }

    // Find existing record and update or create a new one
    const updatedNegotiable = await Negotiable.findOneAndUpdate(
      { propertyId },
      { negotiable },
      { new: true, upsert: true }
    );

    res.status(201).json({
      message: "Negotiable status updated successfully",
      data: updatedNegotiable,
    });
  } catch (error) {
    console.error("❌ Error updating negotiable status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Get Negotiable Status for a Property
negotiableRouter.get("/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ error: "Invalid property ID format" });
    }

    const negotiableData = await Negotiable.findOne({ propertyId });
    if (!negotiableData) {
      return res.status(404).json({ error: "Negotiable status not found" });
    }

    res.status(200).json(negotiableData);
  } catch (error) {
    console.error("❌ Error fetching negotiable status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Delete Negotiable Status for a Property
negotiableRouter.delete("/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ error: "Invalid property ID format" });
    }

    const deletedNegotiable = await Negotiable.findOneAndDelete({ propertyId });
    if (!deletedNegotiable) {
      return res.status(404).json({ error: "Negotiable status not found" });
    }

    res.status(200).json({ message: "Negotiable status deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting negotiable status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default negotiableRouter;
