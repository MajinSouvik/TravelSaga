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


module.exports.likeDislike=async(req,res)=>{
    try{
        const {reelId}=req.body
        const userId=req.id

        const reel=await Reel.findById(reelId)
        if(!reel){
            return res.status(404).json({message:"Reel doesn't exist !",status:false})
        }

        if(!reel.likes.includes(userId)){
            reel.likes.push(userId)
            await reel.save()
            return res.status(200).json({message:"Successfully liked the reel !", likes: reel.likes.length, liked:true})
        }else{
            reel.likes=reel.likes.filter((uid)=>uid.toString()!==userId.toString())
            await reel.save()
            return res.status(200).json({message:"Successfully disliked the post !", likes: reel.likes.length, liked:false})
        }
    }catch(err){
        return res.status(400).json({err, status:false})
    }
}