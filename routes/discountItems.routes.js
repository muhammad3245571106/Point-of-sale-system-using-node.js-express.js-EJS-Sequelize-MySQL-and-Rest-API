const discountItems = require("../controller/discountItems.controller")
const router = require("express").Router()
router.post("/", discountItems.create)
router.get("/", discountItems.findAll)
router.get("/:DI_ID", discountItems.findOne)
router.put("/:DI_ID", discountItems.update)
router.delete("/:DI_ID", discountItems.delete)
router.delete("/:DI_ID", discountItems.deleteAll)
module.exports = router