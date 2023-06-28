const db = require("../models/index.model.js");
const Discounts = db.discount;
const Op = db.Sequelize.Op;
// Create and Save a new Discount
exports.create = (req, res) => {
  // Validate request
  if (!req.body.StartDate) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  const discount = {
    StartDate: req.body.DISCOUNT_START_DATE,
    EndDate: req.body.DISCOUNT_END_DATE,
  };
  Discounts.create(discount)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Discount."
      });
    });
};
exports.findAll = (req, res) => {
    if(req.query.page && req.query.pageSize){
      page = req.query.page
      pageSize = req.query.pageSize
      condition = { offset:(page*1-1)*pageSize, limit:pageSize*1 }
    }
    else{
      EndDate = req.query.EndDate;
      condition = EndDate ? {where: { EndDate: { [Op.lte]: `%${EndDate}%` } } } : {}
    }
    console.log(condition)
    Discounts.findAll(condition)
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
exports.findOne = (req, res) => {
  const id = req.params.D_ID;
  Discounts.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Discount with id=" + id
      });
    });
};
exports.update = (req, res) => {
  const D_ID = req.params.D_ID;
  Discounts.update(req.body, {
    where: { D_ID: D_ID }
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Discount was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Discount with id=${D_ID}. Maybe Discount was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Discount with id=" + D_ID
      });
    });
}
// Delete a Discount with the specified id in the request
exports.delete = (req, res) => {
  const D_ID = req.params.D_ID;
  Discounts.destroy({
    where: { D_ID: D_ID }
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Discount was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Discount with id=${D_ID}. Maybe Discount was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Discount with id=" + D_ID
      });
    });
};
exports.deleteAll = (req, res) => {
  Discounts.destroy({
    where: {},
    truncate: false
  })
    .then((nums) => {
      res.send({ message: `${nums} Discounts were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all discounts."
      });
    });
};
