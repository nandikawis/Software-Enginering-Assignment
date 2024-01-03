const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    reviewId: {
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
        ref: 'Merchant', // This tells Mongoose that this ID refers to a document in the Merchant collection
        required: true
    },
    fullName: {
        type: String,
        required: true
    },

    rating: {
        type: Number,
        required: true
    },
    reviewDescription: {
        type: String,
        required: true
    },
    paypalTransactionId: {
        type: String,
        required: true
    },
    reviewTitle: {
        type: String,
        required: true
    }

});
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;