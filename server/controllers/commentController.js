const Reel=require("../models/reelModel")

module.exports.uploadComment=async(req,res)=>{
    console.log("**",req.body)
    console.log("**",req.user)
    console.log("**",req.id)
    try{
        const comment={
             comment: req.body.comment,
             postedBy:req.id
            //  postedBy:req.user._id
        }

        console.log("comment-->",comment)
        console.log("**",req.body)
        console.log("&&",req.user)

        Reel.findByIdAndUpdate(req.body.postID, {
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
        return res.status(404).json({err, status:false})
    }
}
