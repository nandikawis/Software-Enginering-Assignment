const express = require('express');
const router = express.Router();
const Purchase = require('../models/Purchase');


router.get('/orderId', async (req, res) => {
    try {
        const { orderId } = req.query;
        const purchase = await Purchase.findOne({ orderId: orderId });
        if (!purchase) return res.status(404).json({ message: 'Purchase not found' });
        console.log('Purchase found:', purchase);
        res.json(purchase);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.get('/', async (req, res) => {
    try {
        const purchases = await Purchase.find();
        res.json(purchases);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.post('/', async (req, res) => {
    console.log('Received data:', req.body);
    try {
        const newPurchase = new Purchase(req.body);
        const savedPurchase = await newPurchase.save();
        console.log('Purchase saved:', savedPurchase);
        res.status(201).json(savedPurchase);
    } catch (error) {
        console.error('Error saving purchase:', error);
        res.status(400).json({ message: error.message, stack: error.stack });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const updatedPurchase = await Purchase.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPurchase);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

module.exports = router;