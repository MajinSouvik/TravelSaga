const User=require("../models/authModel")

module.exports.getUser=async(req,res)=>{
    console.log("Inside getUser controller..");
    
    try{
        let user=await User.findById(req.id)
        return res.status(200).json(user)
    }catch(err){
        return res.status(404).send({status:'false'})
    }
}