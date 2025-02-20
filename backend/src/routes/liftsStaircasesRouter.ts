import express from "express";
import mongoose from "mongoose";
import LiftsStaircases from "../models/LiftsStaircases";

const liftsStaircasesRouter = express.Router();

// 🔹 Create or Update Lifts & Staircases Details
liftsStaircasesRouter.post("/add", async (req, res) => {
  try {
    const { propertyId, staircaseCount, passengerLifts, serviceLifts } = req.body;

    if (!propertyId || staircaseCount < 0 || passengerLifts < 0 || serviceLifts < 0) {
      return res.status(400).json({ error: "Invalid property ID or details" });
    }

    // Find existing record and update or create a new one
    const updatedLiftsStaircases = await LiftsStaircases.findOneAndUpdate(
      { propertyId },
      { staircaseCount, passengerLifts, serviceLifts },
      { new: true, upsert: true }
    );

    res.status(201).json({
      message: "Lifts & Staircases details updated successfully",
      data: updatedLiftsStaircases,
    });
  } catch (error) {
    console.error("❌ Error updating Lifts & Staircases details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Get Lifts & Staircases Details for a Property
liftsStaircasesRouter.get("/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ error: "Invalid property ID format" });
    }

    const liftsStaircasesData = await LiftsStaircases.findOne({ propertyId });
    if (!liftsStaircasesData) {
      return res.status(404).json({ error: "Lifts & Staircases details not found" });
    }

    res.status(200).json(liftsStaircasesData);
  } catch (error) {
    console.error("❌ Error fetching Lifts & Staircases details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Delete Lifts & Staircases Details for a Property
liftsStaircasesRouter.delete("/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ error: "Invalid property ID format" });
    }

    const deletedLiftsStaircases = await LiftsStaircases.findOneAndDelete({ propertyId });
    if (!deletedLiftsStaircases) {
      return res.status(404).json({ error: "Lifts & Staircases details not found" });
    }

    res.status(200).json({ message: "Lifts & Staircases details deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting Lifts & Staircases details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default liftsStaircasesRouter;
