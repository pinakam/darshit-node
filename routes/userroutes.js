const express =require("express")
const router = express.Router()
const usercontroller = require("../controller/usercontroller")


router.post("/save-data",usercontroller.adduser)
router.get("/read",usercontroller.readuser)
router.get("/read/:id",usercontroller.readuserbyid)
router.patch("/update/:name/:value",usercontroller.updateuser)
router.delete("/delete/:name",usercontroller.deleteuser)


module.exports = router