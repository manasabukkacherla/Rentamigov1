import express, { Request, Response } from "express";
import BasicDetails from "../models/Basicdetails"; // Ensure correct import
import PropertySelection from "../models/PropertySelection"; // Ensure correct import

const BasicDetailsRouter = express.Router();

/**
 * @route   POST /api/basic-details
 * @desc    Create BasicDetails (Auto-fetch propertyId if not provided)
 */
BasicDetailsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { propertyId, ...rest } = req.body;

    let finalPropertyId = propertyId;

    // If propertyId is not provided, fetch latest from PropertySelection
    if (!propertyId) {
      const lastPropertySelection = await PropertySelection.findOne()
        .sort({ createdAt: -1 })
        .select("propertyId");

      if (!lastPropertySelection) {
        return res.status(400).json({ success: false, message: "No property selection found" });
      }

      finalPropertyId = lastPropertySelection.propertyId;
    }

    const newBasicDetails = new BasicDetails({ ...rest, propertyId: finalPropertyId });
    await newBasicDetails.save();

    res.status(201).json({ success: true, message: "Basic details created", data: newBasicDetails });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

/**
 * @route   GET /api/basic-details
 * @desc    Get all BasicDetails
 */
BasicDetailsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const data = await BasicDetails.find();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

/**
 * @route   GET /api/basic-details/:id
 * @desc    Get BasicDetails by ID
 */
BasicDetailsRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const data = await BasicDetails.findById(req.params.id);
    if (!data) return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

/**
 * @route   PUT /api/basic-details/:id
 * @desc    Update BasicDetails
 */
BasicDetailsRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const data = await BasicDetails.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!data) return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, message: "Updated successfully", data });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

/**
 * @route   DELETE /api/basic-details/:id
 * @desc    Delete BasicDetails
 */
BasicDetailsRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const data = await BasicDetails.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

export default BasicDetailsRouter;
