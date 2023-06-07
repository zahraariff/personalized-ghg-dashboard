const config = require("../config/auth.config");
const db = require("../model");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.register = (req,res) => {

    User.findOne({
        $or: [
            { username: req.body.username },
            { email: req.body.email }
        ]
    }).then((existingUser) => {
        if (existingUser) {
            console.log('header 1 sent')
            console.error('User already exists.')
            return res.status(400).json({ error: 'User already exists' });
        } else {
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8)        
            });
            
            newUser.save()
                .then(() => {
                    console.log('header 2 sent')
                    return res.status(201).json(newUser);
                })
                .catch((error) => {
                    console.log('header 3 sent')
                    console.error('Failed to save user:', error);
                });
        }
    })

}


// To be uncommented later
// exports.signin = (req, res) => {
//     User.findOne({
//       username: req.body.username
//     })
//       .populate("roles", "-__v")
//       .exec((err, user) => {
//         if (err) {
//           res.status(500).send({ message: err });
//           return;
//         }
  
//         if (!user) {
//           return res.status(404).send({ message: "User Not found." });
//         }
  
//         var passwordIsValid = bcrypt.compareSync(
//           req.body.password,
//           user.password
//         );
  
//         if (!passwordIsValid) {
//           return res.status(401).send({
//             accessToken: null,
//             message: "Invalid Password!"
//           });
//         }
  
//         var token = jwt.sign({ id: user.id }, config.secret, {
//           expiresIn: 86400 // 24 hours
//         });
  
//         var authorities = [];
  
//         for (let i = 0; i < user.roles.length; i++) {
//           authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
//         }
//         res.status(200).send({
//           id: user._id,
//           username: user.username,
//           email: user.email,
//           roles: authorities,
//           accessToken: token
//         });
//       });
//   }