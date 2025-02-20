import express from "express";
import mongoose from "mongoose";
import RetailProperty from "../models/retailProperty";

const retailPropertyRouter = express.Router();

// 🔹 Create or Update Retail Property (Ensures one property per user)
retailPropertyRouter.post("/add", async (req, res) => {
  try {
    const { userId, suitableFor, locationHub, otherLocationHub, builtUpArea, carpetArea, entranceWidth, ceilingHeight, locatedNear, ownership, expectedRent, securityDeposit } = req.body;

    if (!userId || !suitableFor.length || !locationHub || !builtUpArea || !carpetArea || !ownership || !expectedRent) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existingProperty = await RetailProperty.findOne({ userId });

    if (existingProperty) {
      existingProperty.suitableFor = suitableFor;
      existingProperty.locationHub = locationHub;
      existingProperty.otherLocationHub = otherLocationHub || existingProperty.otherLocationHub;
      existingProperty.builtUpArea = builtUpArea;
      existingProperty.carpetArea = carpetArea;
      existingProperty.entranceWidth = entranceWidth;
      existingProperty.ceilingHeight = ceilingHeight;
      existingProperty.locatedNear = locatedNear;
      existingProperty.ownership = ownership;
      existingProperty.expectedRent = expectedRent;
      existingProperty.securityDeposit = securityDeposit || existingProperty.securityDeposit;
      
      await existingProperty.save();
      return res.status(200).json({ message: "Retail property updated successfully", property: existingProperty });
    }

    const newProperty = new RetailProperty({
      userId,
      suitableFor,
      locationHub,
      otherLocationHub,
      builtUpArea,
      carpetArea,
      entranceWidth,
      ceilingHeight,
      locatedNear,
      ownership,
      expectedRent,
      securityDeposit,
    });

    await newProperty.save();
    res.status(201).json({ message: "Retail property added successfully", property: newProperty });
  } catch (error) {
    console.error("❌ Error adding retail property:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Get all retail properties (Admin)
retailPropertyRouter.get("/", async (req, res) => {
  try {
    const properties = await RetailProperty.find();
    res.status(200).json(properties);
  } catch (error) {
    console.error("❌ Error fetching retail properties:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Get a specific retail property by User ID
retailPropertyRouter.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid User ID format" });
    }

    const property = await RetailProperty.findOne({ userId });
    if (!property) {
      return res.status(404).json({ error: "Retail property not found for this user" });
    }

    res.status(200).json(property);
  } catch (error) {
    console.error("❌ Error fetching retail property:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🔹 Delete a retail property by User ID
retailPropertyRouter.delete("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid User ID format" });
    }

    const deletedProperty = await RetailProperty.findOneAndDelete({ userId });

    if (!deletedProperty) {
      return res.status(404).json({ error: "Retail property not found for this user" });
    }

    res.status(200).json({ message: "Retail property deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting retail property:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default retailPropertyRouter;
