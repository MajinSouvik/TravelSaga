const Reel=require("../models/reelModel")

module.exports.addComment=async(req,res)=>{
    try{
        const comment={
             comment: req.body.comment,
             postedBy:req.id
        }

        Reel.findByIdAndUpdate(req.body.reelID, {
            $push: { comments: comment }
        }, {
            new: true
        })
            .populate("comments.postedBy", "_id username")
            .populate("postedBy", "_id username")
            .then((result) => {
                if (result) {
                    return res.status(200).json(result)
                } else {
                    return res.status(400).json({ error: err })
                }
            })

    }catch(err){
        console.log("reel-comment-error",err)
        return res.status(404).json({err, status:false})
    }
}

module.exports.getAllReelComments=async(req,res)=>{
    try{
        const reel=await Reel.findById(req.query.reelID)
        const comments=reel.comments
        console.log(comments)
        return res.status(200).json({comments, status:true})
    }catch(err){
        console.log("reel-comment-error",err)
        return res.status(404).json({err, status:false})
    }
}