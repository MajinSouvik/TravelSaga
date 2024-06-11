const {register,login}=require("../controllers/authController")
const protectRoute=require("../middlewares/authMiddleware");
const router=require("express").Router()

router.post("/",protectRoute)
router.post("/register",register)
router.post("/login",login)

module.exports = router