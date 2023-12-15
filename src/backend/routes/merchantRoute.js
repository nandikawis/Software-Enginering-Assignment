const express = require('express');
const router = express.Router();
const Merchant = require('../models/Merchant');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// POST route to add a new merchant

router.get('/check-email', async (req, res) => {
    const { email } = req.query;
    const merchant = await Merchant.findOne({ email: email });
    if (merchant) {
        res.json({ emailAvailable: false });
    } else {
        res.json({ emailAvailable: true });
    }
});
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(`Attempting login with email: ${email}`); // Debug log

        const merchant = await Merchant.findOne({ email });

        if (!merchant) {
            console.log('No merchant found with that email');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        console.log('Merchant found:', merchant);
        const isMatch = await bcrypt.compare(password, merchant.password);

        if (!isMatch) {
            console.log('Password does not match');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        console.log('Credentials match');
        // Generate a JWT token
        const token = jwt.sign({ id: merchant._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token }); // Send the token to the client
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.put('/approve', async (req, res) => {
    try {
        const { _id } = req.body;
        const merchant = await Merchant.findOne({ _id });
        if (!merchant) {
            return res.status(404).json({ message: 'Merchant not found' });
        }

        // Generate a new random password
        const plaintextPassword = merchant.generateRandomPassword();
        console.log(`Generated new plaintext password: ${plaintextPassword}`);

        // Update merchant with new password and status
        merchant.password = plaintextPassword;
        merchant.status = 'accepted';
        await merchant.save();

        res.json({ message: 'Merchant approved and password generated', password: plaintextPassword });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

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


//Check the email already exist or not


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
