const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');

verifyToken = (req, res, next) => { 
    if (!req.cookies || !req.cookies.token) {
        return res.redirect("/signin").status(403).send({
            message: "No token provided!"
        });
    }
    
    const token = req.cookies.token;
    
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
        return res.status(401).send({
            message: "Unauthorized!"
        });
        }
        req.userId = decoded.id;
        next();
    });
};


const authJwt = {
    verifyToken: verifyToken,
};
module.exports = authJwt;