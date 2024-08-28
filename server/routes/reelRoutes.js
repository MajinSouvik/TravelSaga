const {verifyToken} = require("../middlewares/authMiddleware")
const router=require("express").Router()
const {uploadReel, getReels,likeDislike}=require("../controllers/reelController")

router.post("/upload", verifyToken, uploadReel)
router.get("/get-reels",verifyToken, getReels)
router.put("/like-dislike",verifyToken,likeDislike)
// router.post("/upload",  uploadReel)
// router.get("/get-reels", getReels)
module.exports = router
