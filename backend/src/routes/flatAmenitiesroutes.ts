import { Router, Request, Response } from "express";
import FlatAmenitiesModel from "../models/FlatAmenities";
import BasicDetails from "../models/Basicdetails"; // Ensure correct import
const router = Router();

// 🔹 Create or Update Flat Amenities (POST)
router.post("/", async (req: Request, res: Response) => {
    try {
      console.log("📩 Received Basic Details in Backend:", req.body);
  
      const { propertyId, ...otherDetails } = req.body;
  
      if (!propertyId) {
        return res.status(400).json({ message: "Property ID is required" });
      }
  
      // 🔹 Save or update basic details
      const savedBasicDetails = await BasicDetails.findOneAndUpdate(
        { propertyId },
        { ...otherDetails },
        { new: true, upsert: true }
      );
  
      if (!savedBasicDetails) {
        return res.status(500).json({ message: "Failed to save Basic Details" });
      }
  
      res.status(201).json({ propertyId: savedBasicDetails.propertyId });
    } catch (error) {
      console.error("🚨 Error saving Basic Details:", error);
      res.status(500).json({ message: "Error saving Basic Details", error });
    }
  });
  

// 🔹 Get Flat Amenities by Property ID (GET)
router.get("/:propertyId", async (req: Request, res: Response) => {
  try {
    const { propertyId } = req.params;
    const amenities = await FlatAmenitiesModel.findOne({ propertyId });

    if (!amenities) {
      return res.status(404).json({ message: "Amenities not found for this property" });
    }

    res.status(200).json(amenities);
  } catch (error) {
    res.status(500).json({ message: "Error fetching amenities", error });
  }
});

export default router;
