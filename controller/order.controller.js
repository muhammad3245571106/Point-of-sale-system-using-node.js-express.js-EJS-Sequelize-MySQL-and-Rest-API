const db = require("../models/index.model.js");
const jwt = require('jsonwebtoken');
const config = require('..//config/auth.config.js');
const Order = db.orders;
const Customers = db.Customers;
const Op = db.Sequelize.Op;
// Create and Save a new Order
exports.create = (req, res) => {
    if (!req.body.OrderTotal) {
        res.status(400).send({
          message: "Content can not be empty!",
        });
        return;
      }
    var id
const token = req.cookies.token
jwt.verify(token, config.secret, (err, decoded) => {
    username = decoded.id
    Customers.findOne({
        where:{
            C_Username:username
        }
    })
    .then(customer => {
        id = customer["C_ID"]
        const order = {
            OrderTotal: req.body.OrderTotal,
            C_ID: id
          };
          Order.create(order)
          .then((data) => {
            res.send(data)
          })
          .catch((err) =>{
            res.send("Done")
          res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Product.",
          });
          }
          )
    })
})
    
      
}
// Retrieve all Order from the database.
exports.findAll = (req, res) => {
    var condition
    page = req.query.page
    pageSize = req.query.pageSize
    if(!page){
        page = 1
    }
    if(!pageSize){
        pageSize = 1000000
    }
    condition = {
        limit: pageSize*1,
        offset: ((page*1-1)*pageSize),
    }
    Order.findAll(condition)
        .then((data) => {
        res.send(data);
        })
        .catch((err) => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving order.",
        });
        });
    }
// Find a single Order with an id
exports.findOne = (req, res) => {
    const id = req.params.O_ID;
    Order.findByPk(id)
        .then((data) => {
        res.send(data);
        })
        .catch((err) => {
        res.status(500).send({
            message: "Error retrieving Order with id=" + id,
        });
        });
    }
// Update a Order by the id in the request
exports.update = (req, res) => {
    const id = req.params.O_ID;
    Order.update(req.body, {
        where: { O_ID: id },
    })
        .then((num) => {
        if (num == 1) {
            res.send({
            message: "Order was updated successfully.",
            });
        } else {
            res.send({
            message: `Cannot update Order with id=${id}. Maybe Order was not found or req.body is empty!`,
            });
        }
        })
        .catch((err) => {
        res.status(500).send({
            message: "Error updating Order with id=" + id,
        });
        });
    }
// Delete a Order with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.O_ID;
    Order.destroy({
        where: { O_ID: id },
    })
        .then((num) => {
        if (num == 1) {
            res.send({
            message: "Order was deleted successfully!",
            });
        } else {
            res.send({
            message: `Cannot delete Order with id=${id}. Maybe Order was not found!`,
            });
        }
        })
        .catch((err) => {
        res.status(500).send({
            message: "Could not delete Order with id=" + id,
        });
        });
    }
// Delete all Order from the database.
exports.deleteAll = (req, res) => {
    Order.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
        res.send({ message: `${nums} Order were deleted successfully!` });
        })
        .catch((err) => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while removing all order.",
        });
        });
    }
