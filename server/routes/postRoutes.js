// const {uploadReel, getReels,getReel, filteredReels}=require("../controllers/postController")

const {uploadPost, getPosts, getPost, filteredPosts}=require("../controllers/postController")

const {verifyToken} = require("../middlewares/authMiddleware")
const router=require("express").Router()


router.post("/upload", verifyToken, uploadPost)
router.get("/get-posts", verifyToken, getPosts)
router.get("/get-post", verifyToken, getPost)
router.get("/filtered-posts", verifyToken, filteredPosts)
module.exports = router