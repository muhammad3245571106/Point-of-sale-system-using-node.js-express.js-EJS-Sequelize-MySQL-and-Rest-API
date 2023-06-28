const db = require("../models/index.model.js");
const Payments = db.Payments;
const Op = db.Sequelize.Op;
// Create and Save a new Payment
exports.create = (req, res) => {
    // Validate request
    if (!req.body.P_ID) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a Payment
    const payment = {
        paymentID: req.body.paymentID,
        O_ID: req.body.O_ID
    };
    // Save Payment in the database
    Payments.create(payment)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Payment."
            });
        });
}
// Retrieve all Payments from the database.
exports.findAll = (req, res) => {
    const paymentID = req.query.paymentID;
    var condition = paymentID ? { paymentID: { [Op.like]: `%${paymentID}%` } } : null;
    Payments.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Payments."
            });
        });
}
// Find a single Payment with an id
exports.findOne = (req, res) => {
    const P_ID = req.params.P_ID;
    Payments.findByPk(P_ID)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Payment with id=" + P_ID
            });
        });
}
// Update a Payment by the id in the request
exports.update = (req, res) => {
    const P_ID = req.params.P_ID;
    Payments.update(req.body, {
        where: { P_ID: P_ID }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Payment was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Payment with id=${P_ID}. Maybe Payment was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Payment with id=" + P_ID
            });
        });
}
// Delete a Payment with the specified id in the request
exports.delete = (req, res) => {
    const P_ID = req.params.P_ID;
    Payments.destroy({
        where: { P_ID: P_ID }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Payment was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Payment with id=${P_ID}. Maybe Payment was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Payment with id=" + P_ID
            });
        });
}
// Delete all Payments from the database.
exports.deleteAll = (req, res) => {
    Payments.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Payments were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Payments."
            });
        });
}