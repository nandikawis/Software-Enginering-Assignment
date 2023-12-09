const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const uri = "mongodb+srv://Cluster73858%40admin:Cluster73858@cluster73858.paxrtgk.mongodb.net/?retryWrites=true&w=majority";

// Creating a MongoDB client instance with connection string and options
const client = new MongoClient(uri, {
    serverApi: ServerApiVersion.v1
});

// Middleware for enabling CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Middleware for parsing JSON bodies (body-parser functionality is now built into Express)
app.use(express.json());

// Middleware for parsing URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Asynchronous function to establish connection to MongoDB
async function run() {
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB");

        // Example Express route
        app.get('/', async (req, res) => {
            // Accessing a specific collection in the MongoDB database
            const collection = client.db("your-database-name").collection("your-collection-name");
            // Perform database operations, e.g., finding documents
            const documents = await collection.find({}).toArray();
            res.json(documents); // Sending the results as JSON
        });

        // More routes can be added here

    } catch (error) {
        console.error("Error connecting to MongoDB", error);
    }
}

run().catch(console.dir);

// Starting the Express server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});