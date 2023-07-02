const mongoose = require('mongoose');

const iotSensor = new mongoose.Schema({
    deviceName: {
        type: String
    },
    deviceModel: {
        type: String
    },
    desc: {
        type: String
    },
    building: {
        type: String
    },
    room: {
        type: String
    },
    locDesc: {
        type: String
    },
    deviceImage: {
        file: Buffer
    }
})

const iotSensorDataModel = mongoose.model('iotSensor', iotSensor);
module.exports = iotSensorDataModel