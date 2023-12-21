const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        default: () => new mongoose.Types.ObjectId().toString()
    },
    merchantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Merchant', // This tells Mongoose that this ID refers to a document in the Merchant collection
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Shopping', 'Attraction', 'Accommodation', 'Event&Exhibition', 'Tour']
    },
    price: {
        type: Number,
        required: true

    },
    averageRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    numberOfRatings: {
        type: Number,
        default: 0
    }
});





const Product = mongoose.model('Product', productSchema);

module.exports = Product;
