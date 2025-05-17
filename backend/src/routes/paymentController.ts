import { Request, Response } from 'express';
import Payment from '../models/paymentModel'; // Import the Payment model

// Function to save payment details after successful payment
export const savePaymentDetails = async (req: Request, res: Response) => {
  const { userId, userName, amount, transactionId, planName, planId, expirationDate } = req.body;

  try {
    // Create a new payment document
    const newPayment = new Payment({
      userId,
      userName,
      amount,
      transactionId,
      planName,
      planId,
      expirationDate,
    });

    // Save the payment details to the database
    await newPayment.save();

    // Send a response back to the client
    res.status(200).json({ message: 'Payment details saved successfully' });
  } catch (error) {
    console.error('Error saving payment details:', error);
    res.status(500).json({ message: 'Error saving payment details', error });
  }
};