// Import contents of .env file
require('dotenv').config();

//Use Express
const express = require("express");
const mongoose = require('mongoose');
// const mongoString = process.env.DATABASE_URL;
const mongoString = "mongodb+srv://zahraariff:nd6CyXk46GSJ6kg1@cluster0.q341x8n.mongodb.net/";
// console.log(process.env.DATABASE_URL);
const routes = require('./routes/routes');
const router = express.Router()

// Connect the db to this server using Mongoose
mongoose.connect(mongoString);
const database = mongoose.connection;

// Database connection error handling
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

//Create new instance of the express server
const app = express();

//Adds a middleware function to the Express application's request processing pipeline.
//Middleware function = Functions that have access to the request and response obj, can perform tasks such as modifying req/res 
//express.json() automatically parses the request body and makes the JSON data available on the 'req.body' property
app.use(express.json());

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

app.use('/api', routes)





