import express from 'express';
import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import Payment from '../models/paymentModel';
import SubscriptionPlan from '../models/Subscriptionmodel';
dotenv.config();  // Load environment variables from .env file

const router = express.Router();

// Initialize Razorpay with credentials from environment variables
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Correct key_id from .env
  key_secret: process.env.RAZORPAY_KEY_SECRET, // Correct key_secret from .env
});
router.post("/save-payment", async (req, res) => {
  const { userId, userName, amount, transactionId, planName, planId, expirationDate } = req.body;

  try {
    // Validate the incoming data
    if (!userId || !userName || !amount || !transactionId || !planName || !planId || !expirationDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create a new Payment object and save it
    const newPayment = new Payment({
      userId,
      userName,
      amount,
      transactionId,
      planName,
      planId,
      expirationDate,
    });

    await newPayment.save();

    // Return success response
    res.status(201).json({ message: "Payment details saved successfully", payment: newPayment });
  } catch (error) {
    console.error("Error saving payment details:", error);
    res.status(500).json({ message: "Error saving payment details" });
  }
});

// Route to create an order
router.post('/create-order', async (req, res) => {
  const { amount } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Amount in paise (convert INR to paise)
      currency: 'INR',
      receipt: `order_rcptid_${new Date().getTime()}`,
    });

    // Send the order details to the frontend
    res.json({
      key_id: process.env.RAZORPAY_KEY_ID, // Correct key ID from .env
      id: order.id, // Razorpay order ID
      amount: order.amount, // Amount in paise
      currency: order.currency, // Currency used
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).send('Error creating Razorpay order');
  }
});
// Fetch Subscription Plan Details by ID
router.get("/get-plan/:id", async (req, res) => {
  try {
    const planId = req.params.id;  // Get plan ID from URL
    const plan = await SubscriptionPlan.findById(planId);  // Fetch the plan from database
    if (!plan) {
      return res.status(404).json({ message: "Subscription Plan not found" });
    }

    res.status(200).json(plan);  // Send the plan details
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

export default router;
