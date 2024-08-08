const Reel=require("../models/reelModel")
const User=require("../models/authModel")

module.exports.uploadReel=async(req,res)=>{
    try{
        console.log("Req body Reels")
        console.log(req.body)
        
        const {name, place, image}=req.body
        let user=await User.findById(req.id)
        console.log(req.user)
        const postedBy=user
        const reel=await Reel.create({name, place, image, postedBy})
        return res.status(200).json({reel, status:true})
    }catch(err){
        console.log("Reels error--->", err)
        return res.status(404).json({err, status:false})
    }
}

module.exports.getReels=async(req,res)=>{
    try{
        const reels=await Reel.find()
        return res.status(200).json({reels, status:true})
    }catch(err){
        return res.status(404).json({err, status:false})
    }
}

module.exports.getReel=async(req,res)=>{
    try{
        const postID=req.query.ID
        const reel=await Reel.findById(postID)
        return res.status(200).json({reel,status:true})
    }catch(err){
        return res.status(400).json({err, status:false})
    }
}