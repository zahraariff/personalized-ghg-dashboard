const controller = require("../controller/auth.controller");
const iotController = require("../controller/iot.controller");
const express = require('express');

authRoute = express.Router();

authRoute.post(
  "/api/auth/registration",
  controller.register
);

authRoute.post(
  "/api/auth/login",
  controller.login
);

authRoute.get(
  "/api/iot-sensor",
  iotController.getIoTList
);

authRoute.patch(
  "/api/iot/edit/:id",
  iotController.updateIotSensor
);

authRoute.post(
  "/api/iot/delete/:id", 
  iotController.deleteIotSensor
);

authRoute.post(
  "api/auth/logout",
    controller.logout
)

module.exports = authRoute;

