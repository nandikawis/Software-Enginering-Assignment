require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

const uri = process.env.MONGODB_URI;

const customerRoute = require('./routes/customerRoute');

const merchantRoute = require('./routes/merchantRoute');

const productRoute = require('./routes/productRoute');

const purchaseRoute = require('./routes/purchaseRoute');

const receiptRoute = require('./routes/receiptRoute');

const reviewRoute = require('./routes/reviewRoute');

const officerRoute = require('./routes/officerRoute');

// Creating a MongoDB client instance with connection string and options
mongoose.connect(uri)
    .then(() => console.log("Connected successfully to MongoDB Atlas"))
    .catch(err => console.error("Error connecting to MongoDB", err));

//MIDDLEWARE
// Middleware for enabling CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Middleware for parsing JSON bodies (body-parser functionality is now built into Express)
app.use(express.json());

// Middleware for parsing URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Asynchronous function to establish connection to MongoDB

//Routes
app.use('/customers', customerRoute);

app.use('/merchants', merchantRoute);

app.use('/products', productRoute);

app.use('/purchases', purchaseRoute);

app.use('/receipts', receiptRoute);

app.use('/reviews', reviewRoute);

app.use('/officer', officerRoute);


// Starting the Express server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});