const protectRoute = require("../middlewares/authMiddleware")
const { getUser } = require("../controllers/userController")
const router=require("express").Router()

router.get("/user",protectRoute, getUser)
module.exports=router