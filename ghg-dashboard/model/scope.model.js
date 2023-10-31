const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// List of columns for emissionData schema

let scope = new Schema({
    name: {
        type: String
    },
});

module.exports = mongoose.model('scope', scope);
