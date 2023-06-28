const db = require("../models/index.model.js");
const config = require("../config/auth.config.js");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Customer = db.Customers;
const Op = db.Sequelize.Op;
// Create and Save a new Customer
exports.signup = (req, res) => {
    // Validate request
    if (!req.body.C_Name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a Customer
    const customer = {
        C_Name: req.body.C_Name,
        C_Username: req.body.C_Username,
        C_Address: req.body.C_Address,
        C_Email: req.body.C_Email,
        C_Phone: req.body.C_Phone,
        C_Password: bcrypt.hashSync(req.body.C_Password, 8),
        C_Status: req.body.C_Status ? req.body.C_Status : "inactive"
    };
    // Save Customer in the database
    Customer.create(customer)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Customer."
            });
        });
}

exports.getName = (req, res) => {
    Customer.findOne({
        where : {
            C_ID : req.params.id
        }
    })
    .then(customer => {
        res.send(customer)
    })
}
exports.getEmail = (req, res) => {
    Customer.findOne({
        where : {
            C_Username : req.params.username
        }
    })
    .then(customer => {
        res.send(customer)
    })
}
// sign in a customer
exports.signin = (req, res) => {
    Customer.findOne({
        where : {
            C_Username : req.body.C_Username
        }
    })
    .then(customer => {
        if (!customer) {
            return res.status(404).send({ message: "Customer Not found." });
        }
        var passwordIsValid = bcrypt.compareSync(
            req.body.C_Password,
            customer.C_Password
        );
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }
        var token = jwt.sign({ id: customer.C_Username }, config.secret, {
            expiresIn: 86400 // 24 hours
        });
        // Set a cookie containing the JWT token
        res.cookie("token", token, { maxAge: 86400000, httpOnly: true });
        res.status(200).send({
            C_Username: customer.C_Username,
            C_Email: customer.C_Email,
            accessToken: token
        });
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    }
    );
}

exports.logout = (req, res) => {
    // Clear the cookie
    res.clearCookie('token');

    console.log("Logout successfully!  jnjnjnjnjnjnjjnnjnjnjnjnjnnjn");
    res.status(200).send({ message: "Logout successfully!" });
}
