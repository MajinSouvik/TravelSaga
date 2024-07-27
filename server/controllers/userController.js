module.exports.getUser=async(req,res,next)=>{
    try{
        console.log(req.user)
        return res.status(200).json({user:req.user})
    }catch(err){
        return res.status(404).send({status:'false'})
    }
}