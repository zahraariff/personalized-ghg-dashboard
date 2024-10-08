const config = require("../config/auth.config");
const db = require("../model");
const passwordResetToken = require('../model/resettoken.model'); 
const crypto = require('crypto');
const User = db.user;
const cookieParser = require("cookie-parser");
const express = require('express');
const app = express();
app.use(cookieParser())

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.register = (req,res) => {

    User.findOne({
        $or: [
            { username: req.body.username },
            { email: req.body.email }
        ]
    }).then((existingUser) => {
        if (existingUser) {
            console.error('This email or username has already been registered.')
            return res.status(400).json({ error: 'This email or username has already been registered' });
        } else {
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8),
                role: [ "user" ]        
            });
            
            newUser.save()
                .then(() => {
                    return res.status(201).json(newUser);
                })
                .catch((error) => {
                    console.error('Failed to save user:', error);
                    this.errorMessage = error;
                });
        }
    })
}

exports.login = async (req, res) => {

    const { username, email, password } = req.body;

    let user;
    if (username) {
        user = await User.findOne({ username });
    } else if (email) {
        user = await User.findOne({ email });
    }

    // Check if the user exists and the password is correct
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ error: 'Invalid credentials' });
    } else {
        console.log("Logged In");

        // Access and use the user's roles property
        const userRoles = user.roles;
        console.log(`User Roles: ${userRoles}`);

        // Generate a JWT
        const token = jwt.sign({ userId: user._id }, 'secret-key');
        // console.log(token);
        res.token = token;

        // Return the token to the client
        res.json({ token, userRoles }); 
    }
}

exports.loginAsAdmin = async (req, res) => {

    const { username, email, password } = req.body;

    let user;
    if (username) {
        user = await User.findOne({ username });
    } else if (email) {
        user = await User.findOne({ email });
    }

    // Check if the user exists, the password is correct and the user has an admin role
    if (!user || !bcrypt.compareSync(password, user.password) || user.roles.includes('user')) {
        return res.status(401).json({ error: 'Invalid credentials' });
    } else {
        console.log("Logged in as admin");

        // Set user role as cookies 
        console.log(user.roles)

        // Generate a JWT
        const token = jwt.sign({ userId: user._id }, 'secret-key');
        console.log(token);
        res.token = token;

        // Return the token to the client
        res.json({ token }); 
    }
}

exports.logout = async (req, res) => {
    try {
      res.token = null;
      return res.status(200).send({ message: "You've been signed out!" });
    } catch (err) {
        console.log("logout unsuccessful")
      this.next(err);
    }
  };


