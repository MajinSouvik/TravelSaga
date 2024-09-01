const {register,login,logout}=require("../controllers/authController");
const { getUser } = require("../controllers/userController");
const { refreshToken, verifyToken} = require("../middlewares/authMiddleware");

const router=require("express").Router()

router.post("/register",register)
router.post("/login", login)
router.post("/logout",verifyToken, logout)
router.get("/refresh", refreshToken, verifyToken, getUser)

module.exports = router