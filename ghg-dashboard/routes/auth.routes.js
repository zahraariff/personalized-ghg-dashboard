const controller = require("../controller/auth.controller");
const iotController = require("../controller/iot.controller");

module.exports = function(app) {
  // app.use(function(req, res, next) {
  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "x-access-token, Origin, Content-Type, Accept"
  //   );
  //   next();
  // });

  app.post(
    "/api/auth/registration",
    controller.register
  );

  app.post(
    "/api/auth/login",
    controller.login
  );

  app.get(
    "/api/iot-sensor",
    iotController.getIoTList
  );

  app.patch(
    "/api/iot/edit/:id",
    iotController.updateIotSensor
  );

  app.delete(
    "/api/iot/delete/:id", 
    iotController.deleteIotSensor
  );

  app.post(
    "api/auth/logout",
     controller.logout
  )

};