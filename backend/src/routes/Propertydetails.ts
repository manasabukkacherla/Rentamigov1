// routes/Propertydetails.ts

import express, { Request, Response } from "express";
import PropertyDetails from "../models/Propertydetails"; // adjust path as needed

const PropertyDetailsrouter = express.Router();

/**
 * @route   POST /api/properties
 * @desc    Add or update a property (upsert)
 * @access  Public
 */
PropertyDetailsrouter.post("/", async (req: Request, res: Response) => {
  const { propertyId, ...updateData } = req.body;
  if (!propertyId) {
    return res.status(400).json({ message: "Property ID is required" });
  }

  try {
    // Try to find existing
    let property = await PropertyDetails.findOne({ propertyId });

    if (property) {
      // Update existing
      property = await PropertyDetails.findOneAndUpdate(
        { propertyId },
        { $set: updateData },
        { new: true, upsert: true, runValidators: true }
      );
      return res
        .status(200)
        .json({ message: "Property updated successfully", property });
    }

    // Create new
    const newProperty = new PropertyDetails({ propertyId, ...updateData });
    await newProperty.save();
    return res
      .status(201)
      .json({ message: "Property added successfully", property: newProperty });
  } catch (error) {
    console.error("Error saving property details:", error);
    return res.status(500).json({ message: "Server error", error });
  }
});

/**
 * @route   GET /api/properties
 * @desc    Get all properties
 * @access  Public
 */
PropertyDetailsrouter.get("/", async (_req: Request, res: Response) => {
  try {
    const properties = await PropertyDetails.find();
    return res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    return res.status(500).json({ message: "Error fetching properties", error });
  }
});

/**
 * @route   GET /api/properties/property/user
 * @desc    Get properties by userId query param
 * @access  Public
 */
PropertyDetailsrouter.get(
  "/property/user",
  async (req: Request, res: Response) => {
    const userId = String(req.query.userId || "").trim();
    if (!userId) {
      return res
        .status(400)
        .json({ message: "Missing required query parameter: userId" });
    }

    try {
      const userProps = await PropertyDetails.find({
        "metadata.createdBy": userId,
      });
      return res.status(200).json(userProps);
    } catch (error) {
      console.error("Error fetching user properties:", error);
      return res
        .status(500)
        .json({ message: "Error fetching user properties", error });
    }
  }
);

/**
 * @route   GET /api/properties/:id
 * @desc    Get a single property by Mongo _id
 * @access  Public
 */
PropertyDetailsrouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const property = await PropertyDetails.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    return res.status(200).json(property);
  } catch (error) {
    console.error("Error fetching property:", error);
    return res.status(500).json({ message: "Error fetching property", error });
  }
});

/**
 * @route   PUT /api/properties/:id
 * @desc    Update a property by Mongo _id
 * @access  Public
 */
PropertyDetailsrouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const updatedProperty = await PropertyDetails.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }
    return res
      .status(200)
      .json({ message: "Property updated successfully", property: updatedProperty });
  } catch (error) {
    console.error("Error updating property:", error);
    return res.status(500).json({ message: "Error updating property", error });
  }
});

/**
 * @route   DELETE /api/properties/:id
 * @desc    Delete a property by Mongo _id
 * @access  Public
 */
PropertyDetailsrouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deleted = await PropertyDetails.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Property not found" });
    }
    return res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("Error deleting property:", error);
    return res.status(500).json({ message: "Error deleting property", error });
  }
});

export default PropertyDetailsrouter;
