const Reel=require("../models/reelModel")

module.exports.uploadReel=async(req,res)=>{
    try{
        const {name, place, image}=req.body
        const postedBy=req.user
        const reel=await Reel.create({name, place, image, postedBy})
        return res.status(200).json({reel, status:true})
    }catch(err){
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