const db = require("../models/index.model.js");
const DiscountItems = db.DiscountItems;
const Op = db.Sequelize.Op;
exports.create = (req, res) => {
  if (!req.body.DI_Percentage) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  const discount = {
    P_ID: req.body.P_ID,
    DI_Percentage: req.body.DI_Percentage
  };
  DiscountItems.create(discount)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};
exports.findAll = (req, res) => {
    if(req.query.page && req.query.pageSize){
      page = req.query.page
      pageSize = req.query.pageSize
      condition = { offset:(page*1-1)*pageSize, limit:pageSize*1 }
    }
    else{
      DI_Percentage = req.query.DI_Percentage;
      condition = DI_Percentage ? {where: { DI_Percentage: { [Op.gte]: `${DI_Percentage}` } } } : {}
    }
    console.log(condition)
    DiscountItems.findAll(condition)
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
  const DI_ID = req.params.DI_ID;
  DiscountItems.findByPk(DI_ID)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Product item with id=${DI_ID}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Product item with id=" + DI_ID,
      });
    });
};
exports.update = (req, res) => {
  const DI_ID = req.params.DI_ID;
  DiscountItems.update(req.body, {
    where: { DI_ID: DI_ID },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Product item was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Product item with id=${DI_ID}. Maybe Product item was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Product item with id=" + DI_ID,
      });
    });
};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const DI_ID = req.params.DI_ID;
  DiscountItems.destroy({
    where: { DI_ID: DI_ID },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Product item was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Product item with id=${DI_ID}. Maybe Product item was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Product item with id=" + DI_ID,
      });
    });
};
exports.deleteAll = (req, res) => {
    DiscountItems.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Product item were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Product item.",
      });
    });
};
