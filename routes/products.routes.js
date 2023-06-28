const products = require("../controller/products.controller")
const router = require("express").Router()
router.post("/", products.create)
router.get("/", products.findAll)
router.get("/:P_ID", products.findOne)
router.put("/:P_ID", products.update)
router.delete("/:P_ID", products.delete)
router.delete("/", products.deleteAll)
module.exports = router