const {uploadComment}=require("../controllers/commentController")
const protectRoute = require("../middlewares/authMiddleware")
const router=require("express").Router()

router.post("/upload",protectRoute,uploadComment)

module.exports = router