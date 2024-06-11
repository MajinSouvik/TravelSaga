const {uploadReel, getReels}=require("../controllers/reelController")
const router=require("express").Router()

router.post("/upload",uploadReel)

router.get("/get-reels",getReels)

module.exports = router