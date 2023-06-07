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
const cors = require('cors');

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
app.use(cors())

// User registration and login
const db = require("./model/role.model");
const Role = db.role;

const corsOptions = {
    origin: '*', // Replace with your allowed origin
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization'
  };
  // Enable CORS with options
app.use(cors(corsOptions));

//Adds a middleware function to the Express application's request processing pipeline.
//Middleware function = Functions that have access to the request and response obj, can perform tasks such as modifying req/res 
//express.json() automatically parses the request body and makes the JSON data available on the 'req.body' property
app.use(express.json());

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

app.use('/api', routes)

// User registration and login
function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0){
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    })
}






