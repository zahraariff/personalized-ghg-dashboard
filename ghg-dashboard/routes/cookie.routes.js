const express = require('express');
const cookieParser = require("cookie-parser");
const app = express();
const cookieRoute = express.Router();
app.use(cookieParser())


cookieRoute.get('/get-role-cookie', (req, res) => {
    const roleCookie = req.cookies.role;
    res.json({ role: roleCookie });
});

// cookieRoute.get('/set-role-cookie', (req, res) => {
//   res.cookie('role', 'admin');
//   res.json({role: req.cookies})
// });

module.exports = cookieRoute;