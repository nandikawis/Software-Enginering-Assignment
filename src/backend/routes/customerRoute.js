const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const saltRounds = 10;

router.get('/check-email', async (req, res) => {
    const { email } = req.query;
    const customer = await Customer.findOne({ email: email });
    if (customer) {
        res.json({ emailAvailable: false });
    } else {
        res.json({ emailAvailable: true });
    }
});

router.get('/email', async (req, res) => {
    try {
        const { email } = req.query;
        const customer = await Customer.findOne({ email: email });
        if (!customer) return res.status(404).json({ message: 'Customer not found' });
        res.json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(`Attempting login with email: ${email}`); // Debug log

        const customer = await Customer.findOne({ email });

        if (!customer) {
            console.log('No customer found with that email');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        console.log('Customer found:', customer);
        const isMatch = await bcrypt.compare(password, customer.password);

        if (!isMatch) {
            console.log('Password does not match');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        console.log('Credentials match');
        // Generate a JWT token
        const token = jwt.sign({ id: customer._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Generated JWT Token:', token);
        res.json({ token }); // Send the token to the client
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.post('/', async (req, res) => {
    console.log('Received data:', req.body);
    try {
        const newCustomer = new Customer(req.body);
        newCustomer.password = await bcrypt.hash(newCustomer.password, saltRounds);
        const savedCustomer = await newCustomer.save();
        console.log('Customer saved:', savedCustomer);
        res.status(201).json(savedCustomer);
    } catch (error) {
        console.error('Error saving customer data:', error);
        res.status(400).json({ message: error.message, stack: error.stack });
    }
});

module.exports = router;