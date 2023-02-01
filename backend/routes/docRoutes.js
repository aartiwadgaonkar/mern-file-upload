const { addDocController, getAlldocsController, deleteAlldocsController  } = require("../controller/docController")

const router = require("express").Router()

router
    .get("/",getAlldocsController )
    .post("/add", addDocController)
    .delete("/delete", deleteAlldocsController)
module.exports = router