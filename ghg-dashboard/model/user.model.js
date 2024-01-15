const mongoose = require("mongoose");
const roles = require("./roles")

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        roles: {
            type: String,
            default: roles.user
        },
        selectedGraphs: {
            type: [String],
            default: []
        }
    })
);

module.exports = User;