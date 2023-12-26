const express = require('express');
const router = express.Router();
const Receipt = require('../models/Receipt');
const Review = require('../models/Review');


router.post('/review/:paypalTransactionId', async (req, res) => {
    const paypalTransactionId = req.params.paypalTransactionId;
    const { reviewDetails } = req.body;
    try {
        // Find the corresponding receipt in your database
        const receipt = await Receipt.findOne({ paypalTransactionId: paypalTransactionId });
        if (!receipt) {
            return res.status(404).send('Receipt not found');
        }
        const newReview = {
            productId: receipt.productId,
            customerId: receipt.customerId,
            merchantId: receipt.merchantId,
            fullName: receipt.fullName,
            rating: reviewDetails.rating,
            reviewDescription: reviewDetails.reviewDescription,
            paypalTransactionId: receipt.paypalTransactionId
        };

        const newReviewData = new Review(newReview);
        await newReviewData.save();
        res.status(201).json({ message: "Saving review success", review: newReviewData });

    }

    catch (err) {
        console.error('Error saving review:', err);
        res.status(500).send(err);
    }

});

module.exports = router;
