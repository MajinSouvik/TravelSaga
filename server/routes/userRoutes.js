const {verifyToken} = require("../middlewares/authMiddleware")
const { getUser } = require("../controllers/userController")
const router=require("express").Router()

router.get("/",verifyToken, getUser)
module.exports=router