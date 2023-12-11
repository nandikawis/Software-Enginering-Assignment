const express = require('express');
const router = express.Router();
const Merchant = require('../models/Merchant');
// POST route to add a new merchant
router.post('/', async (req, res) => {
    console.log('Received data:', req.body);
    try {
        const newMerchant = new Merchant(req.body);
        const savedMerchant = await newMerchant.save();
        console.log('Merchant saved:', savedMerchant);
        res.status(201).json(savedMerchant);
    } catch (error) {
        console.error('Error saving merchant:', error);
        res.status(400).json({ message: error.message, stack: error.stack });
    }
});

// GET route to fetch all merchants
router.get('/', async (req, res) => {
    try {
        const merchants = await Merchant.find();
        res.json(merchants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET route to fetch a single merchant by ID
router.get('/:id', async (req, res) => {
    try {
        const merchant = await Merchant.findById(req.params.id);
        if (!merchant) return res.status(404).json({ message: 'Merchant not found' });
        res.json(merchant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT route to update a merchant's details
router.put('/:id', async (req, res) => {
    try {
        const updatedMerchant = await Merchant.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedMerchant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE route to remove a merchant
router.delete('/:id', async (req, res) => {
    try {
        await Merchant.findByIdAndDelete(req.params.id);
        res.json({ message: 'Merchant deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
