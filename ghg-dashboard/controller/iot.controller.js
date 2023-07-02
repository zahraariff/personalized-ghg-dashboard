const iotSensorModel = require('../model/model');

exports.getIoTList = (req, res) => {
    try {
     iotSensorModel.find().then((data) => {
        res.send(data);
     });
    } catch (error) {
        res.send(data);
    }
}

exports.updateIotSensor = async (req,res) => {
    // Update an iotSensor document
        try {
            const { id } = req.params;
            // console.log('id', id)
            const  updateFields  = req.body;

            // const { field, value } = req.body;
    
        // Find the iotSensor document by ID
        const sensor = await iotSensorModel.findById(id);

        // Find the IoTSensor by ID and update the specified field
      // const sensor = await iotSensorModel.findByIdAndUpdate(
      //   id,
      //   { $set: { [field]: value } },
      //   { new: true, strict: false }
      // );
      
        if (!sensor) {
            return res.status(404).json({ message: 'Sensor not found' });
        }
    
        // Update the fields provided in the request body
        Object.assign(sensor, updateFields);
    
        // Save the updated document
        await sensor.save();
        // res.json(sensor);
        return res.status(200).json({ message: 'Sensor updated successfully' });
        } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
        }
}


exports.deleteIotSensor = async (req, res) => {
    console.log('delete controller')
    try {
      // console.log(id, 'this is sensor id to deleted')
      console.log(req.params)
      const { id } = req.params;
      console.log(id)
      
      // Find the IoT sensor document by ID
      const sensor = await iotSensorModel.findById(id);
      
      if (!sensor) {
        return res.status(404).json({ message: 'Sensor not found' });
      }
      
      // Delete the IoT sensor document
      await sensor.deleteOne();
      
      return res.status(200).json({ message: 'Sensor deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };


