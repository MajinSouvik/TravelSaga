const User=require('../models/authModel')

module.exports.register=async(req,res)=>{
    console.log("here inside register")
    console.log(req.body)
    try{
        
        const {username,password}=req.body
        console.log("email and password", username, password)
        res.status(200).send("Alright user")
    }catch(err){
        console.log("ekhane error-->", err)
        res.status(404).send("Error")
    }
}

module.exports.login=async(req,res,next)=>{
    
}