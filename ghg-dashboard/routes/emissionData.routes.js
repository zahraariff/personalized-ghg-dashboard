const express = require('express');

const app = express();
const emissionDataRoute = express.Router();

let emissionDataModel = require ('../model/emissionData.model');

// Add New Emission Data
emissionDataRoute.post("/addEmissionData", async (req,res) => {
    let emissionData = new emissionDataModel(req.body);
    console.log(req.body);
    emissionData.save()
    .then(game => {
        res.status(200).json({'emissionData': 'Emission Data Added Successfully'});
    })
    .catch(err => {
        res.status(400).send("Something Went Wrong");
    });
});

emissionDataRoute.get("/view-emission-data", (req, res) => {
    try {
        emissionDataModel.find().then((data) => {
           res.send(data);
        });
    } catch (error) {
        res.send(data);
    }
})

module.exports = emissionDataRoute;
