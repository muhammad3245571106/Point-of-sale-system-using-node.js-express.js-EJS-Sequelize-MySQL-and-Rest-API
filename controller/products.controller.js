const db = require("../models/index.model.js");
const Products = db.Products;
const Category = db.category;
const SubCategory = db.subCategory;
const Op = db.Sequelize.Op;
// Create and Save a new Product
exports.create = (req, res) => {
  if (!req.body.P_Name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  const SubCat_Name = req.body.SubCat_Name;
  const Cat_Name = req.body.Cat_Name;
  const customerId = req.user.id; // assuming req.user contains the logged-in customer's details
  Category.findByPk(Cat_Name)
    .then((category) => {
      if (!category) {
        res.status(400).send({
          message: "Category not found!",
        });
      } else {
        SubCategory.findByPk(SubCat_Name)
          .then((subcategory) => {
            if (!subcategory) {
              res.status(400).send({
                message: "Subcategory not found!",
              });
            } else {
              const product = {
                P_Name: req.body.P_Name,
                P_Description: req.body.P_Description,
                P_BasePrice: req.body.P_BasePrice,
                P_SellPrice: req.body.P_SellPrice,
                P_Quantity: req.body.P_Quantity,
                P_BarCode: req.body.P_BarCode,
                Cat_Name: Cat_Name,
                SubCat_Name: SubCat_Name,
                C_ID: customerId,
              };
              Products.create(product)
                .then((data) => {
                  res.send(data);
                })
                .catch((err) => {
                  res.status(500).send({
                    message:
                      err.message ||
                      "Some error occurred while creating the Product.",
                  });
                });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error retrieving Subcategory with id=" + subcategoryId,
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Category with id=" + categoryId,
      });
    });
};
exports.create = (req, res) => {
  if (!req.body.P_Name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  const product = {
        P_Name: req.body.P_Name,
        P_Description: req.body.P_Description,
        P_BasePrice: req.body.P_BasePrice,
        P_SellPrice: req.body.P_SellPrice,
        P_Quantity: req.body.P_Quantity,
        P_BarCode: req.body.P_BarCode,
        SubCat_Name: req.body.SubCat_Name,
        Cat_Name: req.body.Cat_Name
      };
      Products.create(product)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
        err.message || "Some error occurred while creating the Product.",
      });
    });
  };
// Retrieve one Product from the database.
  exports.findOne = (req, res) => {
    const P_ID = req.params.P_ID;
    Products.findByPk(P_ID)
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Product with id=${P_ID}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving Product with id=" + P_ID,
        });
      });
  };
// Update a Product by the id in the request
  exports.findAll = (req, res) => {
  var condition
    page = req.query.page
    pageSize = req.query.pageSize
    priceG = req.query.priceG
    priceL = req.query.priceL
    if(!priceG){
      priceG = 0
    }
    if(priceG < 0){
      priceG *= -1
    }
    if(!priceL){
      priceL = 9007199254740991
    }
    if(priceL < 0){
      priceL *= 1
    }
    if(!page){
      page = 1
    }
    if(!pageSize){
      pageSize = 1000000
    }
    if(priceG > priceL){
      temp = priceG
      priceG = priceL
      priceL = temp
    }
      condition = {
        offset: ((page*1-1)*pageSize),
        limit: pageSize*1, 
      where: {[Op.and]: [{P_SellPrice: { [Op.gte]: `${priceG}` }},
      {P_SellPrice: { [Op.lte]: `${priceL}` }}]}
    }
  Products.findAll(condition)
    .then((data) => {
        res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Products.",
      })
    })
};
// Find a single Product with an id
exports.update = (req, res) => {
  const P_ID = req.params.P_ID;
  Products.update(req.body, {
    where: { P_ID: P_ID },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Product was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Product with id=${P_ID}. Maybe Product was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Product with id=" + P_ID,
      });
    });
};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const P_ID = req.params.P_ID;
  Products.destroy({
    where: { P_ID: P_ID },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Product was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Product with id=${P_ID}. Maybe Product was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Product with id=" + P_ID,
      });
    });
};
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Products.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Products were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Products.",
      });
    });
};
