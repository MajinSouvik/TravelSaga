const {verifyToken} = require("../middlewares/authMiddleware")
const router=require("express").Router()
const {uploadReel, getReels}=require("../controllers/reelController")

router.post("/upload", verifyToken, uploadReel)
router.get("/get-reels",verifyToken, getReels)
module.exports = router
