const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// List of columns for emissionData schema

let dataDesc = new Schema({
    name: {
        type: String
    },
    type: {
        type: String
    },
    scope: {
        type: String
    }
});

module.exports = mongoose.model('dataDesc', dataDesc);
