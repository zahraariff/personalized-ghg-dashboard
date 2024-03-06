const { authJwt } = require("../middleware");
const controller = require("../controller/user.controller");
const authController = require("../controller/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.get("/api/auth/login", authJwt.verifyToken, (req, res) => {
    //Acessible only to authenticated users
    res.json({ message: 'Success Login Page'});
    console.log('Success')
  });

  // Get the graph selection of the user using get profile

  // Update the graph selection of the user
//   app.patch("/user/graph-selection/:id", async (req, res) => {
//     let graphSelection = req.body;
//     try {
//       const id = req.params.id;
//       const user = await userModel.findById(id);

//       if (!user) {
//         return res.status(404).json({ message: 'Not found'});
//       }

//       // Update the graphSelected array in the user model
//        user.selectedGraphs = graphSelection;

//        // Save the updated user document
//         const updatedUser = await user.save();

//         res.status(200).json({ message: 'Graph selection updated successfully', user: updatedUser });


//     } catch (error) {
// console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
      
      
    // }
  // })

};

