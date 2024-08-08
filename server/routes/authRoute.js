const {register,login,normalFunc}=require("../controllers/authController");
const { getUser } = require("../controllers/userController");
const { protectRoute} = require("../middlewares/authMiddleware");

const router=require("express").Router()

router.post("/register",register)
router.post("/login", login)
router.get("/refresh",protectRoute,getUser)

module.exports = router