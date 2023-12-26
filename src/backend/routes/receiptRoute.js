const express = require('express');
const router = express.Router();
const Purchase = require('../models/Purchase');
const Receipt = require('../models/Receipt');


// POST /api/paypal/order/capture/:orderId
router.post('/order/capture/:orderId', async (req, res) => {
    const orderId = req.params.orderId;
    const { transactionDetails } = req.body;
    try {
        // Find the corresponding purchase in your database
        const purchase = await Purchase.findOne({ orderId: orderId });
        if (!purchase) {
            return res.status(404).send('Purchase not found');
        }

        // Create and save the receipt
        const receiptData = {
            orderId: orderId,
            productId: purchase.productId,
            customerId: purchase.customerId,
            merchantId: purchase.merchantId,
            fullName: purchase.fullName,
            productName: purchase.productName,
            contactNumber: purchase.contactNumber,
            price: purchase.price,
            email: purchase.email,
            status: transactionDetails.status,
            paypalTransactionId: transactionDetails.id,
            paymentEmail: transactionDetails.payer.email_address
        };

        const newReceipt = new Receipt(receiptData);
        await newReceipt.save();

        // Respond with success and the receipt data
        res.json({ status: 'success', receipt: receiptData });
    } catch (error) {
        console.error('Error capturing PayPal order:', error);
        res.status(500).json({ error: error.message });
    }
});

//GET route to fetch all receipts for a spesific customer
router.get('/customerReceipt', async (req, res) => {
    try {
        const customerId = req.query.customerId;
        if (!customerId) {
            return res.status(400).json({ message: "Customer ID is required" });
        }

        const receipts = await Receipt.find({ customerId: customerId });
        res.json(receipts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.get('/paypalTransactionId', async (req, res) => {
    const paypalTransactionId = req.query.paypalTransactionId;
    try {
        const receipt = await Receipt.findOne({ paypalTransactionId: paypalTransactionId });
        if (!receipt) {
            return res.status(404).json({ message: 'Receipt not found' });
        }
        res.json(receipt);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;
