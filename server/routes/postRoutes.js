const {uploadPost, getPosts, getPost, filteredPosts, likeDislike}=require("../controllers/postController")
const {verifyToken} = require("../middlewares/authMiddleware")
const router=require("express").Router()


// router.post("/upload",  uploadPost)
// router.get("/get-posts",  getPosts)
// router.get("/get-post",  getPost)
// router.get("/filtered-posts",  filteredPosts)

router.post("/upload", verifyToken, uploadPost)
router.get("/get-posts", verifyToken, getPosts)
router.get("/get-post", verifyToken, getPost)
router.get("/filtered-posts", verifyToken, filteredPosts)
router.put("/like-dislike",verifyToken,likeDislike)
module.exports = router