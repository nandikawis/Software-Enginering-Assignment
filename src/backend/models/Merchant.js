const mongoose = require('mongoose');

const merchantSchema = new mongoose.Schema({
    merchantId: {
        type: String,
        default: () => new mongoose.Types.ObjectId().toString() // Correct instantiation
    },
    name: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure email is unique
    },
    companyDescription: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    //document: String, // Need adjustment
    password: String // Set this upon approval
});

const Merchant = mongoose.model('Merchant', merchantSchema);

module.exports = Merchant;
