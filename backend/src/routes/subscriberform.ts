import express, { Request, Response } from "express";
import Subscription from "../models/subscribe";
import transporter from "../utils/emailservice"; // Import the transporter

const subscriptionRouter = express.Router();

subscriptionRouter.post("/subscribe", async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).send({ error: "Name and Email are required" });
    }

    // Save to database
    const subscription = new Subscription({ name, email });
    await subscription.save();

    // Send confirmation email to the user
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Your Gmail address
      to: email, // Subscriber's email
      subject: "Subscription Confirmation",
      text: `Dear ${name},\n\nThank you for subscribing to our service.\n\nBest regards,\nYour Company`,
    });

    // Send notification email to the company
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Your Gmail address
      to: process.env.EMAIL_USER, // Your company email
      subject: "New Subscription",
      text: `New subscriber details:\n\nName: ${name}\nEmail: ${email}`,
    });

    res.status(201).send({ message: "Subscription added and emails sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while subscribing." });
  }
});




// PUT: Update a subscription by email
subscriptionRouter.put("/subscribep", async (req: Request, res: Response) => {
  try {
    const { email, name } = req.body;

    if (!email || !name) {
      return res.status(400).json({ error: "Email and name are required" });
    }

    const updatedSubscription = await Subscription.findOneAndUpdate(
      { email },
      { name },
      { new: true }
    );

    if (!updatedSubscription) {
      return res.status(404).json({ error: "Subscription not found" });
    }

    res.status(200).json(updatedSubscription);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
});

// GET: Fetch all subscriptions
subscriptionRouter.get("/subscriptions", async (req: Request, res: Response) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json(subscriptions);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
});

// GET: Fetch a specific subscription by email
subscriptionRouter.get("/subscriptions/:email", async (req: Request, res: Response) => {
  try {
    const { email } = req.params;

    const subscription = await Subscription.findOne({ email });
    if (!subscription) {
      return res.status(404).json({ error: "Subscription not found" });
    }

    res.status(200).json(subscription);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
});

export default subscriptionRouter;
