const db = require("../models/index.model.js");
const Category = db.category;
const Op = db.Sequelize.Op;
// Create and Save a new Category
exports.create = (req, res) => {
    if (!req.body.Cat_Name) {
        res.status(400).send({
        message: "Content can not be empty!",
        });
        return;
    }
    const category = {
        Cat_Name: req.body.Cat_Name,
        Cat_Description: req.body.Cat_Description,
    };
    Category.create(category)
        .then((data) => {
        res.send(data);
        })
        .catch((err) => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Category.",
        });
        });
    }
// Retrieve all Category from the database.
exports.findAll = (req, res) => {
    var condition
    page = req.query.page
    pageSize = req.query.pageSize
    if(!page){
        page = 1
    }
    if(!pageSize){
        pageSize = 100000
    }
    condition = {
        limit: pageSize*1,
        offset: ((page*1-1)*pageSize)
    }
    Category.findAll(condition )
        .then((data) => {
        res.send(data);
        })
        .catch((err) => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving Category.",
        });
        });
    }
// Find a single Category with an id
exports.findOne = (req, res) => {
    const Cat_Name = req.params.Cat_Name;
    Category.findByPk(Cat_Name)
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Product with Cat_Name=${Cat_Name}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving Product with Cat_Name=" + Cat_Name,
        });
      });
    }
// Update a Category by the id in the request
exports.update = (req, res) => {
    const Cat_Name = req.params.Cat_Name; 
    Category.update(req.body, {
        where: { Cat_Name: Cat_Name },
    })
        .then((num) => {
        if (num == 1) {
            res.send({
            message: "Category was updated successfully.",
            });
        } else {
            res.send({
            message: `Cannot update Category with id=${Cat_Name}. Maybe Category was not found or req.body is empty!`,
            });
        }
        })
        .catch((err) => {
        res.status(500).send({
            message: "Error updating Category with id=" + Cat_Name,
        });
        });
    }
// Delete a Category with the specified id in the request
exports.delete = async (req, res) => {
    const Cat_Name = req.params.Cat_Name;
Category.destroy({
    where: { Cat_Name: Cat_Name },
})
    .then((num) => {
    if (num == 1) {
        res.send({
        message: "Category was deleted successfully!",
        });
    } else {
        res.send({
        message: `Cannot delete Category with id=${Cat_Name}. Maybe Category was not found!`,
        });
    }
    })
    .catch((err) => {
    res.status(500).send({
        message: "Could not delete Category with id=" + Cat_Name,
    });
    });    
    }
// Delete all Category from the database.
exports.deleteAll = (req, res) => {
    Category.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
        res.send({ message: `${nums} Category were deleted successfully!` });
        })
        .catch((err) => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while removing all Category.",
        });
        });
    }
