import express from "express";
import mongoose from "mongoose";
import WaterCharges from "../models/waterCharges";

const waterChargesRouter = express.Router();

// 🔹 Create or Update Water Charges
waterChargesRouter.post("/add", async (req, res) => {
  try {
    const { userId, isIncluded } = req.body;

    if (typeof isIncluded !== "boolean" || !userId) {
      return res.status(400).json({ error: "User ID and isIncluded (true/false) are required" });
    }

    const existingEntry = await WaterCharges.findOne({ userId });

    if (existingEntry) {
      existingEntry.isIncluded = isIncluded;
      await existingEntry.save();
      return res.status(200).json({ message: "Water charges updated successfully", data: existingEntry });
    }

    const newWaterCharges = new WaterCharges({
      userId,
      isIncluded,
    });

    await newWaterCharges.save();
    res.status(201).json({ message: "Water charges added successfully", data: newWaterCharges });
  } catch (error) {
    console.error("❌ Error managing water charges:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Get Water Charges by User ID
waterChargesRouter.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid User ID format" });
    }

    const waterCharges = await WaterCharges.findOne({ userId });

    if (!waterCharges) {
      return res.status(404).json({ error: "Water charges not found for this user" });
    }

    res.status(200).json(waterCharges);
  } catch (error) {
    console.error("❌ Error fetching water charges:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Delete Water Charges by User ID
waterChargesRouter.delete("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid User ID format" });
    }

    const deletedCharges = await WaterCharges.findOneAndDelete({ userId });

    if (!deletedCharges) {
      return res.status(404).json({ error: "Water charges not found for this user" });
    }

    res.status(200).json({ message: "Water charges deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting water charges:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default waterChargesRouter;
