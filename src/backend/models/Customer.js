const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
    customerId: {
        type: String,
        default: () => new mongoose.Types.ObjectId().toString() // Correct instantiation
    },
    fullName: {
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
    password: {
        type: String,
        required: true
    }

})

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;