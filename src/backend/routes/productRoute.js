const express = require('express');
const router = express.Router();
const Product = require('../models/Product');



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



// GET route to fetch the product by category
router.get('/category', async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.category });
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
})

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
            { productId: customProductId }, // Use your custom productId field for the query
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
    try {
        const products = await Product.find();
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

