const express = require('express');

const app = express();
const emissionDataRoute = express.Router();

let emissionDataModel = require ('../model/emissionData.model');
let scopeModel = require('../model/scope.model');
let dataTypeModel = require('../model/dataType.model');
let dataDescModel = require('../model/dataDesc.model');

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

// [ADMIN]: Retrieve Emission Data Scopes
emissionDataRoute.get("/view-data-scopes", (req, res) => {
    try {
        scopeModel.find().then((data) => {
           res.send(data);
        });
    } catch (error) {
        res.send(data);
    }
})

// [ADMIN]: Retrieve Emission Data Types
emissionDataRoute.get("/view-data-types", (req, res) => {
    try {
        dataTypeModel.find().then((data) => {
           res.send(data);
        });
    } catch (error) {
        res.send(data);
    }
})

// [ADMIN]: Retrieve Emission Data Descriptions
emissionDataRoute.get("/view-data-descriptions", (req, res) => {
    try {
        dataDescModel.find().then((data) => {
           res.send(data);
        });
    } catch (error) {
        res.send(data);
    }
})

// [ADMIN]: Add New Emission Scope
emissionDataRoute.post("/add-new-scope", async (req,res) => {
    let scope = new scopeModel(req.body);
    console.log(req.body);
    scope.save()
    .then(game => {
        res.status(200).json({'scope': 'New Scope Added Successfully'});
    })
    .catch(err => {
        res.status(400).send("Something Went Wrong");
    });
});

// [ADMIN]: Add New Activity Data Type
emissionDataRoute.post("/add-new-data-type", async (req,res) => {
    let dataType = new dataTypeModel(req.body);
    console.log(req.body);
    dataType.save()
    .then(game => {
        res.status(200).json({'dataType': 'New Activity Data Type Added Successfully'});
    })
    .catch(err => {
        res.status(400).send("Something Went Wrong");
    });
});

// [ADMIN]: Add New Activity Data Description
emissionDataRoute.post("/add-new-data-desc", async (req,res) => {
    let dataDesc = new dataDescModel(req.body);
    console.log(req.body);
    dataDesc.save()
    .then(game => {
        res.status(200).json({'dataDesc': 'New Activity Data Description Added Successfully'});
    })
    .catch(err => {
        res.status(400).send("Something Went Wrong");
    });
});

// [ADMIN]: Delete Scope
emissionDataRoute.delete("/delete-scope/:id", async (req, res) => {
    console.log('delete scope')
    try {
      // console.log(id, 'this is sensor id to deleted')
      console.log(req.params)
      const { id } = req.params;
      console.log(id)
      
      // Find the emission data document by ID
      const data = await scopeModel.findById(id);
      
      if (!data) {
        return res.status(404).json({ message: 'Scope not found' });
      }
      
      // Delete the IoT sensor document
      await data.deleteOne();
      
      return res.status(200).json({ message: 'Scope deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
});

// [ADMIN]: Delete Activity Data Type
emissionDataRoute.delete("/delete-activity-data-type/:id", async (req, res) => {
    console.log('delete adt')
    try {
      console.log(req.params)
      const { id } = req.params;
      console.log(id)
      
      // Find the emission data document by ID
      const data = await dataTypeModel.findById(id);
      
      if (!data) {
        return res.status(404).json({ message: 'ADT not found' });
      }
      
      // Delete the IoT sensor document
      await data.deleteOne();
      
      return res.status(200).json({ message: 'ADT deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
});

// [ADMIN]: Delete Activity Data Type
emissionDataRoute.delete("/delete-activity-data-desc/:id", async (req, res) => {
    console.log('delete add')
    try {
      console.log(req.params)
      const { id } = req.params;
      console.log(id)
      
      // Find the emission data document by ID
      const data = await dataDescModel.findById(id);
      
      if (!data) {
        return res.status(404).json({ message: 'ADD not found' });
      }
      
      // Delete the IoT sensor document
      await data.deleteOne();
      
      return res.status(200).json({ message: 'ADD deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = emissionDataRoute;
