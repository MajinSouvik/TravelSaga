const Reel=require("../models/reelModel")

module.exports.uploadReel=async(req,res)=>{
    try{
        const {name, place, image}=req.body
        const reel=await Reel.create({name, place, image})
        return res.status(200).json({reel, status:true})
    }catch(err){
        return res.status(404).json({err, status:false})
    }
}

module.exports.getReels=async(req,res)=>{
    try{
        const reels=await Reel.find()
        console.log(reels)
        return res.status(200).json({reels, status:true})
    }catch(err){
        return res.status(404).json({err, status:false})
    }
}