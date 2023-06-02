const mongoose = require('mongoose');

const iotSensor = new mongoose.Schema({
    deviceName: {
        required: true,
        type: String
    },
    deviceModel: {
        required: true,
        type: String
    },
    desc: {
        required: true,
        type: String
    },
    building: {
        required: true,
        type: String
    },
    room: {
        required: true,
        type: String
    },
    locDesc: {
        required: true,
        type: String
    },
    deviceImage: {
        file: Buffer
    }
})

const iotSensorDataModel = mongoose.model('iotSensor', iotSensor)
module.exports = iotSensorDataModel