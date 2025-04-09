import express, { Request, Response } from "express";
import nodemailer from "nodemailer";

const emailRouter = express.Router();

// Create reusable transporter object using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // or your SMTP host
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD, // Use app-specific password for Gmail
  },
});

const transporter1 = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BUG_EMAIL,
    pass: process.env.PASS,
  },
});

emailRouter.post("/send-email", async (req: Request, res: Response) => {
  const { content, toEmailAddress } = req.body;

  if (!content || !toEmailAddress) {
    return res.status(400).json({
      success: false,
      error: "Content and toEmailAddress are required.",
    });
  }

  const mailOptions = {
    from: {
      name: "Your contact form",
      address: process.env.EMAIL_USER as string,
    },
    to: toEmailAddress,
    subject: `[contactform] ${req.body.subject || ""}`.trim(),
    text: `New email from ${process.env.EMAIL_USER}.\n\n${content}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to send email",
    });
  }
});

export default emailRouter;
