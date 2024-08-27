const {register,login,normalFunc}=require("../controllers/authController");
const { getUser } = require("../controllers/userController");
const { protectRoute, refreshToken, verifyToken} = require("../middlewares/authMiddleware");

const router=require("express").Router()

router.post("/register",register)
router.post("/login", login)
router.get("/refresh", refreshToken, verifyToken, getUser)

module.exports = router