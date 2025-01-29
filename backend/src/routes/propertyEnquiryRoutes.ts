import express, { Request, Response } from "express";
import PropertyEnquiry from "../models/propertenquiry";
import sendOtpService from "../services/sendOtpService"; // Twilio-based OTP service
import transporter from "../utils/emailservice"; // Email transporter
import Property from "../models/Propertydetails";

const router = express.Router();

// POST: Handle sending OTP
router.post("/send-otp", async (req: Request, res: Response) => {
  const { name, email, contactNumber } = req.body;

  try {
    // Validate required fields
    if (!name || !email || !contactNumber) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and contact number are required.",
      });
    }

    // Send OTP using Twilio Verify
    const formattedNumber = `+91${contactNumber.replace(/\D/g, "")}`;
    const otpResponse = await sendOtpService.sendOtp(formattedNumber, "sms");

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully.",
      sid: otpResponse.sid,
    });
  } catch (error: any) {
    console.error("Error in send-otp route:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send OTP. Please try again.",
    });
  }
});

// POST: Verify OTP and save property enquiry
router.post("/verify-otp", async (req: Request, res: Response) => {
  const { contactNumber, otp } = req.body;

  try {
    if (!contactNumber || !otp) {
      return res.status(400).json({
        success: false,
        message: "Contact number and OTP are required.",
      });
    }

    // Verify OTP using Twilio Verify
    const formattedNumber = `+91${contactNumber.replace(/\D/g, "")}`;
    const verificationResponse = await sendOtpService.verifyOtp(formattedNumber, otp);

    if (!verificationResponse.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully.",
    });
  } catch (error: any) {
    console.error("Error in verify-otp route:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to verify OTP. Please try again.",
    });
  }
});

// POST: Submit property enquiry
// POST: Submit property enquiry
// POST: Submit property enquiry


router.post("/submit-form", async (req: Request, res: Response) => {
  const { name, email, contactNumber, isVerified, propertyId, propertyName } = req.body;

  try {
    // ✅ Validate required fields
    if (!name || !email || !contactNumber || !isVerified || !propertyId || !propertyName) {
      return res.status(400).json({
        success: false,
        message: "Name, email, contact number, verification status, propertyId, and propertyName are required.",
      });
    }

    // ✅ Ensure the propertyId exists in the Property collection
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Invalid property ID. Property not found.",
      });
    }

    // ✅ Only block duplicate submissions for the same propertyId and email
    const existingEnquiry = await PropertyEnquiry.findOne({ email, propertyId });

    if (existingEnquiry) {
      return res.status(409).json({
        success: false,
        message: "You have already submitted an enquiry for this property. Please check your email for details.",
      });
    }

    // ✅ Save the new enquiry (allow same email for different properties)
    const newEnquiry = new PropertyEnquiry({
      name,
      email,
      contactNumber,
      isVerified,
      propertyId,
      propertyName,
    });

    const savedEnquiry = await newEnquiry.save();

    // ✅ Send confirmation email to the user
    const userEmailContent = `
      <h1>Thank You for Your Property Enquiry</h1>
      <p>Dear ${name},</p>
      <p>We have successfully received your enquiry for:</p>
      <ul>
        <li><strong>Property Name:</strong> ${propertyName}</li>
        <li><strong>Contact Number:</strong> ${contactNumber}</li>
      </ul>
      <p>We will get back to you shortly.</p>
      <p>Best regards,<br>RentAmigo Team</p>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Property Enquiry Confirmation",
      html: userEmailContent,
    });

    // ✅ Send enquiry notification to the company
    const companyEmailContent = `
      <h1>New Property Enquiry</h1>
      <p><strong>Property Name:</strong> ${propertyName}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Contact Number:</strong> ${contactNumber}</p>
      <p><strong>Verified:</strong> ${isVerified ? "Yes" : "No"}</p>
      <p><strong>Submission Date:</strong> ${savedEnquiry.createdAt}</p>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "contact@rentamigo.in",
      subject: "New Property Enquiry Received",
      html: companyEmailContent,
    });

    return res.status(201).json({
      success: true,
      message: "Property enquiry submitted successfully, and emails sent.",
      data: savedEnquiry,
    });
  } catch (error) {
    console.error("Error submitting property enquiry or sending emails:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to submit property enquiry or send emails.",
    });
  }
});
// GET: Retrieve all property enquiries
router.get("/enquiries", async (_req: Request, res: Response) => {
  try {
    const enquiries = await PropertyEnquiry.find();
    res.status(200).json({
      success: true,
      data: enquiries,
    });
  } catch (error) {
    console.error("Error fetching property enquiries:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch property enquiries.",
    });
  }
});

// GET: Retrieve a specific property enquiry by ID
router.get("/enquiryget/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const enquiry = await PropertyEnquiry.findById(id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Property enquiry not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    console.error("Error fetching property enquiry:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch property enquiry.",
    });
  }
});

// PUT: Update a specific property enquiry by ID
router.put("/enquiryput/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, contactNumber } = req.body;

  try {
    const updatedEnquiry = await PropertyEnquiry.findByIdAndUpdate(
      id,
      { name, email, contactNumber },
      { new: true } // Return updated document
    );

    if (!updatedEnquiry) {
      return res.status(404).json({
        success: false,
        message: "Property enquiry not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Property enquiry updated successfully.",
      data: updatedEnquiry,
    });
  } catch (error) {
    console.error("Error updating property enquiry:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update property enquiry.",
    });
  }
});

// DELETE: Delete a specific property enquiry by ID
router.delete("/enquirydel/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedEnquiry = await PropertyEnquiry.findByIdAndDelete(id);

    if (!deletedEnquiry) {
      return res.status(404).json({
        success: false,
        message: "Property enquiry not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Property enquiry deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting property enquiry:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete property enquiry.",
    });
  }
});

export default router;
