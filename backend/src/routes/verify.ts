import express, { Router, Request, Response } from "express";
import twilio from "twilio";
import OwnerInterestForm from "../models/owner-intrst";

const router = Router();
const client = twilio(process.env.ACCOUNT_SID!, process.env.AUTH_TOKEN!);

// Route to start OTP verification
router.post("/start", async (req: Request, res: Response) => {
  const { to, channel = "sms" } = req.body;

  try {
    if (!to) {
      throw new Error("Phone number is required");
    }

    const verification = await client.verify
      .services(process.env.VERIFY_SERVICE_SID!)
      .verifications.create({ to, channel });

    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error: any) {
    console.error("Error sending OTP:", error.message || error);
    res.status(400).json({ success: false, error: error.message || "Failed to send OTP" });
  }
});

// Route to verify OTP
router.post("/check", async (req: Request, res: Response) => {
  const { to, code, name, email, propertyName, locality, city } = req.body;

  try {
    if (!to || !code) {
      throw new Error("Phone number and OTP are required");
    }

    const verificationCheck = await client.verify
      .services(process.env.VERIFY_SERVICE_SID!)
      .verificationChecks.create({ to, code });

    if (verificationCheck.status === "approved") {
      // Save verified data to the database
      const newEntry = new OwnerInterestForm({
        name,
        email,
        mobileNo: to,
        propertyName,
        locality,
        city,
      });

      await newEntry.save();

      res.status(200).json({
        success: true,
        message: "Phone number verified and data saved successfully",
      });
    } else {
      throw new Error("Invalid OTP");
    }
  } catch (error: any) {
    console.error("Error verifying OTP:", error.message || error);
    res.status(400).json({ success: false, error: error.message || "Verification failed" });
  }
});

export default router;
