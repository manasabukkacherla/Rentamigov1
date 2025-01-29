// routes/serviceEnquiryRoutes.ts
import express from "express";
import { Request, Response } from "express";
import ServiceEnquiry from "../models/ServiceEnquiry";

const router = express.Router();

// POST route to create a new service enquiry
router.post("/service-enquiry", async (req: Request, res: Response) => {
  try {
    const { name, email, mobileNo, selectedServices } = req.body;

    // Validate required fields
    if (
      !name ||
      !email ||+
      !mobileNo ||
      !selectedServices ||
      selectedServices.length === 0
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create new service enquiry
    const serviceEnquiry = await ServiceEnquiry.create({
      name,
      email,
      mobileNo,
      selectedServices,
    });

    return res.status(201).json({
      message: "Service enquiry created successfully",
      serviceEnquiry,
    });
  } catch (error: any) {
    console.error("Error creating service enquiry:", error);
    return res.status(500).json({
      error: error.message || "Failed to create service enquiry",
    });
  }
});

// GET route to fetch all service enquiries
router.get("/service-enquiry", async (_req: Request, res: Response) => {
  try {
    const enquiries = await ServiceEnquiry.find({})
      .sort({ createdAt: -1 })
      .select("-__v");

    return res.status(200).json(enquiries);
  } catch (error: any) {
    console.error("Error fetching service enquiries:", error);
    return res.status(500).json({
      error: "Failed to fetch service enquiries",
    });
  }
});

export default router;
