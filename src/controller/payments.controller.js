import { createToken } from "../middleware/token.js";
import payments from "../model/payments.model.js";
import bcrypt from 'bcrypt';

// Insert Payment (with Card Details)
export async function Insertpayments(req, res) {
    const { amount, paymentDate, lastFourDigits, cardHolderName, cardType, expirationDate } = req.body;
    const { id } = req.params; // formId from the route params

    // Extract userId from the token (req.user contains decoded user data)
    const { id: userId } = req.user; // Assuming `id` is the userId in token

    try {
        // Check if payment already exists for this userId and formId
        const check = await payments.findOne({ userId, formId: id });
        if (check) {
            return res.status(409).send("Payment already exists for this user and form.");
        }

        // Create a new payment entry with card details
        const paymentOption = new payments({
            userId,
            formId: id,
            amount,
            paymentDate,
            paymentStatus:"Completed",
            cardType,
            cardHolderName,
            lastFourDigits,
            expirationDate
        });

        // Save the payment to the database
        await paymentOption.save();
        res.status(201).send(paymentOption); // Payment created successfully
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

// Fetch All Payments
export async function paymentsfetch(req, res) {
    try {
        // Fetch all payment records from the database
        const fetchspecificData = await payments.find();
        
        // If no payments are found, return a 404 (Not Found)
        if (!fetchspecificData || fetchspecificData.length === 0) {
            return res.status(404).send("No payments found.");
        }

        res.status(200).send(fetchspecificData); // Successfully fetched all payments
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

// Delete Payment
export async function handleDeletePayment(req, res) {
    const { id } = req.params; // Get the payment ID from the request parameters

    try {
        // Attempt to find and delete the payment by ID
        const payment = await payments.findByIdAndDelete(id);
        
        // If no payment is found, return a 404 (Not Found)
        if (!payment) {
            return res.status(404).send("Payment not found.");
        }

        res.status(200).json("Payment deleted successfully.");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
}
