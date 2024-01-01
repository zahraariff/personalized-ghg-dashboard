const express = require('express');

const app = express();
const emissionDataRoute = express.Router();

let emissionDataModel = require ('../model/emissionData.model');
let scopeModel = require('../model/scope.model');
let dataTypeModel = require('../model/dataType.model');
let dataDescModel = require('../model/dataDesc.model');
let userModel = require('../model/user.model');

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

// Edit Emission Data
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
    try {
      const { id } = req.params;
      
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

// [CHARTS]: View Emission Data Based On The Specified Months In A Specified Year
emissionDataRoute.get("/get-emission-data-specified-months/:year/:startMonth/:endMonth", async (req, res) => {

    // Get the specified year from URL and parse the String to an integer
    const specifiedYear = parseInt(req.params.year)

    //Get the start and end months from the URL
    const startMonth = parseInt(req.params.startMonth)
    const endMonth = parseInt(req.params.endMonth)

     // Validate months (you may add additional validation if needed)
     if (startMonth < 1 || startMonth > 12 || endMonth < 1 || endMonth > 12) {
        return res.status(400).send("Invalid month specified");
    }

    // Create the minDate and maxDate based on the specified year
    const minDate = new Date(`${specifiedYear}-${startMonth.toString().padStart(2, '0')}-01T00:00:00Z`);
    const maxDate = new Date(`${specifiedYear}-${(endMonth + 1).toString().padStart(2, '0')}-01T00:00:00Z`);


    try {
        const data = await emissionDataModel.aggregate(
            [
                { $match:
                    {
                        createdAt: {
                          $gte: minDate,
                          $lt: maxDate,
                        },
                    }
                }
            ]
        )
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// [POST METHOD] [CHARTS]: View Emission Data Based On The Specified Months In A Specified Year
// Ensure that req.body scopes value are passed as boolean not string
emissionDataRoute.post("/query-report-data", async (req, res) => {

    try {
    // Get parameters from request 
        const {
            emissionDataType,
            maxDate,
            minDate,
            name,
            scopes,
        } = req.body;

        console.log(req.body)

        if(!name || !maxDate || !minDate){
            return res.status(400).send("Invalid form data");
        }

        // Extracting keys with value true from scopes
        const trueScopes = Object.keys(scopes).filter(key => scopes[key] === true);
        const scopeArr = [];

        console.log(trueScopes)

        if(trueScopes.includes("scope1")){
            scopeArr.push("Scope 1");
        } 
        
        if (trueScopes.includes("scope2")) {
            scopeArr.push("Scope 2");
        }

        if (trueScopes.includes("scope3")) {
            scopeArr.push("Scope 3");
        }

        console.log(scopeArr)

        // Use the values to create a MongoDB Query
        const data = await emissionDataModel.aggregate([
            { $match:
                {
                    createdAt: {
                        $gte: new Date(`${minDate}T00:00:00.000Z`),
                        $lt: new Date(`${maxDate}T00:00:00.000Z`),
                    },
                    $or: scopeArr.map(scope => ({ scope: scope })),
                }
            }
        ])

        // Send Back data to Client
        res.json(data);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

// [CHARTS]: View Emission Data Based On The Specified Year With Scope
emissionDataRoute.get("/get-emission-data-specified-year/:year/:scope", async (req, res) => {

    // Get the specified year from URL and parse the String to an integer
    const specifiedYear = parseInt(req.params.year)

    // Get scope from URL: scope1, scope2, scope3
    const scope = req.params.scope

    // Create the minDate and maxDate based on the specified year
    const minDate = new Date(`${specifiedYear}-01-01T00:00:00Z`);
    const maxDate = new Date(`${specifiedYear + 1}-01-01T00:00:00Z`);

    try {
        const data = await emissionDataModel.aggregate(
            [
                { $match:
                    {
                        createdAt: {
                          $gte: minDate,
                          $lt: maxDate,
                        },
                        scope: {
                            scope
                        }
                    }
                }
            ]
        )
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// [CHARTS]: View Emission Data Based On The Specified Months In A Specified Year With Scope
emissionDataRoute.get("/get-emission-data-specified-months/:year/:startMonth/:endMonth/:scope", async (req, res) => {

    // Get the specified year from URL and parse the String to an integer
    const specifiedYear = parseInt(req.params.year)

    //Get the start and end months from the URL
    const startMonth = parseInt(req.params.startMonth)
    const endMonth = parseInt(req.params.endMonth)

    // Get scope from URL: scope1, scope2, scope3
    const scope = req.params.scope

     // Validate months (you may add additional validation if needed)
     if (startMonth < 1 || startMonth > 12 || endMonth < 1 || endMonth > 12) {
        return res.status(400).send("Invalid month specified");
    }

    // Create the minDate and maxDate based on the specified year
    const minDate = new Date(`${specifiedYear}-${startMonth.toString().padStart(2, '0')}-01T00:00:00Z`);
    const maxDate = new Date(`${specifiedYear}-${(endMonth + 1).toString().padStart(2, '0')}-01T00:00:00Z`);


    try {
        const data = await emissionDataModel.aggregate(
            [
                { $match:
                    {
                        createdAt: {
                          $gte: minDate,
                          $lt: maxDate,
                        },
                        scope: {
                            scope
                        }
                    }
                }
            ]
        )
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// [CHARTS]: View Emission Data Based On The Specified Year With Emission Data Type
emissionDataRoute.get("/get-emission-data-specified-year-emission/:year/:emissiontype", async (req, res) => {

    // Get the specified year from URL and parse the String to an integer
    const specifiedYear = parseInt(req.params.year)

    // Get emission data type 
    const type = req.params.emissiontype

    // Create the minDate and maxDate based on the specified year
    const minDate = new Date(`${specifiedYear}-01-01T00:00:00Z`);
    const maxDate = new Date(`${specifiedYear + 1}-01-01T00:00:00Z`);

    try {
        const data = await emissionDataModel.aggregate(
            [
                { $match:
                    {
                        dataType: type,
                        createdAt: {
                          $gte: minDate,
                          $lt: maxDate,
                        }
                    }
                }
            ]
        )
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// [ADMIN]: Get all users in the system
emissionDataRoute.get("/get-all-users", async (req, res) => {
    try {
        userModel.find().then((data) => {
            res.send(data);
        });

    } catch (error) {
        res.send(data);
    }
})

// [ADMIN]: Edit user details
emissionDataRoute.patch("/edit-user/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updateFields = req.body;

        // Find the document by ID
        const data = await userModel.findById(id);

        if (!data) {
            return res.status(404).json({ message: 'User not found' })
        }

        // Update te fields provided in the request body
        Object.assign(data, updateFields);

        // Save the updated document
        await data.save();
        return res.status(200).json({ message: 'User details updated successfully'})

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
})

// [ADMIN]: Delete user from system
emissionDataRoute.delete("/delete-user/:id", async (req, res) => {
    try {

        const { id } = req.params;
        const data = await userModel.findById(id);

        if (!data) {
            return res.status(404).json({ message: 'User not found' })
        }

        await data.deleteOne();
        return res.status(200).json({ message: 'User deleted successfully!'})
    } catch (error) {
        return res.status(500).json({ message: 'Error'})
        
    }
})



module.exports = emissionDataRoute;
