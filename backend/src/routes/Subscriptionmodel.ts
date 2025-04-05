import { Router } from "express";
import SubscriptionPlan, {
  ISubscriptionPlan,
} from "../models/Subscriptionmodel";
import Notification from "../models/Notification";
import { io } from "../index"; // adjust the path as needed
const Subscriptionrouter = Router();

// ✅ **Create a new subscription plan**
Subscriptionrouter.post("/", async (req, res) => {
  try {
    const planData: ISubscriptionPlan = req.body;
    const newPlan = new SubscriptionPlan(planData);
    await newPlan.save();
    6;

    // Create a notification message.
    const message = `New Subscription Created: ${newPlan}`;
    const newNotification = new Notification({
      resourceId: newPlan._id, // Link notification to the user or post
      message,
      read: false,
      createdAt: new Date(),
    });

    // Save the notification to MongoDB.
    const savedNotification = await newNotification.save();

    console.log("Emitting newNotification", savedNotification);
    // Emit a "newNotification" event to all connected clients.
    io.emit("newNotification", savedNotification);
    res.status(201).json({
      message: "Subscription Plan created successfully",
      plan: newPlan,
    });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// ✅ **Get all subscription plans**
Subscriptionrouter.get("/", async (req, res) => {
  try {
    const plans = await SubscriptionPlan.find();
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// ✅ **Get a single subscription plan by ID**
Subscriptionrouter.get("/:id", async (req, res) => {
  try {
    const plan = await SubscriptionPlan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: "Subscription Plan not found" });
    }
    res.status(200).json(plan);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// ✅ **Update a subscription plan**
Subscriptionrouter.put("/:id", async (req, res) => {
  try {
    const updatedPlan = await SubscriptionPlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedPlan) {
      return res.status(404).json({ message: "Subscription Plan not found" });
    }
    res.status(200).json({
      message: "Subscription Plan updated successfully",
      plan: updatedPlan,
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// ✅ **Delete a subscription plan**
Subscriptionrouter.delete("/:id", async (req, res) => {
  try {
    const deletedPlan = await SubscriptionPlan.findByIdAndDelete(req.params.id);
    if (!deletedPlan) {
      return res.status(404).json({ message: "Subscription Plan not found" });
    }
    res.status(200).json({ message: "Subscription Plan deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default Subscriptionrouter;
