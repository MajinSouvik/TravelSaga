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
        const posts=await Post.find()
        return res.status(200).json({posts, status:true})
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