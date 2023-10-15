const express = require('express');

const app = express();
const emissionDataRoute = express.Router();

let emissionDataModel = require ('../model/emissionData.model');

// Add New Emission Data
emissionDataRoute.route('addEmissionData').post(function (req,res) {
    let emissionData = new emissionDataModel(req.body);
    emissionData.save()
    .then(game => {
        res.status(200).json({'emissionData': 'Emission Data Added Successfully'});
    })
    .catch(err => {
        res.status(400).send("Something Went Wrong");
    });
});