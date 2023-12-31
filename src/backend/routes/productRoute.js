const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Image = require('../models/Attachment');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const mongoose = require('mongoose');



router.put('/deleteProduct', async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await Product.findOne({ productId: productId });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        product.status = 'deleted';
        await product.save();

        res.json({ message: 'Product Deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
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



// GET route to fetch all products for a specific merchant
router.get('/merchantId', async (req, res) => {
    try {
        const merchantId = req.query.merchantId;
        const products = await Product.find({ merchantId: merchantId });
        if (!products) return res.status(404).json({ message: 'Merchant not found' });
        res.json(products);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/merchantIdAndStatus', async (req, res) => {
    try {
        const merchantId = req.query.merchantId;
        const status = 'available';
        const products = await Product.find({ merchantId: merchantId, status: status });
        if (!products) return res.status(404).json({ message: 'Merchant not found' });
        res.json(products);
    } catch (err) {
        res.status(500).send(err);
    }
});



// GET route to fetch the product by category
router.get('/category', async (req, res) => {
    try {
        const category = req.query.category; // Use req.query instead of req.params
        const status = 'available';
        const products = await Product.find({ category: category, status: status });

        if (!products.length) {
            return res.status(404).json({ message: 'No products found in this category' });
        }

        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.get('/productId', async (req, res) => {
    try {
        const { productId } = req.query;
        const product = await Product.findOne({ productId: productId });
        if (!product) return res.status(404).json({ message: 'Product no found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



router.put('/editProduct/:productId', async (req, res) => {
    try {
        const customProductId = req.params.productId;
        const { newName, newPrice, newDescription } = req.body;

        const updatedProduct = await Product.findOneAndUpdate(
            { productId: customProductId },
            { $set: { productName: newName, price: newPrice, productDescription: newDescription } },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




// GET route to fetch all products
router.get('/', async (req, res) => {
    const status = 'available';
    try {
        const products = await Product.find({ status: status });
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// GET route to fetch a single product by ID
router.get('/:id', async (req, res) => {
    try {

        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// POST route to create a new product
router.post('/', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
        console.log('Product successfully saved:', savedProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// PUT route to update an existing product
router.put('/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedProduct = req.body;
        const product = await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// DELETE route to delete a product
router.delete('/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;

