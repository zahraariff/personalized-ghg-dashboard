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
                password: bcrypt.hashSync(req.body.password, 8),
                role: [ "user" ]        
            });
            
            newUser.save()
                .then(() => {
                    console.log('header 2 sent')
                    return res.status(201).json(newUser);
                })
                .catch((error) => {
                    console.log('header 3 sent')
                    console.error('Failed to save user:', error);
                    this.errorMessage = error;
                });
        }
    })
}

exports.login = async (req, res) => {
    console.log(req.body);

    const { username, email, password } = req.body;

    let user;
    if (username) {
        user = await User.findOne({ username });
    } else if (email) {
        user = await User.findOne({ email });
    }

    // Check if the user exists and the password is correct
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ error: 'Invalid credentials' });
    } else {
        console.log("Logged In");
    }

    // Generate a JWT
    const token = jwt.sign({ userId: user._id }, 'secret-key');
    res.token = token;
    // Return the token to the client
    res.json({ token });
    console.log(res.token)
}


