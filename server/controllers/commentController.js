const Post=require("../models/postModel")

module.exports.uploadComment=async(req,res)=>{
    try{
        const comment={
             comment: req.body.comment,
             postedBy:req.id
        }

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
