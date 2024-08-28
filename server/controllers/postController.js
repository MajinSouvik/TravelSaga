const Post=require("../models/postModel")
const User=require("../models/authModel")

module.exports.uploadPost=async(req,res)=>{
    try{
        const {name, place, description, files}=req.body
        let user=await User.findById(req.id)
        const postedBy=user
        const post=await Post.create({name, place,description, files, postedBy})
        return res.status(200).json({post, status:true})
    }catch(err){
        console.log("Error in upload-->", err)
        return res.status(404).json({err, status:false})
    }
}

module.exports.getPosts=async(req,res)=>{
    try{
        // console.log("Inside getPosts controller....")
        const userId=req.id
        const posts=await Post.find().populate("postedBy", "_id username profilePic")

        const postsWithLikeInfo = posts.map(post => {
            const isLikedByUser = post.likes.some(like => like.equals(userId)); // Check if userId is in the likes array
            return { ...post.toObject(), isLikedByUser }; // Convert post to plain JS object and add isLikedByUser flag
          });
      
          return res.status(200).json({ posts: postsWithLikeInfo, status: true });
        // return res.status(200).json({posts, status:true})
    }catch(err){
        // console.log("error getPosts-->",err)
        return res.status(404).json({err, status:false})
    }
}

module.exports.getPost=async(req,res)=>{
    try{
        const postID=req.query.ID
        const post=await Post.findById(postID)
        return res.status(200).json({post,status:true})
    }catch(err){
        return res.status(400).json({err, status:false})
    }
}

module.exports.filteredPosts=async(req,res)=>{
    try{
        const posts=await Post.find({place:req.query.place})
        return res.status(200).json({posts, status:true})
    }catch(err){
        return res.status(400).json({err, status:false})
    }
}

module.exports.likeDislike=async(req,res)=>{
    try{
        const {postId}=req.body
        const userId=req.id

        const post=await Post.findById(postId)
        if(!post){
            return res.status(404).json({message:"Post doesn't exist !",status:false})
        }

        if(!post.likes.includes(userId)){
            post.likes.push(userId)
            await post.save()
            return res.status(200).json({message:"Successfully liked the post !", likes: post.likes.length, liked:true})
        }else{
            post.likes=post.likes.filter((uid)=>uid.toString()!==userId.toString())
            await post.save()
            return res.status(200).json({message:"Successfully disliked the post !", likes: post.likes.length, liked:false})
        }
    }catch(err){
        return res.status(400).json({err, status:false})
    }
}