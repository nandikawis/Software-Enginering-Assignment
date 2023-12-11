const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const port = process.env.PORT || 3000;

const uri = process.env.MONGODB_URI || "mongodb+srv://Cluster73858:3IAReS8ZwnE9MsEp@cluster73858.paxrtgk.mongodb.net/TourTiger?retryWrites=true&w=majority";
const merchantRoute = require('./routes/merchantRoute');

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
app.use('/merchants', merchantRoute);




// Starting the Express server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});