import express, { Response } from "express";
import Bug from "../models/bugsModel";
import { ParamsDictionary } from "express-serve-static-core";
import User from "../models/signup";
const nodemailer = require("nodemailer");
import transporter from "../utils/emailservice";
import transporter1 from "../utils/emailservice";

interface CustomRequest<T = ParamsDictionary, U = any, V = any>
  extends express.Request<T, U, V> {
  user?: {
    _id: string;
  };
}

const bugRouter = express.Router();

bugRouter.post(
  "/create",
  async (
    req: CustomRequest<
      ParamsDictionary,
      {},
      {
        title: string;
        description: string;
        // email: string;
        errorcode?: string;
        category?: string;
        imageUrl: string;
        status: string;
        author: string;
      }
    >,
    res: Response
  ): Promise<void> => {
    try {
      const { title, description, imageUrl, author, status } = req.body;

      if (!title || !description || !status || !imageUrl) {
        res.status(400).json({ error: "All required fields must be filled." });
        return;
      }

      const newBug = new Bug({
        title,
        description,
        // email,
        // errorcode,
        // category,
        imageUrl,
        status,
        author,
        createdAt: Date.now(),
      });

      await newBug.save();
      const user = await User.findById(author);
      const authorEmail = user.email;

      // First email: From process.env.EMAIL_USER to bug
      const techMailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.BUG_EMAIL,
        subject: "New Bug Request",
        text: ` Dear Technical Team,
                A new bug has been reported with the following details:
                Title: ${title}
                Description: ${description}
                Status: ${status}
                Reported By: ${authorEmail}
                Please review the issue at your earliest convenience.
                Best regards,
                Bug Tracking System`,
      };

      await transporter.sendMail(techMailOptions);

      const authorMailOptions = {
        from: process.env.EMAIL_USER,
        to: authorEmail,
        subject: "Bug Report Received",
        text: `  Dear User,
                Thank you for submitting your bug report. We have received the following details:
                 Title: ${title}
                 Description: ${description}
                 Current Status: ${status}
                Our technical team will review the issue and take appropriate action as soon as possible. We appreciate your contribution to improving our system.

                Best regards,  
                Support Team`,
      };

      await transporter.sendMail(authorMailOptions);
      res.status(201).json({ success: true, newBug });
    } catch (error) {
      console.error("Error creating bug:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

bugRouter.get(
  "/list",
  async (req: CustomRequest, res: Response): Promise<void> => {
    try {
      const bugs = await Bug.find({}).populate("author");

      res.json({
        success: true,
        message: "Data fetched successfully",
        data: bugs,
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: "Error",
      });
    }
  }
);

bugRouter.get(
  "/:id",
  async (req: CustomRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const bug = await Bug.findById(id).populate("author");

      if (!bug) {
        res.status(404).json({ message: "Bug not found" });
        return;
      }

      res.status(200).json({ success: true, bug });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

bugRouter.put(
  "/:id/edit",
  async (req: CustomRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const bug = await Bug.findById(id).populate("author");

      if (!bug) {
        res.status(404).json({ message: "Bug not found" });
        return;
      }
      const author = bug.author;

      bug.status = status;
      await bug.save();
      const user = await User.findById(author);
      const email = user.email;

      const mailOptions = {
        from: process.env.BUG_EMAIL,
        to: email,
        subject: "New Bug Created",
        text: ` Dear User,
                Your bug report has been successfully processed.  
                The current status is: ${status}
                Best regards,  
                Support Team`,
      };

      await transporter1.sendMail(mailOptions);

      res.status(200).json({ success: true, bug });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

bugRouter.put(
  "/:id/accept",
  async (req: CustomRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { isaccepted } = req.body;
      const bug = await Bug.findById(id).populate("author");

      if (!bug) {
        res.status(404).json({ message: "Bug not found" });
        return;
      }
      const author = bug.author;

      bug.isaccepted = isaccepted;
      await bug.save();
      const user = await User.findById(author);
      const authorEmail = user.email;

      const authorMailOptions = {
        from: process.env.BUG_EMAIL,
        to: authorEmail,
        subject: "Bug Report accept",
        text: `Dear User,
              We would like to inform you that your bug report has been reviewed and accepted for further processing.
              Thank you for helping us improve our system.
              Best regards,  
              Support Team`,
      };
      await transporter1.sendMail(authorMailOptions);

      res.status(200).json({ success: true, bug });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

export default bugRouter;
