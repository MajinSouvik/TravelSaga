const {register,login}=require("../controllers/authController")
console.log("here in route")
const router=require("express").Router()
router.post("/register",register)
// router.post("/login",login)

module.exports = router