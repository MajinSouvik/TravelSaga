const Reel=require("../models/reelModel")
const User=require("../models/authModel")

module.exports.uploadReel=async(req,res)=>{
    try{
        const {name, place, files}=req.body
        const reels=[]
        let user=await User.findById(req.id)
        const postedBy=user

        files.map(async(file)=>{
            const reel=await Reel.create({name, place, url:file, postedBy})
            reels.push(reel)
        })

        return res.status(200).json({reels, status:true})
    }catch(err){
        console.log("Error in upload-->", err)
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