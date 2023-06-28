const discounts = require("../controller/discounts.controller")
const router = require("express").Router()
router.get("/", discounts.findAll)
router.post("/", discounts.create)
router.get("/:D_ID", discounts.findOne)
router.put("/:D_ID", discounts.update)
router.delete("/:D_ID", discounts.delete)
router.delete("/:D_ID", discounts.deleteAll)
module.exports = router