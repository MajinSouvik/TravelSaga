const {uploadReel, getReels,getReel}=require("../controllers/reelController")
const {verifyToken} = require("../middlewares/authMiddleware")
const router=require("express").Router()


router.post("/upload",verifyToken,uploadReel)
router.get("/get-reels",verifyToken,getReels)
router.get("/get-reel",verifyToken,getReel)

module.exports = router