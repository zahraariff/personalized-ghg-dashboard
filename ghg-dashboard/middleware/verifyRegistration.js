const db = require("../model/model");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req,res,next) => {
    // Username
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (user) {
            res.status(400).send({ message: "Username has already been taken."});
            return;
        }
    });

    // Email
    User.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (user) {
            res.status(400).send({ message: "This email has already been used to register before."});
            return;
        }

        next();
    });
};

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
      for (let i = 0; i < req.body.roles.length; i++) {
        if (!ROLES.includes(req.body.roles[i])) {
          res.status(400).send({
            message: `Role ${req.body.roles[i]} does not exist.`
          });
          return;
        }
      }
    }
  
    next();
  };

const verifyRegistration = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
};

module.exports = verifyRegistration;