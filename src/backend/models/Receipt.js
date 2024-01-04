const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Purchase',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    merchantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Merchant',
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true

    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure email is unique
    },
    status: {
        type: String,
        required: true
    },
    paypalTransactionId: {
        type: String,
        required: true
    },
    paymentEmail: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    reviewStatus: {
        type: String,
        enum: ['pending', 'reviewed'],
        default: 'pending'
    }
});

const Receipt = mongoose.model('Receipt', receiptSchema);

module.exports = Receipt;
