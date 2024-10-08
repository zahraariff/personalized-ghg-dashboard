// Import contents of .env file
require('dotenv').config();

//Use Express
const express = require("express");
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
// const mongoString = "mongodb+srv://zahraariff:nd6CyXk46GSJ6kg1@cluster0.q341x8n.mongodb.net/";
// console.log(process.env.DATABASE_URL);
const routes = require('./routes/routes');
const emissionDataRoutes = require('./routes/emissionData.routes');
const cookieRoutes = require('./routes/cookie.routes');
const cors = require('cors');
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");

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
app.use(cookieParser());

app.use(function(req, res, next) {  
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});  


// User registration and login
const db = require("./model/role.model");
const authRoutes = require('./routes/auth.routes');
const Role = db.role;

const corsOptions = {
    origin: '*', // Replace with your allowed origin
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  };
  // Enable CORS with options
app.use(cors(corsOptions));

//Adds a middleware function to the Express application's request processing pipeline.
//Middleware function = Functions that have access to the request and response obj, can perform tasks such as modifying req/res 
//express.json() automatically parses the request body and makes the JSON data available on the 'req.body' property
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cookieSession({
      name: "ghg-session",
      secret: "COOKIE_SECRET", // should use as secret environment variable
      httpOnly: true
    })
  );


require('./routes/user.routes')(app);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

app.use('/api', routes)

app.use('', emissionDataRoutes)
app.use('', authRoutes)
app.use('', cookieRoutes)

module.exports = app;





