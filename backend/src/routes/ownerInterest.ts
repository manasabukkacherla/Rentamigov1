import express, { Request, Response } from "express";
import OwnerInterestForm from "../models/ownerInterestForm";
import sendOtpService from "../services/sendOtpService";

const router = express.Router();

// Send OTP to a phone number
router.post("/send-otp", async (req: Request, res: Response) => {
  const { mobileNo } = req.body;

  if (!mobileNo) {
    return res.status(400).json({ success: false, message: "Mobile number is required" });
  }

  try {
    const otpResponse = await sendOtpService.sendOtp(mobileNo, "sms");
    res.status(200).json({
      success: true,
      message: "OTP sent successfully.",
      sid: otpResponse.sid,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to send OTP.",
    });
  }
});

// Verify OTP
router.post("/verify-otp", async (req: Request, res: Response) => {
  const { mobileNo, otp } = req.body;

  if (!mobileNo || !otp) {
    return res.status(400).json({ success: false, message: "Mobile number and OTP are required" });
  }

  try {
    const verificationResponse = await sendOtpService.verifyOtp(mobileNo, otp);
    res.status(200).json({
      success: true,
      message: verificationResponse.message,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to verify OTP.",
    });
  }
});

export default router;

