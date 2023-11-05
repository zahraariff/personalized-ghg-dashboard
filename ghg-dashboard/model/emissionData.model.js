const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// List of columns for emissionData schema

let emissionData = new Schema(
    {
        scope: {
            type: String
        },
        dataType: {
            type: String
        },
        dataDesc: {
            type: String
        },
        dataValue: {
            type: Number
        },
    }, 
    {
        timestamps: true // Automatically add createdAt and updatedAt fields
    }
);

module.exports = mongoose.model('emissionData', emissionData);
