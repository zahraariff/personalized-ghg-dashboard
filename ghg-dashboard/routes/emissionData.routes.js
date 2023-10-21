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

//Edit Emission Data
emissionDataRoute.patch("/edit-emission-data/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updateFields = req.body;

        // Find the emissionData document by ID
        const data = await emissionDataModel.findById(id);

        if (!data) {
            return res.status(404).json({ message: 'Emission Data not found' })
        }

        // Update the fields provided in the request body
        Object.assign(data, updateFields);

        // Save the updated document
        await data.save();
        return res.status(200).json({ message: 'Emission Data updated successfully'})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

emissionDataRoute.delete("/delete-emission-data/:id", async (req, res) => {
    console.log('delete emission data')
    try {
      // console.log(id, 'this is sensor id to deleted')
      console.log(req.params)
      const { id } = req.params;
      console.log(id)
      
      // Find the emission data document by ID
      const data = await emissionDataModel.findById(id);
      
      if (!data) {
        return res.status(404).json({ message: 'Emission data not found' });
      }
      
      // Delete the IoT sensor document
      await data.deleteOne();
      
      return res.status(200).json({ message: 'Sensor deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = emissionDataRoute;
