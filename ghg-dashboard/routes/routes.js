var express = require('express');
var router = express.Router();
const iotSensorDataModel = require('../model/model');
const mongoose = require('mongoose');
module.exports = router;

// Post Method
router.post('/post', async (req,res) => {
   const data = new iotSensorDataModel({
    deviceName: req.body.deviceName,
    deviceModel: req.body.deviceModel,
    desc: req.body.desc,
    building: req.body.building,
    room: req.body.room,
    locDesc: req.body.locDesc,
    deviceImage: req.body.deviceImage
   })

   try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave)
   } catch (error) {
    res.status(400).json({message: error.message})
   }
})
