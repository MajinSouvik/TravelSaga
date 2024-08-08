const {uploadComment}=require("../controllers/commentController")
const {verifyToken} = require("../middlewares/authMiddleware")
const router=require("express").Router()

router.post("/upload",verifyToken,uploadComment)

module.exports = router