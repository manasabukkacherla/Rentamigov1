import { Router, Request, Response } from "express";
import SocietyAmenitiesModel from "../models/newsocietyamenities";

const router = Router();

// 🔹 Create Society Amenities (POST)
router.post("/", async (req: Request, res: Response) => {
  try {
    console.log("Received Data:", req.body); // Debugging incoming request data

    const { propertyId, amenities } = req.body;

    // Validate required fields
    if (!propertyId || !amenities) {
      return res.status(400).json({ message: "Property ID and amenities are required" });
    }

    // Create a new SocietyAmenities document
    const newAmenities = new SocietyAmenitiesModel({
      propertyId,
      amenities
    });

    // Save to database
    await newAmenities.save();
    res.status(201).json(newAmenities);
  } catch (error) {
    res.status(500).json({ message: "Error saving amenities", error });
  }
});

// 🔹 Get Society Amenities by Property ID (GET)
router.get("/:propertyId", async (req: Request, res: Response) => {
  try {
    const { propertyId } = req.params;
    const amenities = await SocietyAmenitiesModel.findOne({ propertyId });

    if (!amenities) {
      return res.status(404).json({ message: "Amenities not found for this property" });
    }

    res.status(200).json(amenities);
  } catch (error) {
    res.status(500).json({ message: "Error fetching amenities", error });
  }
});

// 🔹 Update Society Amenities (PUT)
router.put("/:propertyId", async (req: Request, res: Response) => {
  try {
    const { propertyId } = req.params;
    const { amenities } = req.body;

    const updatedAmenities = await SocietyAmenitiesModel.findOneAndUpdate(
      { propertyId },
      { amenities },
      { new: true, upsert: true } // Creates new entry if not found
    );

    res.status(200).json(updatedAmenities);
  } catch (error) {
    res.status(500).json({ message: "Error updating amenities", error });
  }
});

// 🔹 Delete Society Amenities (DELETE)
router.delete("/:propertyId", async (req: Request, res: Response) => {
  try {
    const { propertyId } = req.params;

    const deletedAmenities = await SocietyAmenitiesModel.findOneAndDelete({ propertyId });

    if (!deletedAmenities) {
      return res.status(404).json({ message: "Amenities not found for this property" });
    }

    res.status(200).json({ message: "Amenities deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting amenities", error });
  }
});

export default router;
