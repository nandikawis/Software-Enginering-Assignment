const express = require('express');
const router = express.Router();
const Officer = require('../models/Officer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(`Attempting login with username: ${username}`); // Debug log

        const officer = await Officer.findOne({ username });

        if (!officer) {
            console.log('No officer found with that username');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        console.log('Officer found:', officer);
        const isMatch = await bcrypt.compare(password, officer.password);

        if (!isMatch) {
            console.log('Password does not match');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        console.log('Credentials match');
        // Generate a JWT token
        const token = jwt.sign({ id: officer._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
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
        const newOfficer = new Officer(req.body);
        newOfficer.password = await bcrypt.hash(newOfficer.password, saltRounds);
        const savedOfficer = await newOfficer.save();
        console.log('Officer saved:', savedOfficer);
        res.status(201).json(savedOfficer);
    } catch (error) {
        console.error('Error saving officer data:', error);
        res.status(400).json({ message: error.message, stack: error.stack });
    }
});

module.exports = router;