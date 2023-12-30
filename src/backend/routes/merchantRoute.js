const express = require('express');
const router = express.Router();
const Merchant = require('../models/Merchant');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer = require('multer');
const Image = require('../models/Attachment');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const mongoose = require('mongoose');

const saltRounds = 10;
router.get('/download/:filename', async (req, res) => {
    try {
        const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
        const files = await bucket.find({ filename: req.params.filename }).toArray();

        if (!files || files.length === 0) {
            return res.status(404).send('File not found');
        }

        const downloadStream = bucket.openDownloadStreamByName(req.params.filename);

        // Set response headers
        res.set('Content-Type', 'image/png');
        res.setHeader('Content-Disposition', `inline; filename=${req.params.filename}`);

        // Pipe the download stream to the response
        downloadStream.pipe(res);
    } catch (error) {
        console.error('Error downloading file:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/downloadById/:id/:filename', async (req, res) => {
    try {
        const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);

        // Convert the provided ID to a valid ObjectId
        const fileId = new mongoose.Types.ObjectId(req.params.id);

        const files = await bucket.find({ _id: fileId }).toArray();

        if (!files || files.length === 0) {
            return res.status(404).send('File not found');
        }

        const downloadStream = bucket.openDownloadStream(fileId);
        const fileName = req.params.filename;
        const fileExtension = fileName.slice(-3).toLowerCase(); // Get the last three characters as the file extension

        if (fileExtension === 'png') {
            res.set('Content-Type', 'image/png');
        } else if (fileExtension === 'jpg' || fileExtension === 'jpeg') {
            res.set('Content-Type', 'image/jpeg');
        } else if (fileExtension === 'pdf') {
            res.set('Content-Type', 'application/pdf');
        } else {
            // Add more conditions for other file types as needed
            res.set('Content-Type', 'application/octet-stream'); // Fallback for unknown types
        }
        res.setHeader('Content-Disposition', `inline; filename=${downloadStream.s.filename}`);

        // Pipe the download stream to the response
        downloadStream.pipe(res);
    } catch (error) {
        console.error('Error downloading file:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/get-file-id/:filename', async (req, res) => {
    try {
        const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
        const files = await bucket.find({ filename: req.params.filename }).toArray();

        if (!files || files.length === 0) {
            return res.status(404).json({ error: 'File not found' });
        }

        // Return the _id in the response
        res.json({ _id: files[0]._id.toString() });
    } catch (error) {
        console.error('Error retrieving file ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
        const { originalname, mimetype, buffer } = req.file;

        // Save metadata to MongoDB using Mongoose
        const image = new Image({
            filename: originalname,
            contentType: mimetype,
        });

        await image.save();

        // Save file to GridFS
        const uploadStream = bucket.openUploadStream(image.filename, { contentType: mimetype });
        uploadStream.end(buffer);
        console.log('Used _id in GridFSBucket:', image.filename);
        uploadStream.on('finish', async () => {
            // Query fs.files to get the correct _id
            const files = await bucket.find({ filename: image.filename }).toArray();
            const savedFileId = files.length > 0 ? files[0]._id : null;
            console.log('Used _id in fs.files:', savedFileId);
            res.json({ message: 'File uploaded successfully', fileId: savedFileId, fileName: image.filename });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error uploading file' });
    }
});


// GET route to check if email is available for registration
router.get('/check-email', async (req, res) => {
    const { email } = req.query;
    const merchant = await Merchant.findOne({ email: email });
    if (merchant) {
        res.json({ emailAvailable: false });
    } else {
        res.json({ emailAvailable: true });
    }
});

// GET route to check if old password matches
router.get('/check-oldpassword', async (req, res) => {
    const { newpassword, oldpassword } = req.query;

    const isMatch = await bcrypt.compare(newpassword, oldpassword);
    if (isMatch) {
        res.json({ passwordMatch: false });
    } else {
        res.json({ passwordMatch: true });
    }
});

// POST route for login
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
        const token = jwt.sign({ id: merchant._id }, process.env.JWT_SECRET, { expiresIn: '30m' });
        console.log('Generated JWT Token:', token);
        res.json({ token }); // Send the token to the client
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// PUT route to approve a merchant
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

// GET route to fetch a single merchant by email
router.get('/email', async (req, res) => {
    try {
        const { email } = req.query;
        const merchant = await Merchant.findOne({ email: email });
        if (!merchant) return res.status(404).json({ message: 'Merchant not found' });
        res.json(merchant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// GET route to fetch a single merchant by merchantId
router.get('/merchantId', async (req, res) => {
    try {
        const { merchantId } = req.query;
        const merchant = await Merchant.findOne({ merchantId: merchantId });
        if (!merchant) return res.status(404).json({ message: 'Merchant not found' });
        res.json(merchant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// PUT route to change password
router.put('/changePassword', async (req, res) => {
    try {
        const { email, newpassword } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        const thepassword = bcrypt.hashSync(newpassword, saltRounds);
        const updatedMerchant = await Merchant.findOneAndUpdate(
            { email: email },
            { $set: { password: thepassword } },
            { new: true } // Returns the updated document
        );


        if (!updatedMerchant) {
            return res.status(404).json({ message: 'Merchant not found' });
        }

        res.json(updatedMerchant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// POST route to create a new merchant
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
