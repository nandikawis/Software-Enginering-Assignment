const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    filename: String,
    contentType: String,
    uploadDate: { type: Date, default: Date.now },
    // Add any additional metadata fields as needed
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
