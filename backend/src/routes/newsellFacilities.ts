import express from "express";
import mongoose from "mongoose";
import SellFacilities from "../models/sellFacilities";

const sellFacilitiesRouter = express.Router();

// 🔹 Create or Update Facilities for a User
sellFacilitiesRouter.post("/add", async (req, res) => {
  try {
    const { userId, minSeats, maxSeats, cabins, meetingRooms, privateWashrooms, publicWashrooms, hasConferenceRoom } = req.body;

    if (!userId || !minSeats || !maxSeats || !cabins || !meetingRooms || !privateWashrooms || !publicWashrooms) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existingFacilities = await SellFacilities.findOne({ userId });

    if (existingFacilities) {
      existingFacilities.minSeats = minSeats;
      existingFacilities.maxSeats = maxSeats;
      existingFacilities.cabins = cabins;
      existingFacilities.meetingRooms = meetingRooms;
      existingFacilities.privateWashrooms = privateWashrooms;
      existingFacilities.publicWashrooms = publicWashrooms;
      existingFacilities.hasConferenceRoom = hasConferenceRoom;

      await existingFacilities.save();
      return res.status(200).json({ message: "Facilities updated successfully", facilities: existingFacilities });
    }

    const newFacilities = new SellFacilities({
      userId,
      minSeats,
      maxSeats,
      cabins,
      meetingRooms,
      privateWashrooms,
      publicWashrooms,
      hasConferenceRoom,
    });

    await newFacilities.save();
    res.status(201).json({ message: "Facilities added successfully", facilities: newFacilities });
  } catch (error) {
    console.error("❌ Error adding facilities:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Get all facilities (Admin)
sellFacilitiesRouter.get("/", async (req, res) => {
  try {
    const facilities = await SellFacilities.find();
    res.status(200).json(facilities);
  } catch (error) {
    console.error("❌ Error fetching facilities:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Get facilities for a specific user
sellFacilitiesRouter.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid User ID format" });
    }

    const facilities = await SellFacilities.findOne({ userId });
    if (!facilities) {
      return res.status(404).json({ error: "No facilities found for this user" });
    }

    res.status(200).json(facilities);
  } catch (error) {
    console.error("❌ Error fetching facilities:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Delete facilities by User ID
sellFacilitiesRouter.delete("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid User ID format" });
    }

    const deletedFacilities = await SellFacilities.findOneAndDelete({ userId });

    if (!deletedFacilities) {
      return res.status(404).json({ error: "No facilities found for this user" });
    }

    res.status(200).json({ message: "Facilities deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting facilities:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default sellFacilitiesRouter;
