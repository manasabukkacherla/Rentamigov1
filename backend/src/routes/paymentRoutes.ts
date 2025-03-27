import express from 'express';
import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import Payment from '../models/paymentModel';
dotenv.config();  // Load environment variables from .env file

const router = express.Router();

// Initialize Razorpay with credentials from environment variables
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Correct key_id from .env
  key_secret: process.env.RAZORPAY_KEY_SECRET, // Correct key_secret from .env
});
router.post("/save-payment", async (req, res) => {
  const { userId, userName, amount, transactionId, planName, planId, expirationDate, plantype} = req.body;

  try {
    // Validate the incoming data
    if (!userId || !userName || !amount || !transactionId || !planName || !planId || !expirationDate || !plantype) {
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
      plantype,
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
// Route to get total revenue
router.get('/total-revenue', async (req, res) => {
  try {
    const result = await Payment.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" }
        }
      }
    ]);

    const totalRevenue = result[0]?.totalAmount || 0;

    res.status(200).json({ totalRevenue });
  } catch (error) {
    console.error("Error fetching total revenue:", error);
    res.status(500).json({ message: "Error fetching total revenue" });
  }
});
// GET /api/payment/revenue-by-date
router.get('/revenue-by-date', async (req, res) => {
  try {
    const result = await Payment.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$dateOfPayment" },
            month: { $month: "$dateOfPayment" }
          },
          totalRevenue: { $sum: "$amount" }
        }
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1
        }
      }
    ]);

    const formatted = result.map(item => ({
      date: `${item._id.year}-${String(item._id.month).padStart(2, '0')}`,
      revenue: item.totalRevenue
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.error("Error getting revenue by date:", error);
    res.status(500).json({ message: "Failed to fetch revenue data" });
  }
});
// Route: GET /api/payment/revenue-change
router.get('/revenue-change', async (req, res) => {
  try {
    const now = new Date();
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const thisMonthRevenue = await Payment.aggregate([
      { $match: { createdAt: { $gte: startOfThisMonth } } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const lastMonthRevenue = await Payment.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfLastMonth,
            $lt: startOfThisMonth
          }
        }
      },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const current = thisMonthRevenue[0]?.total || 0;
    const previous = lastMonthRevenue[0]?.total || 0;

    const change = previous === 0 ? 100 : ((current - previous) / previous) * 100;

    res.status(200).json({
      success: true,
      current,
      previous,
      change: Number(change.toFixed(2))
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Revenue comparison failed" });
  }
});

export default router;
