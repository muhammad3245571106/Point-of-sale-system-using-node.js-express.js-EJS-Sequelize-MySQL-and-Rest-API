const db = require("../models/index.model")
const Customer = db.Customers
const Op = db.Sequelize.Op
checkDuplicateUsernameOrEmail = (req, res, next) => {
    Customer.findOne({
        where : {
            C_Username : req.body.C_Username
        }
    }).then(customer => {
        if (customer) {
            res.status(400).send({
                message : "Failed! Username is already in use!"
            })
            return
        }
        Customer.findOne({
            where : {
                C_Email : req.body.C_Email
            }
        }).then(customer => {
            if (customer) {
                res.status(400).send({
                    message : "Failed! Email is already in use!"
                })
                return
            }
            next()
        })
    })
}
const verifySignUp = {
    checkDuplicateUsernameOrEmail
}
module.exports = verifySignUp
