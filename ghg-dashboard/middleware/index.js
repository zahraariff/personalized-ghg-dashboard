const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const authJwt = require("./authJwt");
const verifyRegistration = require("./verifyRegistration");

const db = {};

db.mongoose = mongoose;

db.user = require("../model/user.model");
db.user = require("../model/role.model");

db.ROLES = ["user", "admin"];

module.exports = {
    db,
    authJwt,
    verifyRegistration
};