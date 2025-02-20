import express from "express";
import mongoose from "mongoose";
import PeriodDetails from "../models/PeriodDetails";

const periodDetailsRouter = express.Router();

// 🔹 Create a new Period Details Entry
periodDetailsRouter.post("/add", async (req, res) => {
  try {
    const { userId, lockInPeriod, rentIncrease } = req.body;

    if (!userId || lockInPeriod === undefined || rentIncrease === undefined) {
      return res.status(400).json({ error: "User ID, lock-in period, and rent increase are required" });
    }

    const newPeriodDetails = new PeriodDetails({
      userId,
      lockInPeriod,
      rentIncrease,
    });

    await newPeriodDetails.save();
    res.status(201).json({ message: "Period details added successfully", periodDetails: newPeriodDetails });
  } catch (error) {
    console.error("❌ Error adding Period Details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Get Period Details by User ID
periodDetailsRouter.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid User ID format" });
    }

    const periodDetails = await PeriodDetails.find({ userId });
    res.status(200).json(periodDetails);
  } catch (error) {
    console.error("❌ Error fetching Period Details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Get Period Details by ID
periodDetailsRouter.get("/:periodId", async (req, res) => {
  try {
    const { periodId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(periodId)) {
      return res.status(400).json({ error: "Invalid Period Details ID format" });
    }

    const period = await PeriodDetails.findById(periodId);
    if (!period) {
      return res.status(404).json({ error: "Period details not found" });
    }

    res.status(200).json(period);
  } catch (error) {
    console.error("❌ Error fetching Period Details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Update Period Details by ID
periodDetailsRouter.put("/:periodId", async (req, res) => {
  try {
    const { periodId } = req.params;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(periodId)) {
      return res.status(400).json({ error: "Invalid Period Details ID format" });
    }

    const updatedPeriod = await PeriodDetails.findByIdAndUpdate(periodId, updateData, { new: true });

    if (!updatedPeriod) {
      return res.status(404).json({ error: "Period details not found" });
    }

    res.status(200).json({ message: "Period details updated successfully", updatedPeriod });
  } catch (error) {
    console.error("❌ Error updating Period Details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Delete Period Details by ID
periodDetailsRouter.delete("/:periodId", async (req, res) => {
  try {
    const { periodId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(periodId)) {
      return res.status(400).json({ error: "Invalid Period Details ID format" });
    }

    const deletedPeriod = await PeriodDetails.findByIdAndDelete(periodId);

    if (!deletedPeriod) {
      return res.status(404).json({ error: "Period details not found" });
    }

    res.status(200).json({ message: "Period details deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting Period Details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default periodDetailsRouter;
