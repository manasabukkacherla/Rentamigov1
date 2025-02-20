import express from "express";
import mongoose from "mongoose";
import Parking from "../models/Parking";

const parkingRouter = express.Router();

// 🔹 Create a new Parking Entry
parkingRouter.post("/add", async (req, res) => {
  try {
    const { userId, privateParking, publicParking } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const newParking = new Parking({
      userId,
      privateParking: privateParking || false,
      publicParking: publicParking || false,
    });

    await newParking.save();
    res.status(201).json({ message: "Parking details added successfully", parking: newParking });
  } catch (error) {
    console.error("❌ Error adding Parking Details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Get Parking Details by User ID
parkingRouter.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid User ID format" });
    }

    const parkingDetails = await Parking.find({ userId });
    res.status(200).json(parkingDetails);
  } catch (error) {
    console.error("❌ Error fetching Parking Details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Get Parking Details by ID
parkingRouter.get("/:parkingId", async (req, res) => {
  try {
    const { parkingId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(parkingId)) {
      return res.status(400).json({ error: "Invalid Parking ID format" });
    }

    const parking = await Parking.findById(parkingId);
    if (!parking) {
      return res.status(404).json({ error: "Parking details not found" });
    }

    res.status(200).json(parking);
  } catch (error) {
    console.error("❌ Error fetching Parking Details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Update Parking Details by ID
parkingRouter.put("/:parkingId", async (req, res) => {
  try {
    const { parkingId } = req.params;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(parkingId)) {
      return res.status(400).json({ error: "Invalid Parking ID format" });
    }

    const updatedParking = await Parking.findByIdAndUpdate(parkingId, updateData, { new: true });

    if (!updatedParking) {
      return res.status(404).json({ error: "Parking details not found" });
    }

    res.status(200).json({ message: "Parking details updated successfully", updatedParking });
  } catch (error) {
    console.error("❌ Error updating Parking Details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Delete Parking Details by ID
parkingRouter.delete("/:parkingId", async (req, res) => {
  try {
    const { parkingId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(parkingId)) {
      return res.status(400).json({ error: "Invalid Parking ID format" });
    }

    const deletedParking = await Parking.findByIdAndDelete(parkingId);

    if (!deletedParking) {
      return res.status(404).json({ error: "Parking details not found" });
    }

    res.status(200).json({ message: "Parking details deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting Parking Details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default parkingRouter;
