const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// List of columns for emissionData schema

let dataType = new Schema({
    name: {
        type: String
    },
    scope: {
        type: String
    }
});

module.exports = mongoose.model('dataType', dataType);
