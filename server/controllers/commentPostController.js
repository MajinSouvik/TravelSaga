const Post=require("../models/postModel")

module.exports.addComment=async(req,res)=>{
    try{
        const comment={
             comment: req.body.comment,
             postedBy:req.id
        }

        Post.findByIdAndUpdate(req.body.postID, {
            $push: { comments: comment }
        }, {
            new: true
        })
            .populate("comments.postedBy", "_id username profilePic")
            .populate("postedBy", "_id username profilePic")
            .then((result) => {
                if (result) {
                    return res.status(200).json(result)
                } else {
                    return res.status(400).json({ error: err })
                }
            })

    }catch(err){
        console.log("post-comment-error",err)
        return res.status(404).json({err, status:false})
    }
}

module.exports.getAllPostComments=async(req,res)=>{
    try{
        const post=await Post.findById(req.query.postID).populate("comments.postedBy", "_id username profilePic").populate("postedBy", "_id username profilePic")
        const comments=post.comments
        console.log("post-->",post)
        return res.status(200).json({comments, status:true})
    }catch(err){
        console.log("post-comment-error",err)
        return res.status(404).json({err, status:false})
    }
}
