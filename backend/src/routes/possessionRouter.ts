import express from "express";
import mongoose from "mongoose";
import PossessionInfo from "../models/PossessionInfo";

const possessionRouter = express.Router();

// 🔹 Create a new Possession Info
possessionRouter.post("/add", async (req, res) => {
  try {
    const { userId, possessionStatus, availableFrom, ageOfProperty } = req.body;

    if (!userId || !possessionStatus || !availableFrom) {
      return res.status(400).json({ error: "User ID, possession status, and available from date are required" });
    }

    // Validate that ageOfProperty is provided for 'ready' status
    if (possessionStatus === "ready" && (ageOfProperty === undefined || ageOfProperty < 0)) {
      return res.status(400).json({ error: "Age of property is required for ready-to-move properties" });
    }

    const newPossession = new PossessionInfo({
      userId,
      possessionStatus,
      availableFrom,
      ageOfProperty,
    });

    await newPossession.save();
    res.status(201).json({ message: "Possession Info added successfully", possessionInfo: newPossession });
  } catch (error) {
    console.error("❌ Error adding Possession Info:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Get Possession Info by User ID
possessionRouter.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid User ID format" });
    }

    const possessionDetails = await PossessionInfo.find({ userId });
    res.status(200).json(possessionDetails);
  } catch (error) {
    console.error("❌ Error fetching Possession Info:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Get Possession Info by ID
possessionRouter.get("/:possessionId", async (req, res) => {
  try {
    const { possessionId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(possessionId)) {
      return res.status(400).json({ error: "Invalid Possession Info ID format" });
    }

    const possessionInfo = await PossessionInfo.findById(possessionId);
    if (!possessionInfo) {
      return res.status(404).json({ error: "Possession info not found" });
    }

    res.status(200).json(possessionInfo);
  } catch (error) {
    console.error("❌ Error fetching Possession Info:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Update Possession Info by ID
possessionRouter.put("/:possessionId", async (req, res) => {
  try {
    const { possessionId } = req.params;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(possessionId)) {
      return res.status(400).json({ error: "Invalid Possession Info ID format" });
    }

    const updatedPossession = await PossessionInfo.findByIdAndUpdate(possessionId, updateData, { new: true });

    if (!updatedPossession) {
      return res.status(404).json({ error: "Possession info not found" });
    }

    res.status(200).json({ message: "Possession info updated successfully", updatedPossession });
  } catch (error) {
    console.error("❌ Error updating Possession Info:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Delete Possession Info by ID
possessionRouter.delete("/:possessionId", async (req, res) => {
  try {
    const { possessionId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(possessionId)) {
      return res.status(400).json({ error: "Invalid Possession Info ID format" });
    }

    const deletedPossession = await PossessionInfo.findByIdAndDelete(possessionId);

    if (!deletedPossession) {
      return res.status(404).json({ error: "Possession info not found" });
    }

    res.status(200).json({ message: "Possession info deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting Possession Info:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default possessionRouter;
