const {uploadReel, getReels,getReel}=require("../controllers/reelController")
const protectRoute = require("../middlewares/authMiddleware")
const router=require("express").Router()


router.post("/upload",protectRoute,uploadReel)
router.get("/get-reels",getReels)
router.get("/get-reel",getReel)

module.exports = router