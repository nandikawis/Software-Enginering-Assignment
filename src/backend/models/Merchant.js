const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const saltRounds = 10;


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
    password: {
        type: String,

    }
});

merchantSchema.methods.generateRandomPassword = function () {
    return crypto.randomBytes(8).toString('hex');
};

merchantSchema.pre('save', function (next) {
    // Hash the password if it is new or modified
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }
    next();
});

const Merchant = mongoose.model('Merchant', merchantSchema);

module.exports = Merchant;
