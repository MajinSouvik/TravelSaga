const {addComment,getAllReelComments} =require("../controllers/commentReelController")
const {verifyToken} = require("../middlewares/authMiddleware")
const router=require("express").Router()

router.post("/add",verifyToken, addComment)
router.get("/all-comments",verifyToken, getAllReelComments)


// router.post("/add", addComment)
// router.get("/all-comments", getAllReelComments)


module.exports = router