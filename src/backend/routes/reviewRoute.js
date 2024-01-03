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
            paypalTransactionId: receipt.paypalTransactionId,
            reviewTitle: reviewDetails.reviewTitle
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

router.get('/review/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        const reviews = await Review.find({ productId: productId });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.get('/reviewOfMerchant/:merchantId', async (req, res) => {
    try {
        const merchantId = req.params.merchantId;
        const reviews = await Review.find({ merchantId: merchantId });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;
