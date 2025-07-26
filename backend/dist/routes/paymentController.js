"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.savePaymentDetails = void 0;
const paymentModel_1 = __importDefault(require("../models/paymentModel")); // Import the Payment model
// Function to save payment details after successful payment
const savePaymentDetails = async (req, res) => {
    const { userId, userName, amount, transactionId, planName, planId, expirationDate } = req.body;
    try {
        // Create a new payment document
        const newPayment = new paymentModel_1.default({
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
    }
    catch (error) {
        console.error('Error saving payment details:', error);
        res.status(500).json({ message: 'Error saving payment details', error });
    }
};
exports.savePaymentDetails = savePaymentDetails;
