const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const saltRounds = 10;


const officerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    password: {
        type: String,

    }

});


const Officer = mongoose.model('Officer', officerSchema);

module.exports = Officer;
