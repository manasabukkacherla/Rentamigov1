import express, { Request, Response } from "express";
import PropertySelection from "../models/PropertySelection";

const PropertyRouter = express.Router();

// ✅ **1. API to Add a Property Selection & Generate Property ID**
PropertyRouter.post("/add", async (req: Request, res: Response) => {
  const { category, listingType, subCategory } = req.body;

  if (!category || !listingType || !subCategory) {
    return res.status(400).json({ success: false, error: "All fields are required" });
  }

  try {
    const newSelection = new PropertySelection({ category, listingType, subCategory });
    await newSelection.save();

    return res.status(201).json({
      success: true,
      message: "Property selection saved successfully",
      data: newSelection,
    });
  } catch (error: any) {
    console.error("Error saving property selection:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// ✅ **2. API to Get All Property Selections**
PropertyRouter.get("/all", async (req: Request, res: Response) => {
  try {
    const selections = await PropertySelection.find().sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: selections });
  } catch (error: any) {
    console.error("Error fetching selections:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// ✅ **3. API to Get a Specific Property Selection by ID**
PropertyRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const selection = await PropertySelection.findById(req.params.id);

    if (!selection) {
      return res.status(404).json({ success: false, message: "Selection not found" });
    }

    return res.status(200).json({ success: true, data: selection });
  } catch (error: any) {
    console.error("Error fetching selection:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// ✅ **4. API to Delete a Property Selection**
PropertyRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedSelection = await PropertySelection.findByIdAndDelete(req.params.id);

    if (!deletedSelection) {
      return res.status(404).json({ success: false, message: "Selection not found" });
    }

    return res.status(200).json({ success: true, message: "Selection deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting selection:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

export default PropertyRouter;
