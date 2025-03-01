import express, { Request, Response } from "express";
import PropertyDetails from "../models/Propertydetails"; // Ensure correct path
import { CallbackError } from "mongoose";

const PropertyDetailsrouter = express.Router();

/**
 * @route   POST /api/properties
 * @desc    Add a new property
 * @access  Public
 */
PropertyDetailsrouter.post("/", async (req: Request, res: Response) => {
    const { propertyId, ...updateData } = req.body;
  
    if (!propertyId) {
      return res.status(400).json({ message: "Property ID is required" });
    }
  
    try {
      let property = await PropertyDetails.findOne({ propertyId });
  
      if (property) {
        // Update existing property
        property = await PropertyDetails.findOneAndUpdate(
          { propertyId },
          { $set: updateData },
          { new: true, upsert: true, runValidators: true }
        );
        return res.status(200).json({ message: "Property details updated successfully", property });
      } else {
        // Create new property
        const newProperty = new PropertyDetails({ propertyId, ...updateData });
        await newProperty.save();
        return res.status(201).json({ message: "Property details added successfully", property: newProperty });
      }
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
PropertyDetailsrouter.get("/", async (req: Request, res: Response) => {
  try {
    const properties = await PropertyDetails.find();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Error fetching properties", error });
  }
});

/**
 * @route   GET /api/properties/:id
 * @desc    Get a single property by ID
 * @access  Public
 */
PropertyDetailsrouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const property = await PropertyDetails.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: "Error fetching property", error });
  }
});

/**
 * @route   PUT /api/properties/:id
 * @desc    Update a property by ID
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

    res.status(200).json({ message: "Property updated successfully", property: updatedProperty });
  } catch (error) {
    res.status(500).json({ message: "Error updating property", error });
  }
});

/**
 * @route   DELETE /api/properties/:id
 * @desc    Delete a property by ID
 * @access  Public
 */
PropertyDetailsrouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedProperty = await PropertyDetails.findByIdAndDelete(req.params.id);

    if (!deletedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting property", error });
  }
});

export default PropertyDetailsrouter;
