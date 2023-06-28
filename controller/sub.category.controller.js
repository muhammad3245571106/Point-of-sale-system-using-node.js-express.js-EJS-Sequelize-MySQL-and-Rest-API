const db = require("../models/index.model.js");
const SubCategory = db.subCategory;
const Op = db.Sequelize.Op;
// Create and Save a new SubCategory
exports.create = (req, res) => {
    if (!req.body.SubCat_Name) {
        res.status(400).send({
        message: "Content can not be empty!",
        });
        return;
    }
    const subCategory = {
        SubCat_Name: req.body.SubCat_Name,
        SubCat_Description: req.body.SubCat_Description,
        Cat_Name: req.body.Cat_Name
    };
    
    SubCategory.create(subCategory) // Use SubCategory instead of subCategory
        .then((data) => {
            console.log(subCategory)
        res.send(data);
        })
        .catch((err) => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the subCategory.",
        });
        });
    }
// Retrieve all SubCategory from the database.
exports.findAll = (req, res) => {
    var condition
    page = req.query.page
    pageSize = req.query.pageSize
    catName = req.query.catName
    if(!page){
        page = 1
    }
    if(!pageSize){
        pageSize = 1000000
    }
    var catCon = true
    if(!catName){
        catCon = false
        catName = ""
    }
    condition = {
        limit: pageSize*1,
        offset: ((page*1-1)*pageSize),
        where: {
            Cat_Name: catName
        }
    }
    if(!catCon){
        condition = {
            limit: pageSize*1,
            offset: ((page*1-1)*pageSize)
        }
    }
    else{
        condition = {
            limit: pageSize*1,
            offset: ((page*1-1)*pageSize),
            where: {
                Cat_Name: catName
            }
        }
    }
    SubCategory.findAll(condition)
        .then((data) => {
        res.send(data);
        })
        .catch((err) => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving SubCategory.",
        });
        });
    }
// Find a single SubCategory with an id
exports.findOne = (req, res) => {
    const id = req.params.SubCat_Name;
    SubCategory.findByPk(id)
        .then((data) => {
        res.send(data);
        })
        .catch((err) => {
        res.status(500).send({
            message: "Error retrieving SubCategory with id=" + id,
        });
        });
    }
// Update a SubCategory by the id in the request
exports.update = (req, res) => {
    const Cat_Name = req.params.SubCat_Name; 
    SubCategory.update(req.body, {
        where: { SubCat_Name: Cat_Name },
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
// Delete a SubCategory with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.SubCat_Name;
    SubCategory.destroy({
        where: { SubCat_Name: id }
    })
    .then((data) => {
        res.send({
            message: "SubCategory was deleted successfully!",
        });
    })
    .catch((err) => {
        res.status(500).send({
            message: "Could not delete SubCategory with id=" + id,
        });
    });
    }
// Delete all SubCategory from the database.
exports.deleteAll = (req, res) => {
    var deleteCategory = req.query.category
    if(deleteCategory === ""){
    SubCategory.destroy({
        where: {},
        truncate: false
    })
    .then((data) => {
        res.send({
            message: `${data} SubCategory were deleted successfully!`,
        });
    })
    .catch((err) => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while removing all SubCategory.",
        });
    });
}
else{
        SubCategory.destroy({
            where: {
                Cat_Name:deleteCategory
            },
            truncate: false
        })
        .then((data) => {
            res.send({
                message: `${data} SubCategory were deleted successfully!`,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while removing all SubCategory.",
            });
        });
}
    }
