const {addComment,getAllPostComments} =require("../controllers/commentPostController")
const {verifyToken} = require("../middlewares/authMiddleware")
const router=require("express").Router()

router.post("/add",verifyToken, addComment)
router.get("/all-comments",verifyToken, getAllPostComments)

module.exports = router