const jwt=require("jsonwebtoken")
const {secret_key}=require("../credentials")
const User=require("../models/authModel")

function protectRoute(req,res,next){
    try{
        if(req.cookies.login){
            jwt.verify(req.cookies.login, secret_key,
                (err,decodeToken)=>{
                    if(err){
                        return res.json({status:false})
                    }
                    const userId=decodeToken.payload
                    User.findById(userId).then(user=>{
                        req.user=user
                        next()
                    }) 
                    })
                }else{
                    return res.status(400).json({message:"Invalid cookie!!",status:false})
        }  
    }catch(err){
        return res.status(400).json({message:"User not authenticated!!",status:false})
    }
}

module.exports=protectRoute