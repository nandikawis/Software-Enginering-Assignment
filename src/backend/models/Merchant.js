const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const saltRounds = 10;


const merchantSchema = new mongoose.Schema({
    merchantId: {
        type: String,
        default: () => new mongoose.Types.ObjectId().toString()
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
        unique: true
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
    password: {
        type: String,

    },
    documentId: {
        type: String,
        required: true
    },
    fileDescription: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
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
