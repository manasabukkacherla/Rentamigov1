import express, { Request, Response } from "express";
import Enquiry from "../models/Enquiry"; // Your Enquiry model
import transporter from "../utils/emailservice"; // Your email config

const router = express.Router();

/**
 * POST /enquiry - Submit Enquiry (no login required)
 */
router.post("/enquiry", async (req: Request, res: Response) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  try {
    const newEnquiry = new Enquiry({ name, email, phone, message });
    const saved = await newEnquiry.save();

    // Email to User
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Enquiry Received - RentAmigo",
      html: `<h2>Hi ${name},</h2><p>We received your enquiry and will get back to you shortly.</p>`
    });

    // Email to RentAmigo
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "tech@rentamigo.in",
      subject: "New Enquiry Received",
      html: `
        <h3>New Enquiry Submitted</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    res.status(201).json({ success: true, message: "Enquiry submitted successfully.", data: saved });
  } catch (error) {
    console.error("Error submitting enquiry:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

/**
 * GET /enquiries - Fetch all enquiries
 */
router.get("/enquiries", async (_req: Request, res: Response) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: enquiries });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ success: false, message: "Could not fetch enquiries." });
  }
});

/**
 * GET /enquiry/:id - Get single enquiry
 */
router.get("/enquiry/:id", async (req: Request, res: Response) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) return res.status(404).json({ success: false, message: "Enquiry not found." });
    res.status(200).json({ success: true, data: enquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error retrieving enquiry." });
  }
});

/**
 * PUT /enquiry/:id - Update enquiry
 */
router.put("/enquiry/:id", async (req: Request, res: Response) => {
  try {
    const updated = await Enquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: "Enquiry not found." });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: "Update failed." });
  }
});

/**
 * DELETE /enquiry/:id - Delete enquiry
 */
router.delete("/enquiry/:id", async (req: Request, res: Response) => {
  try {
    const deleted = await Enquiry.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Enquiry not found." });
    res.status(200).json({ success: true, message: "Enquiry deleted." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Deletion failed." });
  }
});

export default router;