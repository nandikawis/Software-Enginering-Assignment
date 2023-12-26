const mongoose = require('mongoose');
const purchaseSchema = new mongoose.Schema({
    orderId: {
        type: String,
        default: () => new mongoose.Types.ObjectId().toString() // Correct instantiation
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
    specialRequest: {
        type: String,
        default: '-'
    },
    price: {
        type: Number,
        required: true

    },
    email: {
        type: String,
        required: true,

    },
    status: {
        type: String,
        enum: ['pending', 'success', 'fail'],
        default: 'pending'
    },
});





const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;
