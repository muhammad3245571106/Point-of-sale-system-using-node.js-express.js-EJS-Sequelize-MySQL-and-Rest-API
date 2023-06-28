const category = require("../controller/category.controller")
const router = require("express").Router()
router.post("/", category.create)
router.get("/", category.findAll)
router.get("/:Cat_Name", category.findOne)
router.put("/:Cat_Name", category.update)
router.delete("/:Cat_Name", category.delete)
router.delete("/", category.deleteAll)
module.exports = router
